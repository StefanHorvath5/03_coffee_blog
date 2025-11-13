import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-amber-50 border-t">
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-amber-900">
        <div>
          <Link href="/" className="font-bold text-lg">
            Coffee Explained
          </Link>
          <div className="text-xs text-amber-700">Brew better, learn more.</div>
        </div>

        <div className="flex flex-col md:items-center">
          <span className="font-semibold mb-2">Navigate</span>
          <div className="flex flex-col gap-2">
            <Link href="/posts" className="hover:underline">
              Posts
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>

        <div className="md:text-right">
          <div className="text-amber-700">© {year} Coffee Explained</div>
          <div className="text-xs text-amber-600">
            Made with ☕ — join our mailing list for new posts.
          </div>
        </div>
      </div>
    </footer>
  );
}
