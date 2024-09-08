import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
