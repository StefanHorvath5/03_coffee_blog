import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-gray-100 border-t">
      <div className="container mx-auto p-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="font-bold text-lg">
            Coffee Explained
          </Link>
          <div className="text-xs text-gray-600">Brew better, learn more.</div>
        </div>

        <div className="space-x-4">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="mt-4 md:mt-0 text-gray-600">
          © {year} Coffee Explained
        </div>
      </div>
    </footer>
  );
}
