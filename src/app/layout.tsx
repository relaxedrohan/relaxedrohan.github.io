import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Rohan Yadav",
  description:
    "Portfolio of Rohan Yadav — Lead software engineer specializing in AI Agents, Web and Mobile Applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
