"use client";
import { useState } from "react";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { Post } from "../lib/types";
import { useAuth } from "../lib/AuthProvider";

export default function PostsPage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState<Post | undefined>(undefined);
  const [refresh, setRefresh] = useState(0);

  function handleEdit(post: Post) {
    setEditing(post);
  }

  function handleSuccess() {
    setEditing(undefined);
    setRefresh((r) => r + 1);
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        {user && <PostForm post={editing} onSuccess={handleSuccess} />}
        <PostList key={refresh} onEdit={handleEdit} />
      </div>
    </>
  );
}
