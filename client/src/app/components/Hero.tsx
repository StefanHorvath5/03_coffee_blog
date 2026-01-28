export default function Hero() {
  return (
    <section className="mx-auto mb-6 mt-1 md:px-4">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-xl border border-amber-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-5 sm:p-6 md:p-8 md:w-2/3 z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-amber-900 mb-4 tracking-tight">
              Coffee <span className="text-amber-600">Explained</span>
            </h1>
            <p className="text-slate-600 mb-6 max-w-prose text-lg leading-relaxed">
              Clear explanations, evidence-based insights, and curious deep
              dives into coffee. From common myths to overlooked details, this
              blog explores how coffee really works — backed by research, not
              hype.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/posts"
                className="inline-flex items-center px-6 py-3 bg-amber-700 text-white font-medium rounded-lg shadow-md hover:bg-amber-800 transition-colors duration-200"
              >
                Explore posts
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 border border-amber-200 text-amber-800 font-medium rounded-lg hover:bg-amber-50 transition-colors duration-200"
              >
                About the blog
              </a>
            </div>
          </div>

          {/* Illustration Container */}
          <div className="md:w-1/3 w-full p-5 sm:p-6 md:p-8 flex items-center justify-center relative">
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-amber-100/50 rounded-full blur-3xl transform scale-75 translate-x-4 translate-y-4"></div>

            <svg
              width="240"
              height="240"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 drop-shadow-lg"
            >
              {/* --- The Saucer --- */}
              <ellipse cx="100" cy="165" rx="70" ry="12" fill="#E7E5E4" />
              <ellipse cx="100" cy="162" rx="40" ry="6" fill="#D6D3D1" />

              {/* --- The Cup Body --- */}
              <path
                d="M60 70 C 60 70, 60 140, 100 140 C 140 140, 140 70, 140 70"
                fill="#FFFBEB"
                stroke="#D97706"
                strokeWidth="2"
              />

              {/* --- The Handle --- */}
              <path
                d="M140 85 C 165 85, 170 110, 155 125 C 150 130, 138 128, 138 128"
                stroke="#D97706"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* --- Coffee Liquid Surface (Perspective) --- */}
              <ellipse cx="100" cy="70" rx="40" ry="10" fill="#78350F" />
              <ellipse cx="100" cy="70" rx="36" ry="7" fill="#92400E" />

              {/* --- Reflection on Cup --- */}
              <path
                d="M68 80 Q 68 120 90 130"
                stroke="#FDE68A"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* --- Coffee Bean (Floating decoration) --- */}
              <g transform="translate(130, 140) rotate(-15)">
                <ellipse cx="15" cy="15" rx="14" ry="10" fill="#451a03" />
                <path
                  d="M5 15 Q 15 22 25 15"
                  stroke="#92400E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>

              {/* --- Steam (Stylized) --- */}
              <g className="opacity-70">
                <path
                  d="M85 35 Q 95 20 85 5"
                  stroke="#D97706"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                >
                  <animate
                    attributeName="d"
                    values="M85 35 Q 95 20 85 5; M85 35 Q 75 20 85 5; M85 35 Q 95 20 85 5"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M100 45 Q 110 30 100 15"
                  stroke="#B45309"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                >
                  <animate
                    attributeName="d"
                    values="M100 45 Q 110 30 100 15; M100 45 Q 90 30 100 15; M100 45 Q 110 30 100 15"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M115 35 Q 125 20 115 5"
                  stroke="#D97706"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                >
                  <animate
                    attributeName="d"
                    values="M115 35 Q 125 20 115 5; M115 35 Q 105 20 115 5; M115 35 Q 125 20 115 5"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
