import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script, Oswald, Space_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mondaymotivation.org'),
  title: {
    default: "Inspiring Monday Motivation Quotes & Poster Maker",
    template: "%s | Monday Motivation",
  },
  description: "Energize your week with the best Monday motivational quotes and custom posters! Create, download, and share daily inspiration instantly without signup.",
  keywords: ["monday motivation", "motivation quotes", "monday quotes", "poster generator", "monday inspiration", "motivational quotes for work", "funny memes", "image maker"],
  alternates: {
    canonical: 'https://mondaymotivation.org',
  },
  openGraph: {
    title: "Monday Motivation - Daily Quotes & Poster Generator",
    description: "Energize your week with the best Monday motivational quotes and custom posters! Create, download, and share daily inspiration instantly without signup.",
    url: "https://mondaymotivation.org",
    siteName: "Monday Motivation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monday Motivation - Daily Quotes & Poster Generator",
    description: "Energize your week with the best Monday motivational quotes and custom posters! Create, download, and share daily inspiration instantly without signup.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION as string,
    },
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
        className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} ${oswald.variable} ${spaceMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col`}
      >
        <Header />
        
        {/* Main Content */}
        <div className="flex-grow pb-24 md:pb-0">
          {children}
        </div>

        <Footer />
        
        {/* Google Analytics (已配置你的 ID: G-CXP3E19P5V) */}
        <GoogleAnalytics gaId="G-CXP3E19P5V" />
      </body>
    </html>
  );
}


