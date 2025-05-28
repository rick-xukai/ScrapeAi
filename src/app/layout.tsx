import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScrapeAi - Intelligent Web Scraping Made Simple",
  description: "Extract data from any website with the power of AI. No coding required, just describe what you need and let ScrapeAi do the rest.",
  keywords: ["web scraping", "AI", "data extraction", "automation", "no-code"],
  authors: [{ name: "ScrapeAi Team" }],
  creator: "ScrapeAi",
  publisher: "ScrapeAi",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "ScrapeAi - Intelligent Web Scraping Made Simple",
    description: "Extract data from any website with the power of AI. No coding required.",
    url: "https://scrapeai.com",
    siteName: "ScrapeAi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrapeAi - Intelligent Web Scraping Made Simple",
    description: "Extract data from any website with the power of AI. No coding required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
