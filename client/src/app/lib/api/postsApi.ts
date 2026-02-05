import { ContentBlock } from "../types";
import { fetchWithAuth } from "./authApi";

async function parseMaybeJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("Failed to parse JSON response: " + (err as Error).message);
  }
}

export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/posts/${slug}`
  );
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function createPost(
  data: { title: string; slug?: string; content: ContentBlock[]; hidden?: boolean },
  accessToken: string | null,
  setAccessToken: (token: string | null) => void
) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/posts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    accessToken,
    setAccessToken
  );
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function updatePost(
  id: string,
  data: { title?: string; slug?: string; content?: ContentBlock[]; hidden?: boolean },
  accessToken: string | null,
  setAccessToken: (token: string | null) => void
) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    accessToken,
    setAccessToken
  );
  if (!res.ok) throw new Error("Failed to update post");
  return parseMaybeJson(res);
}

export async function getAdminPosts(
  accessToken: string | null,
  setAccessToken: (token: string | null) => void
) {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/posts/admin`, { method: 'GET' }, accessToken, setAccessToken);
  if (!res.ok) throw new Error('Failed to fetch admin posts');
  return res.json();
}

export async function deletePost(
  id: string,
  accessToken: string | null,
  setAccessToken: (token: string | null) => void
) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
    { method: "DELETE" },
    accessToken,
    setAccessToken
  );
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
}
