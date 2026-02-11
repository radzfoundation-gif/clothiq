import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import Inter from Google Fonts
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ClothIQ - AI Fashion Try-On",
  description: "Virtual try-on for your fashion brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body
        className={`bg-background-light dark:bg-background-dark font-display text-primary dark:text-white antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
