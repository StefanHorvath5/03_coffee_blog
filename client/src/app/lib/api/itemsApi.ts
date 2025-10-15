import { fetchWithAuth } from "./authApi";

export async function getItems() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function createItem(
  data: { title: string; description: string },
  accessToken: string | null,
  setAccessToken: (token: string | null) => void
) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/items`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    accessToken,
    setAccessToken
  );
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function updateItem(
  id: string,
  data: { title: string; description: string },
  accessToken: string | null,
  setAccessToken: (token: string | null) => void
) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    accessToken,
    setAccessToken
  );
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}

export async function deleteItem(
  id: string,
  accessToken: string | null,
  setAccessToken: (token: string | null) => void
) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`,
    {
      method: "DELETE",
    },
    accessToken,
    setAccessToken
  );
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}
