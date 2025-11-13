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
              Deep dives, simple guides and delicious recipes — everything you
              need to brew and enjoy better coffee. Browse tutorials, reviews
              and quick tips tailored for every taste.
            </p>
            <div className="flex gap-3">
              <a
                href="/posts"
                className="inline-block px-5 py-2 bg-amber-600 text-white rounded-md shadow hover:bg-amber-700"
              >
                Explore posts
              </a>
              <a
                href="/about"
                className="inline-block px-5 py-2 border border-amber-600 text-amber-700 rounded-md hover:bg-amber-50"
              >
                About us
              </a>
            </div>
          </div>

          <div className="md:w-1/3 p-6 flex items-center justify-center bg-[rgba(0,0,0,0.02)]">
            {/* Simple decorative coffee cup SVG */}
            <svg
              width="140"
              height="140"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="8" fill="#fff" />
              <path
                d="M48 20c0 6.627-5.373 12-12 12H18v6c0 3.314 2.686 6 6 6h6c7.18 0 13-5.82 13-13v-7h-3z"
                fill="#D6B88B"
                opacity="0.95"
              />
              <path
                d="M42 18c3 0 6 2 6 5s-3 5-6 5"
                stroke="#B58E61"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18 30h6"
                stroke="#C29B6B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
