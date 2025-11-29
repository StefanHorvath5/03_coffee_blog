"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "./lib/types";
import { getPosts } from "./lib/api/postsApi";
import Image from "next/image";
import TopCarousel from "./components/TopCarousel";
import Hero from "./components/Hero";
import { useNotify } from "./lib/ErrorProvider";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 4;
  const notify = useNotify();

  async function fetchPosts() {
    try {
      setPosts(await getPosts());
    } catch (err: any) {
      notify.showError("Could not load posts. Try again later.");
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginated = posts.slice(startIndex, startIndex + PAGE_SIZE);

  const topPosts = [...posts]
    .sort(
      (a, b) => +new Date(b.updatedAt as any) - +new Date(a.updatedAt as any)
    )
    .slice(0, 3);

  function goToPage(p: number) {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-w-sm">
      <Hero />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Coffee explained</h1>
        <p className="text-gray-600">
          Learn all you need to know about coffee. Build your very own coffee
          corner at home or explore coffee world with us.
        </p>
      </header>

      <main>
        {topPosts.length > 0 && <TopCarousel posts={topPosts} />}
        <div className="grid gap-6 md:grid-cols-2">
          {paginated.map((p) => (
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

        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
            <button
              key={pNum}
              onClick={() => goToPage(pNum)}
              className={`px-3 py-1 rounded border border-amber-700 ${
                pNum === page ? "bg-amber-700 text-white" : "bg-white"
              }`}
            >
              {pNum}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded ${
              page === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
