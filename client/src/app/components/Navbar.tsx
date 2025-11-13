"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q.length) {
      router.push(`/posts?search=${encodeURIComponent(q)}`);
    } else {
      router.push(`/posts`);
    }
    setOpen(false);
  }

  return (
    <header className="mb-6">
      {/* full-width background bar, centered content */}
      <nav className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4 rounded-md">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md hover:bg-amber-100"
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link href="/" className="font-extrabold text-xl text-amber-800">
              Coffee Explained
            </Link>
          </div>

          <form
            onSubmit={onSubmit}
            className="hidden sm:flex items-center w-full max-w-lg mx-4"
          >
            <label htmlFor="site-search" className="sr-only">
              Search posts
            </label>
            <input
              id="site-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, recipes, tips..."
              aria-label="Search posts"
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded-r-md hover:bg-amber-700"
            >
              Search
            </button>
          </form>

          <div className="hidden md:flex items-center gap-4 text-sm text-amber-800">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link
              href="/posts"
              className="px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700"
            >
              Posts
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="container mx-auto mt-2 p-4 bg-white rounded-md shadow-sm md:hidden">
          <form onSubmit={onSubmit} className="flex items-center gap-2 mb-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-amber-600 text-white rounded"
            >
              Search
            </button>
          </form>

          <div className="flex flex-col gap-2">
            <Link href="/posts" className="px-3 py-2 rounded hover:bg-amber-50">
              All posts
            </Link>
            <Link href="/about" className="px-3 py-2 rounded hover:bg-amber-50">
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded hover:bg-amber-50"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
