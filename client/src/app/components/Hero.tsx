export default function Hero() {
  return (
    <section className="container mx-auto my-6 px-4">
      <div className="rounded-lg overflow-hidden bg-gradient-to-r from-amber-100 via-white to-amber-50 shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-8 md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-3">
              Coffee Explained
            </h1>
            <p className="text-gray-700 mb-4 max-w-prose">
              Clear explanations, evidence-based insights, and curious deep
              dives into coffee. From common myths to overlooked details, this
              blog explores how coffee really works — backed by research, not
              hype.
            </p>
            <div className="flex gap-3">
              <a
                href="/posts"
                className="inline-block px-3 sm:px-5 py-2 bg-amber-600 text-white rounded-md shadow hover:bg-amber-700"
              >
                Explore posts
              </a>
              <a
                href="/about"
                className="inline-block px-3 sm:px-5 py-2 border border-amber-600 text-amber-700 rounded-md hover:bg-amber-50"
              >
                About the blog
              </a>
            </div>
          </div>

          <div className="md:w-1/3 p-6 flex items-center justify-center bg-[rgba(0,0,0,0.02)]">
            <svg
              width="160"
              height="160"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="10" fill="#FFFFFF" />

              {/* Steam */}
              <path
                d="M24 14c0 3-2 4-2 6s2 3 2 6"
                stroke="#C29B6B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M32 14c0 3-2 4-2 6s2 3 2 6"
                stroke="#B58E61"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M40 14c0 3-2 4-2 6s2 3 2 6"
                stroke="#D6B88B"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Cup */}
              <rect
                x="18"
                y="32"
                width="28"
                height="14"
                rx="4"
                fill="#D6B88B"
              />
              <path
                d="M46 34h2a6 6 0 0 1 0 12h-2"
                stroke="#B58E61"
                strokeWidth="2"
                fill="none"
              />

              {/* Saucer */}
              <ellipse cx="32" cy="48" rx="16" ry="3" fill="#E6D3B1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
