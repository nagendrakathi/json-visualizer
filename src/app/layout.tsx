import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ThemeProviderClient from "@/components/ThemeProviderClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Json Visualizer",
  description: "Visualize and explore JSON data with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-full min-h-screen bg-background text-foreground p-5 flex flex-col gap-5 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviderClient>
          <Header />
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  );
}
