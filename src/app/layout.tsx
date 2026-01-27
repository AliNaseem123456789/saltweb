import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// 1. Import your components
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Himalayan Salt | Nature's Purest Essence",
  description:
    "Discover the finest Himalayan salt products for health and wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
