import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./lib/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased has-pattern`}
      >
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto p-4">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
