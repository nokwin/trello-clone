import { Navbar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/providers";

export const metadata: Metadata = {
  title: "Trello clone",
  description: "Trello clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark bg-gray-900">
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
