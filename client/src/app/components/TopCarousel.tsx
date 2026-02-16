"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "../lib/types";

type Props = { posts: Post[] };

export default function TopCarousel({ posts }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % posts.length);
    }, 5000);
    return () => clearInterval(id);
  }, [posts]);

  if (!posts || posts.length === 0) return null;

  const current = posts[index];
  const imageIsDark = false;

  return (
    <section className="mx-auto mb-6">
      <div className="relative rounded-lg overflow-hidden shadow-lg group">
        {current.mainImageUrl ? (
          <div className="relative h-56 sm:h-72 md:h-80 lg:h-96">
            <img
              src={current.mainImageUrl}
              alt={current.title}
              className="object-cover"
            />
            {imageIsDark ? (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
            )}
          </div>
        ) : (
          <div className="h-56 sm:h-72 md:h-80 lg:h-96 bg-amber-100" />
        )}

        <div className="absolute inset-0 flex items-end">
          <div
            className={`p-6 pb-8 w-full backdrop-blur-sm ${
              imageIsDark
                ? "bg-gradient-to-t from-black/60 via-black/40 to-black/10"
                : "bg-gradient-to-t from-white/60 via-white/40 to-white/20"
            }`}
          >
            <h3
              className={`${
                imageIsDark ? "!text-white text-glow" : "text-amber-900"
              } text-2xl md:text-3xl font-bold`}
            >
              {current.title}
            </h3>
            {current.metaDescription && (
              <p
                className={`${
                  imageIsDark ? "text-white/95 text-glow" : "text-amber-800"
                } mt-2 max-w-prose text-sm md:text-base line-clamp-3`}
              >
                {current.metaDescription}
              </p>
            )}
            <div className="mt-4">
              <Link
                href={`/posts/${current.slug}`}
                className="inline-block bg-amber-600 text-white px-4 py-2 rounded-md shadow hover:bg-amber-700"
              >
                Read post
              </Link>
            </div>
          </div>
        </div>

        <button
          aria-label="Previous"
          onClick={() => setIndex((i) => (i - 1 + posts.length) % posts.length)}
          onPointerUp={(e) => (e.currentTarget as HTMLButtonElement).blur()}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus:opacity-100 pointer-events-none group-hover:pointer-events-auto focus:pointer-events-auto transition-opacity duration-200 bg-white/80 p-2 rounded-full shadow hover:bg-white"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={() => setIndex((i) => (i + 1) % posts.length)}
          onPointerUp={(e) => (e.currentTarget as HTMLButtonElement).blur()}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus:opacity-100 pointer-events-none group-hover:pointer-events-auto focus:pointer-events-auto transition-opacity duration-200 bg-white/80 p-2 rounded-full shadow hover:bg-white"
        >
          ›
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-amber-600" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
