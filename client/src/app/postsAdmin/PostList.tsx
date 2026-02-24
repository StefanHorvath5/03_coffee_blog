/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { deletePost, getAdminPosts } from "../lib/api/postsApi";
import { Post, Roles } from "../lib/types";
import { useNotify, GENERIC_ERROR_MESSAGE } from "../lib/ErrorProvider";
import { useAuth } from "../lib/AuthProvider";
import BlockRenderer from "../components/BlockRenderer";
import Image from "next/image";

export default function PostList({ onEdit }: { onEdit: (post: Post) => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const { user, accessToken, setAccessToken } = useAuth();
  const notify = useNotify();

  const toggleExpanded = (postId: string) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  async function fetchPosts() {
    try {
      setPosts(await getAdminPosts(accessToken, setAccessToken));
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
          <li key={post.id} className="border p-4 rounded flex flex-col">
            <div
              className={`overflow-hidden transition-all ${
                expandedPosts.has(post.id) ? "" : "max-h-[350px]"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="min-w-0">
                  <div className="font-bold text-xl">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {post.title}
                    </Link>
                  </div>
                  <div className="text-sm text-gray-500">{post.slug}</div>
                  <div className="text-sm text-gray-500">
                    Main image url:
                    {post.mainImageUrl && post.mainImageUrl.length > 0 && (
                      <img
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
                    Sources:{" "}
                    {post.sources &&
                      post.sources.split(",").map((s, i) => {
                        const trimmed = s.trim();
                        if (!trimmed) return null;
                        const url = /^https?:\/\//i.test(trimmed)
                          ? trimmed
                          : `https://${trimmed}`;
                        return (
                          <span key={i} className="break-words">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline text-xs cursor-pointer break-words"
                            >
                              {trimmed}
                            </a>
                            {i < post.sources.split(",").length - 1 ? ", " : ""}
                          </span>
                        );
                      })}
                  </div>
                  <div className="text-sm text-gray-500">
                    Hashtags: {post.hashtags}
                  </div>
                  <div className="text-sm text-gray-500">
                    Hidden: {post.hidden ? "yes" : "no"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Views: {post.numOfViews ?? 0}
                  </div>
                </div>
                {user && (
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        onEdit(post);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                    >
                      Edit
                    </button>
                    {user.role === Roles.ADMIN && (
                      <button
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          handleDelete(post.id);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
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
            </div>
            <button
              onClick={() => toggleExpanded(post.id)}
              className="mt-3 w-full bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400"
            >
              {expandedPosts.has(post.id) ? "Collapse" : "Expand"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
