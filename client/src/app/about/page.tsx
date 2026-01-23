export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded mt-6">
      <h1 className="text-3xl font-bold mt-4">Something about us</h1>
      <div className="prose mt-4 py-3">
        <p>
          This blog exists for one simple reason: coffee is way more interesting
          than most of us realize. I’m a coffee enthusiast who got tired of
          seeing the same recycled facts, half-truths, and myths repeated over
          and over again. Instead of just saying “studies show” and moving on, I
          wanted to dig a little deeper and actually read what those studies
          say.
        </p>

        <p>
          Here, I explore the science, history, and everyday curiosities of
          coffee — from caffeine myths and brewing variables to why coffee
          tastes the way it does and how it affects the body. My goal is to
          explain things in a clear, approachable way, especially the kind of
          details most people wouldn’t think to Google on their own.
        </p>

        <p>
          I’m not perfect, and I’m not pretending to be. I do use AI tools to
          help with writing clarity, idea generation, and catching mistakes —
          but the content isn’t AI-generated. Every article is researched by
          hand, and under every article you’ll find links to real scientific
          papers and research sources at the bottom of each post so you can
          explore further on your own.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Author</h2>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          Coffee/Latte art enthusiast and IT guy from Europe
        </p>
      </div>
    </div>
  );
}
