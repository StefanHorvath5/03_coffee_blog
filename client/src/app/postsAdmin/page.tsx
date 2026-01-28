/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { Post, Roles } from "../lib/types";
import { useAuth } from "../lib/AuthProvider";
import { notFound } from "next/navigation";
import { createPost, updatePost } from "../lib/api/postsApi";
import { useNotify } from "../lib/ErrorProvider";
import ErrorMessage from "../components/ErrorMessage";

export default function PostsPage() {
  const { user, loading, accessToken, setAccessToken } = useAuth();
  const [editing, setEditing] = useState<Post | undefined>(undefined);
  const [refresh, setRefresh] = useState(0);
  const notify = useNotify();
  const [jsonText, setJsonText] = useState("");
  const [uploaderError, setUploaderError] = useState("");

  function handleEdit(post: Post) {
    setEditing(post);
  }

  function handleSuccess() {
    setEditing(undefined);
    setRefresh((r) => r + 1);
  }

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== Roles.ADMIN) return notFound();

  return (
    <>
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Quick JSON upload</div>
          <ErrorMessage message={uploaderError} />
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='Paste JSON here (example: {"title":"...","content":[...]})'
            className="w-full p-2 border rounded h-40 mb-2"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                setUploaderError("");
                try {
                  if (!jsonText || jsonText.trim().length === 0) {
                    setUploaderError("Please paste JSON payload first");
                    return;
                  }
                  const data = JSON.parse(jsonText);
                  const payload: any = {
                    title: data.title || "Untitled",
                    slug: data.slug || "",
                    content: Array.isArray(data.content)
                      ? data.content
                      : data.content
                        ? JSON.parse(data.content)
                        : [],
                    mainImageUrl: data.mainImageUrl || "",
                    metaDescription: data.metaDescription || "",
                    sources: data.sources || "",
                    hashtags: data.hashtags || "",
                    hidden:
                      typeof data.hidden === "boolean" ? data.hidden : true,
                  };
                  if (payload.slug.toString().trim().length === 0) {
                    payload.slug = payload.title + "_" + Date.now();
                  }
                  payload.slug = payload.slug
                    .toString()
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");

                  if (data.id) {
                    await updatePost(
                      data.id,
                      payload,
                      accessToken,
                      setAccessToken,
                    );
                  } else {
                    await createPost(payload, accessToken, setAccessToken);
                  }
                  setJsonText("");
                  setRefresh((r) => r + 1);
                  notify.showSuccess("Post created from JSON");
                } catch (err: any) {
                  const msg = err?.message || "Failed to upload";
                  setUploaderError(msg);
                  notify.showError(msg);
                }
              }}
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Upload JSON
            </button>
            <div className="text-xs text-gray-500">Or use the form below</div>
          </div>
        </div>
        <PostForm post={editing} onSuccess={handleSuccess} />
        <PostList key={refresh} onEdit={handleEdit} />
      </div>
    </>
  );
}
