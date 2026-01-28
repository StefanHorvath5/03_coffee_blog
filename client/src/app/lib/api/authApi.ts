const recentFailures: Map<string, number> = new Map();

function markFailure(key: string) {
  recentFailures.set(key, Date.now());
  setTimeout(() => {
    recentFailures.delete(key);
  }, 5000);
}

export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {},
  accessToken: string | null,
  setAccessToken: (token: string | null) => void,
  retry = true,
): Promise<Response> {
  const url = typeof input === "string" ? input : (input as Request).url;
  const lastFail = recentFailures.get(url || "");
  if (lastFail && Date.now() - lastFail < 5000) {
    throw new Error("Temporary network error — try again later");
  }

  const headers: Record<string, string> = {
    ...((init.headers as Record<string, string>) || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let res: Response;
  try {
    res = await fetch(input, { ...init, headers, credentials: "include" });
  } catch (err) {
    // network error: mark failure and rethrow
    markFailure(url || "");
    throw err;
  }

  if (!res.ok) {
    if (res.status >= 500 || res.status === 429) {
      markFailure(url || "");
    }
  }

  if (res.status === 401 && retry) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (refreshRes.ok) {
        const { accessToken: newToken } = await refreshRes.json();
        setAccessToken(newToken);
        return fetchWithAuth(input, init, newToken, setAccessToken, false);
      }
    } catch (err) {
      markFailure(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`);
    }
  }
  return res;
}

export async function login(
  data: { email: string; password: string },
  setAccessToken: (token: string | null) => void,
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error((await res.json()).message || "Login failed");
  const result = await res.json();
  setAccessToken(result.accessToken);
  localStorage.setItem("accessToken", result.accessToken);
  return result;
}

export async function register(
  data: { email: string; password: string },
  setAccessToken: (token: string | null) => void,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error((await res.json()).message || "Register failed");
  const result = await res.json();
  setAccessToken(result.accessToken);
  localStorage.setItem("accessToken", result.accessToken);
  return result;
}

export async function refresh(setAccessToken: (token: string | null) => void) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  if (!res.ok) throw new Error("Failed to refresh token");
  const result = await res.json();
  setAccessToken(result.accessToken);
  localStorage.setItem("accessToken", result.accessToken);
  return result;
}

export async function getProfile(
  accessToken: string | null,
  setAccessToken: (token: string | null) => void,
) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
    {},
    accessToken,
    setAccessToken,
  );
  if (!res.ok) return null;
  return res.json();
}

export async function logout(
  accessToken: string | null,
  setAccessToken: (token: string | null) => void,
) {
  await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    { method: "POST" },
    accessToken,
    setAccessToken,
  );
  setAccessToken(null);
  localStorage.removeItem("accessToken");
}
