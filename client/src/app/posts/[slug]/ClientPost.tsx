/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Post, Roles } from "@/app/lib/types";
import BlockRenderer from "@/app/components/BlockRenderer";
import { useEffect } from "react";
import { useAuth } from "@/app/lib/AuthProvider";

interface Props {
  post: Post;
}

export default function ClientPost({ post }: Props) {
  const currentPost = post;
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!currentPost || !currentPost.slug) return;
    if (loading) return;
    if (user && user.role === Roles.ADMIN) return;

    (async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${currentPost.slug}/view`,
          {
            method: "POST",
          },
        );
      } catch (err) {
      }
    })();
  }, [currentPost, user, loading]);

  return (
    <div className="max-w-4xl mx-auto mt-4">
      {/* {currentPost.mainImageUrl && (
        <Image
          src={currentPost.mainImageUrl}
          alt={currentPost.title}
          width={1200}
          height={400}
          className="w-full h-64 object-cover rounded"
          priority
          unoptimized
        />
      )}

      <h1 className="text-3xl font-bold mt-4">{currentPost.title}</h1>
      <div className="prose mt-4"> */}
      <div className="my-5">
        <BlockRenderer blocks={currentPost.content as any} />
      </div>
      {/* </div> */}

      {currentPost.updatedAt !== currentPost.createdAt && (
        <div className="text-xs text-gray-400 mt-1">
          Updated at:{" "}
          {new Date(currentPost.updatedAt)
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}
        </div>
      )}
      {currentPost.createdAt && (
        <div className="text-xs text-gray-400 mt-1">
          Created at:{" "}
          {new Date(currentPost.createdAt)
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}
        </div>
      )}

      {currentPost.sources && (
        <div className="mt-3">
          <h2 className="text-l font-semibold">Sources</h2>
          <div className="text-xs text-gray-500">
            {currentPost.sources.split(",").map((s: string, i: number) => {
              const trimmed = s.trim();
              if (!trimmed) return null;
              const url = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
              return (
                <span key={i} className="break-words">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {trimmed}
                  </a>
                  {i < currentPost.sources.split(",").length - 1 ? ", " : ""}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {currentPost.hashtags && (
        <div className="mt-3">
          <h2 className="text-l font-semibold">Hashtags</h2>
          <p className="text-xs text-gray-500 whitespace-pre-wrap">
            {currentPost.hashtags}
          </p>
        </div>
      )}
    </div>
  );
}
