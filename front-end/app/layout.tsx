// app/layout.tsx (Server Component - no "use client")
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import InitialLoader from "@/components/InitialLoader";
import NavBar from "@/components/navbar/NavBar";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TakeAway",
  description: "Commandez votre nourriture en ligne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <InitialLoader />
          <NavBar />
          <main className="container py-2">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}