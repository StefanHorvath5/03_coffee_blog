/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from "@/app/lib/types";
import BlockRenderer from "@/app/components/BlockRenderer";

interface Props {
  post: Post;
}

export default function ClientPost({ post }: Props) {
  const [currentPost, setCurrentPost] = useState<Post>(post);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  return (
    // <div className="max-w-3xl mx-auto p-6 bg-white rounded mt-6">

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
          <p className="text-xs text-gray-500 whitespace-pre-wrap">
            {currentPost.sources}
          </p>
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
