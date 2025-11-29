"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Post } from "../lib/types";
import { getPosts } from "../lib/api/postsApi";
import { useNotify } from "../lib/ErrorProvider";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 2;
  const searchParams = useSearchParams();
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

  useEffect(() => {
    const q = searchParams?.get("search") || "";
    setQuery(q);
    setPage(1);
  }, [searchParams]);

  const startIndex = (page - 1) * PAGE_SIZE;
  const filteredAll = query.trim()
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.metaDescription?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const totalPages = Math.max(
    1,
    Math.ceil((query.trim() ? filteredAll.length : posts.length) / PAGE_SIZE)
  );

  const paginated = posts.slice(startIndex, startIndex + PAGE_SIZE);
  const paginatedFiltered = filteredAll.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  function goToPage(p: number) {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-w-sm">
      <main>
        <div className="mb-6">
          <label htmlFor="page-search" className="sr-only">
            Search posts
          </label>
          <div className="max-w-4xl mx-auto flex gap-2">
            <input
              id="page-search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Filter posts by title..."
              className="flex-1 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              onClick={() => {
                setQuery("");
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {(query.trim() ? paginatedFiltered : paginated).map((p: Post) => (
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
