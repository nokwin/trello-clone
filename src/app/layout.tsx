import { Navbar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
    <html lang="en" className="h-full">
      <body className="dark bg-gray-900 h-full">
        <ReactQueryProvider>
          <Navbar />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
