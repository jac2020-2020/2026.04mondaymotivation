import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Category, getQuotesByCategory } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { Quote as QuoteIcon } from "lucide-react";

const VALID_CATEGORIES: Category[] = ["work", "gym", "funny", "success", "professional"];

type Props = {
  params: Promise<{ category: string }>;
};

const SEO_MAPPING: Record<string, { title: string; description: string }> = {
  work: {
    title: "Monday Motivation Quotes for Work & Employees",
    description: "50+ professional quotes to boost office productivity. Copy and share the best Monday motivation quotes.",
  },
  gym: {
    title: "Monday Motivation Quotes for Gym & Fitness",
    description: "Hardcore workout quotes to crush your goals. Copy and share the best gym motivation.",
  },
  funny: {
    title: "Funny Monday Motivation Quotes & Sayings",
    description: "Start your week with a laugh. Short, witty Monday quotes for a better day.",
  },
  success: {
    title: "Monday Motivation Quotes for Success",
    description: "Inspirational quotes to drive your success this week.",
  },
  professional: {
    title: "Professional Monday Motivation Quotes",
    description: "Elegant and professional quotes for your workplace motivation.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = resolvedParams.category as Category;
  if (!VALID_CATEGORIES.includes(category)) return {};

  const seo = SEO_MAPPING[category] || {
    title: `Monday Motivation Quotes for ${category}`,
    description: `Discover the best Monday Motivation quotes for ${category}.`,
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: [`monday motivation quotes ${category}`, `${category} motivation quotes text`, `best monday ${category} quotes`],
    alternates: {
      canonical: `/quotes/${category}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://mondaymotivation.org/quotes/${category}`,
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
    category,
  }));
}

export default async function QuotesCategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = resolvedParams.category as Category;

  if (!VALID_CATEGORIES.includes(category)) {
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
        <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 text-center capitalize text-gray-900 tracking-tight leading-tight">
          Best {category} Quotes
        </h1>
        <p className="text-gray-500 font-sans text-sm md:text-base max-w-lg text-center leading-relaxed">
          {SEO_MAPPING[category]?.description || `Copy and share these top Monday motivation quotes for ${category}.`}
        </p>
      </header>

      {/* AdSense Top Placeholder */}
      <div id="ad-top-slot" className="w-full min-h-[90px] mb-10" aria-hidden="true"></div>

      <div className="w-full space-y-6">
        {allQuotes.map((q) => (
          <div key={q.id} className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <QuoteIcon className="absolute top-6 left-6 w-8 h-8 text-gray-100 -z-10" />
            <p className="text-xl md:text-2xl font-playfair text-gray-900 mb-4 leading-relaxed z-10 relative">
              "{q.text}"
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              — {q.author}
            </p>
            <Link 
              href={`/images/${category}`} 
              className="absolute bottom-6 right-6 md:opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider"
            >
              Make Poster
            </Link>
          </div>
        ))}
      </div>

      {/* AdSense Bottom Placeholder */}
      <div id="ad-bottom-slot" className="w-full min-h-[90px] mt-16" aria-hidden="true"></div>

    </main>
  );
}
