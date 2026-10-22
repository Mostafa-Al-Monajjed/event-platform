import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/providers";
import { Navbar } from "../components/layout/navbar";
import { Toaster } from "../components/ui/sonner";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventHub",
  description: "Event management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} min-h-screen bg-gradient-to-b from-indigo-50/70 via-background to-background antialiased dark:from-indigo-950/30`}
      >
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
