import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./lib/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Explained",
  description: "Your ultimate guide to coffee brewing, recipes, and culture.",
  keywords: [
    "coffee",
    "espresso",
    "latte",
    "latte art",
    "brew",
    "coffee blog",
    "cold brew",
    "coffee recipes",
    "explain coffee",
  ],
  authors: [{ name: "Coffee Explained", url: "https://coffeeexplained.com" }],
  openGraph: {
    title: "Coffee explained — Coffee Blog",
    description: "Learn all you need to know about coffee",
    url: "https://coffeeexplained.com",
    siteName: "Coffee explained",
    // images: [
    //   {
    //     url: "https://coffeeexplained.com/og-default.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Coffee explained",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
