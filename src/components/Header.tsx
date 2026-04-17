"use client";

import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [isQuotesOpen, setIsQuotesOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left Section: Logo + Nav */}
        <div className="flex items-center gap-12 h-full">
          {/* Logo */}
          <Link href="/" className="font-playfair font-bold text-xl tracking-tight text-gray-900" style={{ fontFamily: "Trebuchet MS, Helvetica, sans-serif" }}>
            MondayMotivation
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans uppercase tracking-widest text-gray-600 font-medium h-full">
            
            {/* Images Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsImagesOpen(true)}
              onMouseLeave={() => setIsImagesOpen(false)}
            >
            <button className="flex items-center gap-1 hover:text-black transition-colors">
              Images <ChevronDown className="w-3 h-3" />
            </button>
            {isImagesOpen && (
              <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-xl rounded-xl py-2 w-48 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <Link href="/images/work" className="block px-5 py-3 hover:bg-gray-50 text-gray-700 hover:text-black">Work Posters</Link>
                <Link href="/images/gym" className="block px-5 py-3 hover:bg-gray-50 text-gray-700 hover:text-black">Gym Posters</Link>
                <Link href="/images/funny" className="block px-5 py-3 hover:bg-gray-50 text-gray-700 hover:text-black">Funny Memes</Link>
              </div>
            )}
          </div>

          {/* Quotes Dropdown */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsQuotesOpen(true)}
            onMouseLeave={() => setIsQuotesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-black transition-colors">
              Quotes <ChevronDown className="w-3 h-3" />
            </button>
            {isQuotesOpen && (
              <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-xl rounded-xl py-2 w-48 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <Link href="/quotes/work" className="block px-5 py-3 hover:bg-gray-50 text-gray-700 hover:text-black">Work Quotes</Link>
                <Link href="/quotes/gym" className="block px-5 py-3 hover:bg-gray-50 text-gray-700 hover:text-black">Gym Quotes</Link>
                <Link href="/quotes/funny" className="block px-5 py-3 hover:bg-gray-50 text-gray-700 hover:text-black">Funny Quotes</Link>
              </div>
            )}
          </div>

            {/* Blog */}
            <Link href="/blog" className="hover:text-black transition-colors">
              Blog
            </Link>
          </nav>
        </div>

        {/* Language Switcher & Mobile Placeholder */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-500 hover:text-black text-xs uppercase tracking-widest font-bold transition-colors border border-transparent hover:border-gray-200 px-3 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5" /> EN
          </button>
        </div>
      </div>
    </header>
  );
}
