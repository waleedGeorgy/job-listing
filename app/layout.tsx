import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto_Condensed({
  variable: "--font-roboto",
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Job Listing",
  description: "A simple app for creating job listings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
        >
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </body>
      </SessionProvider>
    </html>
  );
}
