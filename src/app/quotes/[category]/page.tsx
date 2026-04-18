import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Category, getQuotesByCategory, QUOTES_SLUG_MAPPING, CATEGORY_TO_QUOTES_SLUG, CATEGORY_TO_IMAGES_SLUG } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { Quote as QuoteIcon } from "lucide-react";

const VALID_CATEGORIES: Category[] = ["work", "gym", "funny", "success", "professional"];

type Props = {
  params: Promise<{ category: string }>;
};

const SEO_MAPPING: Record<string, { title: string; description: string; h1: string; h2: string; keywords: string[] }> = {
  work: {
    title: "Best Monday Motivational Quotes for Work & Office",
    description: "Boost productivity with the best Monday motivational quotes for work—short, meaningful lines you can copy and share.",
    h1: "Monday Motivational Quotes for Work",
    h2: "Handpicked Monday work motivation quotes to start your week right.",
    keywords: ["monday motivational quotes for work", "monday motivation quotes for work", "monday work motivation", "motivational monday quotes for work"],
  },
  gym: {
    title: "Powerful Monday Motivation Quotes for Gym & Fitness",
    description: "Crush your fitness goals with powerful Monday motivation quotes—perfect for your gym routine, workout captions, and posters.",
    h1: "Monday Motivation Quotes for Gym & Fitness",
    h2: "Hardcore workout quotes to crush your Monday fitness goals.",
    keywords: ["monday motivation gym", "monday gym quotes", "workout monday motivation", "fitness monday quotes"],
  },
  funny: {
    title: "Funny Monday Motivation Memes & Humor Quotes",
    description: "Start your week with a laugh—humor Monday motivation quotes and meme-worthy lines you can share in seconds.",
    h1: "Humor Monday Motivation Quotes & Memes",
    h2: "Because sometimes the best Monday motivation is a good laugh.",
    keywords: ["monday motivation meme", "humor monday motivation quotes", "funny monday quotes", "motivational monday meme"],
  },
  success: {
    title: "Inspirational & Motivational Monday Quotes for Success",
    description: "Reach your goals with motivational Monday quotes for success—build momentum, stay focused, and keep moving forward.",
    h1: "Motivational Monday Quotes for Success",
    h2: "Inspirational quotes to build momentum toward success all week.",
    keywords: ["monday motivation quotes for success", "monday success quotes", "motivational monday quotes", "powerful monday motivation quotes"],
  },
  professional: {
    title: "Professional Monday Motivation Quotes for the Workplace",
    description: "Professional Monday motivation quotes for the workplace—ideal for teams, managers, and leadership messages.",
    h1: "Professional Monday Motivation Quotes",
    h2: "Workplace-ready quotes for teams and leaders.",
    keywords: ["professional monday motivation", "monday motivation for workplace", "leadership monday quotes", "monday morning motivation"],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  const category = QUOTES_SLUG_MAPPING[slug];
  if (!category || !VALID_CATEGORIES.includes(category)) return {};

  const seo = SEO_MAPPING[category] || {
    title: `Monday Motivation Quotes for ${category}`,
    description: `Discover the best Monday Motivation quotes for ${category}.`,
    keywords: [`monday motivation quotes ${category}`, `${category} motivation quotes text`, `best monday ${category} quotes`],
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/quotes/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://mondaymotivation.org/quotes/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
  };
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category: CATEGORY_TO_QUOTES_SLUG[category],
  }));
}

export default async function QuotesCategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  const category = QUOTES_SLUG_MAPPING[slug];
  const showAds = process.env.NODE_ENV === "production";

  if (!category || !VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const allQuotes = getQuotesByCategory(category);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuotes.map((q) => ({
      "@type": "Question",
      name: `What is a good Monday Motivation quote for ${category}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `"${q.text}" - ${q.author}`,
      },
    })),
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 pb-24 px-4 max-w-4xl mx-auto selection:bg-gray-900 selection:text-white">
      <JsonLd data={faqSchema} />

      <header className="flex flex-col items-center mb-16 w-full">
        <h1
          className="w-full text-4xl md:text-6xl font-bold mb-4 text-center capitalize text-foreground tracking-tight leading-tight"
          style={{ fontFamily: "Times New Roman, Times, serif" }}
        >
          {SEO_MAPPING[category]?.h1 || `Best ${category} Quotes`}
        </h1>
        <h2 className="text-gray-500 font-sans text-sm md:text-base max-w-3xl text-center leading-relaxed">
          {SEO_MAPPING[category]?.h2 || `Copy and share these top Monday motivation quotes for ${category}.`}
        </h2>
      </header>

      {/* AdSense Top Placeholder */}
      {showAds && <div id="ad-top-slot" className="w-full min-h-[90px] mb-10" aria-hidden="true"></div>}

      <div className="w-full space-y-6">
        {allQuotes.map((q) => (
          <div key={q.id} className="group relative bg-surface-1 p-8 rounded-2xl shadow-sm border border-border-light hover:shadow-md transition-shadow">
            <QuoteIcon className="absolute top-6 left-6 w-8 h-8 text-border-light -z-10" />
            <p className="text-xl md:text-2xl text-foreground mb-4 leading-relaxed z-10 relative" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              &ldquo;{q.text}&rdquo;
            </p>
            {q.author?.trim() && q.author.trim().toLowerCase() !== "unknown" && (
              <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                — {q.author}
              </p>
            )}
            <Link 
              href={`/images/${CATEGORY_TO_IMAGES_SLUG[category]}?quoteId=${encodeURIComponent(q.id)}`} 
              title="Make Poster"
              className="absolute bottom-6 right-6 md:opacity-0 group-hover:opacity-100 transition-opacity bg-brand-primary hover:bg-brand-primary-hover text-white px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider"
            >
              Make Poster
            </Link>
          </div>
        ))}
      </div>

      {/* AdSense Bottom Placeholder */}
      {showAds && <div id="ad-bottom-slot" className="w-full min-h-[90px] mt-16" aria-hidden="true"></div>}

    </main>
  );
}
