"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORY_TO_IMAGES_SLUG, CATEGORY_TO_QUOTES_SLUG } from "@/lib/data";

export default function Header() {
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [isQuotesOpen, setIsQuotesOpen] = useState(false);
  const pathname = usePathname();

  const isImagesActive = pathname.startsWith("/images");
  const isQuotesActive = pathname.startsWith("/quotes");

  return (
    <header className="w-full bg-[var(--background)] border-b border-border-light relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Logo & Nav */}
          <div className="flex items-center gap-10 h-full">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: '"Trebuchet MS", Helvetica, sans-serif' }}
            >
              <img src="/logo.png" alt="MondayMotivation Logo" className="w-8 h-8 object-contain" />
              MondayMotivation
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 h-full">
              
              {/* Images Dropdown */}
              <div className="group relative h-full flex items-center">
                <Link 
                  href="/images" 
                  className={`flex items-center gap-1 transition-colors ${isImagesActive ? "text-brand-primary font-bold" : "hover:text-foreground"}`}
                >
                  Images <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                <div className="absolute top-[80%] left-0 bg-surface-1 border border-border-light shadow-xl rounded-xl py-2 w-48 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <Link href={`/images/${CATEGORY_TO_IMAGES_SLUG.work}`} className="block px-5 py-3 hover:bg-surface-2 text-gray-700 hover:text-foreground transition-colors">Work Motivation</Link>
                  <Link href={`/images/${CATEGORY_TO_IMAGES_SLUG.gym}`} className="block px-5 py-3 hover:bg-surface-2 text-gray-700 hover:text-foreground transition-colors">Gym Motivation</Link>
                  <Link href={`/images/${CATEGORY_TO_IMAGES_SLUG.funny}`} className="block px-5 py-3 hover:bg-surface-2 text-gray-700 hover:text-foreground transition-colors">Funny Memes</Link>
                </div>
              </div>

              {/* Quotes Dropdown */}
              <div className="group relative h-full flex items-center">
                <button className={`flex items-center gap-1 transition-colors ${isQuotesActive ? "text-brand-primary font-bold" : "hover:text-foreground"}`}>
                  Quotes <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-[80%] left-0 bg-surface-1 border border-border-light shadow-xl rounded-xl py-2 w-48 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <Link href={`/quotes/${CATEGORY_TO_QUOTES_SLUG.work}`} className="block px-5 py-3 hover:bg-surface-2 text-gray-700 hover:text-foreground transition-colors">Work Quotes</Link>
                  <Link href={`/quotes/${CATEGORY_TO_QUOTES_SLUG.gym}`} className="block px-5 py-3 hover:bg-surface-2 text-gray-700 hover:text-foreground transition-colors">Gym Quotes</Link>
                  <Link href={`/quotes/${CATEGORY_TO_QUOTES_SLUG.funny}`} className="block px-5 py-3 hover:bg-surface-2 text-gray-700 hover:text-foreground transition-colors">Funny Quotes</Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
