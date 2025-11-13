"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "./lib/types";
import { getPosts } from "./lib/api/postsApi";
import Image from "next/image";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  async function fetchPosts() {
    try {
      setPosts(await getPosts());
    } catch (err: any) {
      console.log("err: ", err);
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 min-w-sm">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Coffee explained</h1>
        <p className="text-gray-600">
          Learn all you need to know about coffee. Build your very own coffee
          corner at home or explore coffee world with us.
        </p>
      </header>

      <main>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <Link href={`/posts/${p.slug}`} key={p.id}>
              <article className="bg-white rounded-lg shadow p-4">
                {p.mainImageUrl && (
                  <Image
                    src={p.mainImageUrl}
                    alt={p.title}
                    width={300}
                    height={100}
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <h2 className="text-xl font-semibold mt-3">{p.title}</h2>
                {p.metaDescription && (
                  <div className="relative">
                    <p className="text-sm text-gray-700 line-clamp-5 mb-2 break-words">
                      {p.metaDescription}
                    </p>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 fade-overlay opacity-100" />
                  </div>
                )}
                {p.updatedAt != p.createdAt ? (
                  <div className="text-xs text-gray-400 mt-1">
                    Updated at: {new Date(p.updatedAt).toLocaleString()}
                  </div>
                ) : (
                  p.createdAt && (
                    <div className="text-xs text-gray-400 mt-1">
                      Created at: {new Date(p.createdAt).toLocaleString()}
                    </div>
                  )
                )}
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
