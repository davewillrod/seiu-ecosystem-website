import type { Metadata } from "next";
import { Work_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/nav/SiteNav";

const workSans = Work_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "SEIU Healthcare — Ecosystem Architecture",
  description:
    "Strategic architecture and transformation brief for the SEIU Healthcare digital ecosystem. Prepared by Frameworks & Co.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${workSans.variable} ${dmMono.variable}`}>
      <body className="bg-grey font-sans text-black">
        <div className="flex min-h-screen">
          <SiteNav />
          <main className="ml-[248px] flex-1 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
