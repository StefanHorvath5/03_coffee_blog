"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Post } from "../lib/types";
import { getPosts } from "../lib/api/postsApi";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const blurTimeout = useRef<number | null>(null);
  const pathname = usePathname();
  const isPostsPath = pathname === "/posts";

  useEffect(() => {
    let mounted = true;
    getPosts()
      .then((data) => {
        if (mounted) setPosts(data || []);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q.length) {
      router.push(`/posts?search=${encodeURIComponent(q)}`);
      setShowDropdown(false);
    } else {
      router.push(`/posts`);
    }
    setOpen(false);
  }

  const filtered = query.trim()
    ? posts
        .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8)
    : [];

  function handleInputChange(val: string) {
    setQuery(val);
    if (val.trim().length > 0) setShowDropdown(true);
    else setShowDropdown(false);
  }

  function handleInputBlur() {
    blurTimeout.current = window.setTimeout(() => setShowDropdown(false), 150);
  }

  function handleInputFocus() {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
    if (query.trim().length > 0) setShowDropdown(true);
  }

  return (
    <header className="mb-6">
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

            <Link
              href="/"
              className="font-extrabold text-xl text-amber-800 site-brand"
            >
              Coffee Explained
            </Link>
          </div>

          {!isPostsPath && (
            <form
              onSubmit={onSubmit}
              className="hidden sm:flex items-center w-full max-w-lg mx-4"
            >
              <label htmlFor="site-search" className="sr-only">
                Search posts
              </label>
              <div className="relative flex-1">
                <input
                  id="site-search"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  placeholder="Search posts, recipes, tips..."
                  aria-label="Search posts"
                  aria-controls="search-results"
                  className="w-full px-4 py-2 rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
                />

                {showDropdown && filtered.length > 0 && (
                  <ul
                    id="search-results"
                    role="listbox"
                    className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-50 max-h-64 overflow-auto"
                  >
                    {filtered.map((p) => (
                      <li key={p.id} role="option" aria-selected={false}>
                        <Link
                          href={`/posts/${p.slug}`}
                          onClick={() => {
                            setShowDropdown(false);
                            setQuery("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-amber-50"
                        >
                          {p.mainImageUrl ? (
                            <Image
                              src={p.mainImageUrl}
                              alt={p.title}
                              width={56}
                              height={40}
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="w-14 h-10 bg-amber-100 rounded" />
                          )}
                          <span className="text-sm text-amber-800">
                            {p.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-r-md hover:bg-amber-700"
              >
                Search
              </button>
            </form>
          )}

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

      {open && !isPostsPath && (
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
