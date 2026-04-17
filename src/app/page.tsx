import { getRandomQuote, quotes } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import PosterCanvas from "@/components/PosterCanvas";
import { Quote as QuoteIcon, ArrowRight } from "lucide-react";

export default function Home() {
  const initialQuote = quotes[0] ?? getRandomQuote();
  const trendingQuotes = quotes.slice(0, 3);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Monday Motivation Poster Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Create beautiful, minimalist Monday motivation quote posters to start your week right. No sign-up required.",
    url: "https://mondaymotivation.org",
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Monday Motivation",
    url: "https://mondaymotivation.org",
    description: "Global minimalist Monday Motivation resource and poster generator.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://mondaymotivation.org/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: quotes.map((q) => ({
      "@type": "Question",
      name: `What is a good Monday Motivation quote?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `"${q.text}" - ${q.author}`,
      },
    })),
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 pb-0 px-4 max-w-7xl mx-auto selection:bg-gray-900 selection:text-white relative">
      <JsonLd data={softwareSchema} />
      <JsonLd data={webSiteSchema} />
      <JsonLd data={faqSchema} />
      
      {/* 1. Hero Section (核心英雄区) */}
      <header className="flex flex-col items-center mb-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/50 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
          </span>
          Free Poster Generator
        </div>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-center text-foreground tracking-tight leading-tight max-w-4xl">
          Fuel Your Week With <span className="italic text-brand-primary">Monday Motivation</span>
        </h1>
        <p className="text-gray-500 font-sans text-base md:text-lg max-w-2xl text-center leading-relaxed">
          Create beautiful, minimalist Monday motivation posters in seconds. Choose a theme, customize your quote, and download instantly. No sign-up required.
        </p>
      </header>

      {/* 2. Interactive Tool (直接暴露产品) */}
      <div className="w-full max-w-5xl flex justify-center mb-32">
        <PosterCanvas initialQuote={initialQuote} category="motivation" isLandingPage={true} />
      </div>

      {/* 3. Categories / Discovery (探索区) */}
      <section className="w-full max-w-5xl pb-24 border-t border-border-light pt-24 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-foreground">Explore Collections</h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">Need the perfect words for a specific situation? Browse our handpicked collections of motivation quotes.</p>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/quotes/work" className="group relative overflow-hidden rounded-3xl bg-surface-2 p-8 hover:bg-brand-primary transition-colors duration-500 min-h-[240px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <QuoteIcon className="w-24 h-24 text-foreground group-hover:text-surface-1" />
            </div>
            <h3 className="text-2xl font-playfair font-bold mb-2 text-foreground group-hover:text-surface-1 transition-colors relative z-10">Work & Office</h3>
            <p className="text-sm text-gray-500 group-hover:text-brand-secondary transition-colors relative z-10 mb-6">Professional quotes to boost productivity.</p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-surface-1 transition-colors relative z-10">
              Browse Quotes <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link href="/quotes/gym" className="group relative overflow-hidden rounded-3xl bg-surface-2 p-8 hover:bg-brand-primary transition-colors duration-500 min-h-[240px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <QuoteIcon className="w-24 h-24 text-foreground group-hover:text-surface-1" />
            </div>
            <h3 className="text-2xl font-playfair font-bold mb-2 text-foreground group-hover:text-surface-1 transition-colors relative z-10">Gym & Fitness</h3>
            <p className="text-sm text-gray-500 group-hover:text-brand-secondary transition-colors relative z-10 mb-6">Hardcore motivation to crush your goals.</p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-surface-1 transition-colors relative z-10">
              Browse Quotes <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link href="/quotes/funny" className="group relative overflow-hidden rounded-3xl bg-surface-2 p-8 hover:bg-brand-primary transition-colors duration-500 min-h-[240px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <QuoteIcon className="w-24 h-24 text-foreground group-hover:text-surface-1" />
            </div>
            <h3 className="text-2xl font-playfair font-bold mb-2 text-foreground group-hover:text-surface-1 transition-colors relative z-10">Funny Memes</h3>
            <p className="text-sm text-gray-500 group-hover:text-brand-secondary transition-colors relative z-10 mb-6">Start the week with a quick laugh.</p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-surface-1 transition-colors relative z-10">
              Browse Quotes <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Trending / Popular Content (热门内容推荐) */}
      <section className="w-[100vw] bg-surface-2 rounded-t-[3rem] pt-24 pb-32 flex flex-col items-center">
        <div className="w-full max-w-5xl px-4 md:px-0">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-foreground">Trending Today</h2>
              <p className="text-gray-500">The most shared Monday motivation quotes right now.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingQuotes.map((q) => (
              <div key={q.id} className="bg-surface-1 p-8 rounded-3xl shadow-sm border border-border-light flex flex-col justify-between h-full">
                <QuoteIcon className="w-8 h-8 text-brand-secondary mb-6" />
                <p className="text-xl font-playfair text-foreground mb-8 leading-relaxed">
                  &ldquo;{q.text}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border-light">
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">— {q.author}</span>
                  <Link href={`/images/${q.category[0] || 'motivation'}`} className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-primary-hover transition-colors">
                    Make Poster
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer (页脚) */}
      <footer className="w-[100vw] py-12 border-t border-gray-100 flex flex-col items-center bg-white">
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-0">
          <div className="flex items-center gap-2">
            <span className="font-playfair font-bold text-xl text-gray-900">MondayMotivation</span>
            <span className="text-gray-300">|</span>
            <span className="text-xs font-sans uppercase tracking-widest text-gray-400">© {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <a href="mailto:hello@mondaymotivation.org" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
