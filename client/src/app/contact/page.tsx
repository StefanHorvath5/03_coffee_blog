export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded mt-6">
      <h1 className="text-3xl font-bold mt-4">Get in touch</h1>

      <div className="prose mt-4">
        <p>
          Have a question, spotted a mistake, or just want to talk about coffee?
          I’m always happy to hear from fellow coffee lovers.
        </p>

        <p>
          You can reach out if you have a topic you’d like to see covered, a
          research paper you think is worth discussing, or if you simply want to
          share your experience or opinion. Constructive feedback is very
          welcome — this blog is constantly evolving.
        </p>

        <p className="mt-2">
          The easiest way to contact me is via email or Instagram:
        </p>

        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:coffeexplained@gmail.com">
              coffeexplained@gmail.com
            </a>
          </li>
          <li>
            <strong>Instagram:</strong>{" "}
            <a
              href="https://instagram.com/coffeeexplained"
              target="_blank"
              rel="noopener noreferrer"
            >
              @coffeeexplained
            </a>
          </li>
        </ul>

        <p className="mt-2">
          I try to read every message and reply when I can — thanks for stopping
          by and being part of the conversation.
        </p>
      </div>
    </div>
  );
}
