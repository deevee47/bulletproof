import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BulletProof 2.0",
  description: "The ultimate event for those who aim to be unstoppable. Are you ready to transform, challenge, and conquer? Let's go beyond limits! Join us on the 15th and 16th of October for an unforgettable experience filled with action, excitement, and epic moments!",

  
  openGraph: {
    title: "BulletProof 2.0",
    description: "The ultimate event for those who aim to be unstoppable. Transform, challenge, and conquer beyond limits! Join us Oct 15-16 for an epic experience!",
    type: "website",
    url: "https://atc-bulletproof.vercel.app/", 
    images: [
      {
        url: "logo.jpg", 
        width: 1200,
        height: 630,
        alt: "BulletProof 2.0 Event",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BulletProof 2.0",
    description: "Transform, challenge, conquer! Join us Oct 15-16 for the ultimate unstoppable experience. #BulletProof2",
    creator: "@alanturingclub", // Replace with your Twitter handle
    images: ["logo.jpg"],
  },
};

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}