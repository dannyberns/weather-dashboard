import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store/StoreProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "Weather forecast application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <header>
            <div className="bg-gray-600 text-white p-4 shadow-md border-b border-gray-500 flex justify-between items-center">
              <h1 className="text-2xl md:text-4xl font-bold">
                Weather Dashboard
              </h1>
              <nav className="flex gap-3">
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
