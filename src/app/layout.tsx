import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/navbar";
import Footer from "./_components/footer/footer";
import { Toaster } from "react-hot-toast";
import NextauthProviders from "./providers/nextauthProviders";
import Providers from "./providers/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <NextauthProviders>
          <Toaster></Toaster>
          <Navbar />
          <div className="container mx-auto max-w-7xl">{children}</div>
          <Footer />
        </NextauthProviders>
        </Providers>
      </body>
    </html>
  );
}
