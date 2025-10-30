/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { createItem, updateItem } from "../lib/api/itemsApi";
import { Item } from "../lib/types";
import ErrorMessage from "../components/ErrorMessage";
import { useAuth } from "../lib/AuthProvider";

export default function ItemForm({
  item,
  onSuccess,
}: {
  item?: Item;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(item?.title || "");
  // content is stored as { html: string } on the server
  const [content, setContent] = useState(item?.content?.html || "");
  const [error, setError] = useState("");
  const { accessToken, setAccessToken } = useAuth();

  useEffect(() => {
    setTitle(item?.title || "");
    setContent(item?.content?.html || "");
  }, [item]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (item) {
        await updateItem(
          item.id,
          { title, content },
          accessToken,
          setAccessToken
        );
      } else {
        await createItem({ title, content }, accessToken, setAccessToken);
      }
      setTitle("");
      setContent("");
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
      <textarea
        placeholder="HTML content"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-40"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {item ? "Update" : "Create"}
      </button>
    </form>
  );
}
