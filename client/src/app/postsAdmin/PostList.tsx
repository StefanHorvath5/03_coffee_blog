/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../lib/api/postsApi";
import { Post, Roles } from "../lib/types";
import { useNotify, GENERIC_ERROR_MESSAGE } from "../lib/ErrorProvider";
import { useAuth } from "../lib/AuthProvider";
import BlockRenderer from "../components/BlockRenderer";
import Image from "next/image";

export default function PostList({ onEdit }: { onEdit: (post: Post) => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, accessToken, setAccessToken } = useAuth();
  const notify = useNotify();

  async function fetchPosts() {
    try {
      setPosts(await getPosts());
    } catch (err: any) {
      notify.showError(err.message || GENERIC_ERROR_MESSAGE);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(id: string) {
    try {
      await deletePost(id, accessToken, setAccessToken);
      fetchPosts();
      notify.showSuccess("Post deleted");
    } catch (err: any) {
      notify.showError(err.message || GENERIC_ERROR_MESSAGE);
    }
  }

  return (
    <div>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-xl">{post.title}</div>
                <div className="text-sm text-gray-500">{post.slug}</div>
                <div className="text-sm text-gray-500">
                  Main image url:
                  {post.mainImageUrl && post.mainImageUrl.length > 0 && (
                    <Image
                      src={post.mainImageUrl}
                      alt={"No main image"}
                      width={50}
                      height={50}
                    />
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Meta description: {post.metaDescription}
                </div>
                <div className="text-sm text-gray-500">
                  Sources: {post.sources}
                </div>
                <div className="text-sm text-gray-500">
                  Hashtags: {post.hashtags}
                </div>
              </div>
              {user && (
                <div className="space-x-2">
                  <button
                    onClick={() => onEdit(post)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  {user.role === Roles.ADMIN && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <BlockRenderer blocks={post.content as any} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
