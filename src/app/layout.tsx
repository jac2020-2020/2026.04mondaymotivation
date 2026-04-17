import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script, Oswald, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
    default: "Monday Motivation - Daily Quotes & Poster Generator",
    template: "%s | Monday Motivation",
  },
  description: "Global minimalist Monday Motivation resource and poster generator. Find the best Monday motivation quotes for work, gym, and success.",
  keywords: ["monday motivation", "motivation quotes", "monday quotes", "poster generator", "monday inspiration", "motivational quotes for work", "gym motivation"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Monday Motivation - Daily Quotes & Poster Generator",
    description: "Global minimalist Monday Motivation resource and poster generator.",
    url: "https://mondaymotivation.org",
    siteName: "Monday Motivation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monday Motivation - Daily Quotes & Poster Generator",
    description: "Global minimalist Monday Motivation resource and poster generator.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} ${oswald.variable} ${spaceMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Header />
        
        {/* Main Content */}
        <div className="pb-24 md:pb-0">
          {children}
        </div>
      </body>
    </html>
  );
}


