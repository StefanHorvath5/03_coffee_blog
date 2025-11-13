import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 mb-4">
      <Link href="/" className="font-bold text-lg">
        Coffee Explained
      </Link>
      <div className="space-x-4">
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
