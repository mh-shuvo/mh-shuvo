import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Mehedi Hasan | Senior Software Engineer",
  description:
    "Senior Software Engineer specializing in backend architecture, aviation systems, enterprise applications, real-time data processing, and security engineering with 8+ years of experience.",
  keywords: [
    "Mohammad Mehedi Hasan",
    "Senior Software Engineer",
    "Backend Architect",
    "Aviation Systems Developer",
    "PHP Laravel Engineer",
    "Python Developer",
    "Security Enthusiast",
    "ASL Systems",
  ],
  authors: [{ name: "Mohammad Mehedi Hasan", url: "https://mehedi.dev" }],
  creator: "Mohammad Mehedi Hasan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mohammad Mehedi Hasan | Senior Software Engineer",
    description:
      "Building Scalable Systems, Secure Software, and Aviation Technologies.",
    siteName: "Mohammad Mehedi Hasan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Mehedi Hasan | Senior Software Engineer",
    description:
      "Building Scalable Systems, Secure Software, and Aviation Technologies.",
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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
