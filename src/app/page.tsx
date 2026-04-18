import { getRandomQuote, quotes, CATEGORY_TO_QUOTES_SLUG, CATEGORY_TO_IMAGES_SLUG } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import PosterCanvas from "@/components/PosterCanvas";
import { Quote as QuoteIcon, ArrowRight, ChevronDown } from "lucide-react";

export default function Home() {
  const initialQuote = quotes[0] ?? getRandomQuote();
  const trendingQuotes = quotes.slice(0, 3);
  const faqItems = [
    {
      question: "What is Monday motivation?",
      answer:
        "Monday motivation (also called motivational Monday) is a mindset and a set of small habits that help you start the week with clarity, energy, and momentum. People use Monday motivation quotes and posters to reset focus and take the first step.",
    },
    {
      question: "What are Monday motivation quotes?",
      answer:
        "Monday motivation quotes are short, action-focused lines that help you start the week strong. Pick a quote you like, customize it, and turn it into a shareable poster in the generator.",
    },
    {
      question: "Motivational Monday quotes vs Monday motivation quotes — what’s the difference?",
      answer:
        "They mean the same thing. Motivational Monday quotes is a common variation, while Monday motivation quotes is the more popular phrase. This site supports both by organizing quotes and posters by intent and category.",
    },
    {
      question: "Where can I find Monday motivational quotes for work?",
      answer:
        "Use the Work & Office collection for Monday motivational quotes for work. You can copy a quote or jump straight to making a work poster for Slack, email, or your desktop wallpaper.",
    },
    {
      question: "How do I stay motivated on Monday?",
      answer:
        "Start with a small win, then keep your reminder visible. Save a Monday motivation quote poster as your lock screen or desktop, and refresh it whenever you need a boost.",
    },
  ];

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
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
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
          Free image maker
        </div>
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-center text-foreground tracking-tight leading-tight max-w-4xl">
          Fuel Your Week With <span className="italic text-brand-primary">Monday Motivation</span>
        </h1>
        <p className="text-gray-500 font-sans text-base md:text-lg max-w-2xl text-center leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Explore Collections</h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Need the perfect words for a specific situation? Browse our handpicked collections of motivation quotes.</p>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href={`/quotes/${CATEGORY_TO_QUOTES_SLUG.work}`} className="group relative overflow-hidden rounded-3xl bg-surface-2 p-8 hover:bg-brand-primary transition-colors duration-500 min-h-[240px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <QuoteIcon className="w-24 h-24 text-foreground group-hover:text-surface-1" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-surface-1 transition-colors relative z-10" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Work & Office</h3>
            <p className="text-sm text-gray-500 group-hover:text-brand-secondary transition-colors relative z-10 mb-6">Professional quotes to boost productivity.</p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-surface-1 transition-colors relative z-10">
              Browse Quotes <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link href={`/quotes/${CATEGORY_TO_QUOTES_SLUG.gym}`} className="group relative overflow-hidden rounded-3xl bg-surface-2 p-8 hover:bg-brand-primary transition-colors duration-500 min-h-[240px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <QuoteIcon className="w-24 h-24 text-foreground group-hover:text-surface-1" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-surface-1 transition-colors relative z-10" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Gym & Fitness</h3>
            <p className="text-sm text-gray-500 group-hover:text-brand-secondary transition-colors relative z-10 mb-6">Hardcore motivation to crush your goals.</p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-surface-1 transition-colors relative z-10">
              Browse Quotes <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          <Link href={`/quotes/${CATEGORY_TO_QUOTES_SLUG.funny}`} className="group relative overflow-hidden rounded-3xl bg-surface-2 p-8 hover:bg-brand-primary transition-colors duration-500 min-h-[240px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <QuoteIcon className="w-24 h-24 text-foreground group-hover:text-surface-1" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-surface-1 transition-colors relative z-10" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Funny Memes</h3>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Trending Today</h2>
            <p className="text-gray-500 max-w-xl mx-auto" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>The most shared Monday motivation quotes right now.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingQuotes.map((q) => (
              <div key={q.id} className="bg-surface-1 p-8 rounded-3xl shadow-sm border border-border-light flex flex-col justify-between h-full">
                <QuoteIcon className="w-8 h-8 text-brand-secondary mb-6" />
                <p className="text-xl text-foreground mb-8 leading-relaxed" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  &ldquo;{q.text}&rdquo;
                </p>
                <div className={`flex items-center mt-auto pt-6 border-t border-border-light ${q.author?.trim() && q.author.trim().toLowerCase() !== "unknown" ? "justify-between" : "justify-end"}`}>
                  {q.author?.trim() && q.author.trim().toLowerCase() !== "unknown" && (
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">— {q.author}</span>
                  )}
                  <Link href={`/images/${CATEGORY_TO_IMAGES_SLUG[q.category[0]] || CATEGORY_TO_IMAGES_SLUG.motivation}`} className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-primary-hover transition-colors">
                    Make Poster
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl pt-24 pb-28 px-4 md:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            FAQ
          </h2>
        </div>

        <div className="w-full max-w-3xl mx-auto bg-surface-1 border border-border-light rounded-3xl overflow-hidden shadow-sm">
          {faqItems.map((item, idx) => (
            <details
              key={item.question}
              className={`${idx === 0 ? "" : "border-t border-border-light"} group`}
            >
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-start justify-between gap-4 px-6 py-5 md:px-8 md:py-6 hover:bg-surface-2/60 transition-colors">
                <h3 className="text-base md:text-lg font-bold text-foreground leading-snug" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                  {item.question}
                </h3>
                <span className="shrink-0 w-9 h-9 rounded-full bg-surface-2 border border-border-light flex items-center justify-center text-gray-600 transition-transform group-open:rotate-180">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-6 pb-6 md:px-8 md:pb-7">
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Link href="/images" className="px-6 py-3 rounded-full bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors text-base font-medium shadow-md">
            Poster Generator
          </Link>
        </div>
      </section>
    </main>
  );
}