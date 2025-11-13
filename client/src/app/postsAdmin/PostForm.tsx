/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { createPost, updatePost } from "../lib/api/postsApi";
import { Post } from "../lib/types";
import ErrorMessage from "../components/ErrorMessage";
import { useAuth } from "../lib/AuthProvider";
import { parseHtmlToBlocks } from "../lib/parseHtmlToBlocks";

export default function PostForm({
  post,
  onSuccess,
}: {
  post?: Post;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [html, setHtml] = useState<string>(
    (post?.content && JSON.stringify(post.content)) || ""
  );
  const [mainImageUrl, setMainImageUrl] = useState(post?.mainImageUrl || "");
  const [metaDescription, setMetaDescription] = useState(
    post?.metaDescription || ""
  );
  const [sources, setSources] = useState(post?.sources || "");
  const [hashtags, setHashtags] = useState(post?.hashtags || "");
  const [error, setError] = useState("");
  const { accessToken, setAccessToken } = useAuth();

  useEffect(() => {
    setTitle(post?.title || "");
    setSlug(post?.slug || "");
    setHtml(post?.content ? JSON.stringify(post.content) : "");
  }, [post]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const content = parseHtmlToBlocks(html);
      const payload: any = {
        title,
        slug,
        content,
        mainImageUrl,
        metaDescription,
        sources,
        hashtags,
      };
      if (slug.trim().length === 0) {
        payload.slug = title + "_" + Date.now();
      }
      payload.slug = payload.slug
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      if (post) {
        await updatePost(post.id, payload, accessToken, setAccessToken);
      } else {
        await createPost(payload, accessToken, setAccessToken);
      }
      setTitle("");
      setSlug("");
      setHtml("");
      setMainImageUrl("");
      setMetaDescription("");
      setSources("");
      setHashtags("");
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <ErrorMessage message={error} />
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Paste HTML here"
        value={html}
        required
        onChange={(e) => setHtml(e.target.value)}
        className="w-full p-2 border rounded h-40"
      />
      <input
        type="text"
        placeholder="Main image URL"
        value={mainImageUrl}
        onChange={(e) => setMainImageUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Meta Description"
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Sources"
        value={sources}
        onChange={(e) => setSources(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Hashtags"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {post ? "Update" : "Create"}
      </button>
    </form>
  );
}
