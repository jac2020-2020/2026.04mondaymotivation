import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Category, getQuoteById, getRandomQuoteByCategory, IMAGES_SLUG_MAPPING, CATEGORY_TO_IMAGES_SLUG } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import PosterCanvas from "@/components/PosterCanvas";

const VALID_CATEGORIES: Category[] = ["work", "gym", "funny", "success", "professional"];

type Props = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const SEO_MAPPING: Record<string, { title: string; description: string; h1: string; h2: string; keywords: string[] }> = {
  work: {
    title: "Monday Motivation Images for Work",
    description: "Download Monday motivation images for work—clean office posters you can share with your team to start the week strong.",
    h1: "Monday Motivation Images for Work",
    h2: "Share Monday work motivation images with your team and start the week strong.",
    keywords: ["monday motivation images for work", "monday work motivation poster", "motivational monday images work", "monday office motivation picture"],
  },
  gym: {
    title: "Monday Fitness Motivation Images & Workout Posters",
    description: "Crush your workout with Monday fitness motivation images. Download aesthetic Monday workout motivation posters in seconds.",
    h1: "Monday Fitness Motivation Images",
    h2: "Hardcore Monday workout motivation images to crush your fitness goals.",
    keywords: ["monday motivation images", "monday fitness motivation", "monday workout motivation", "fitness motivation monday images"],
  },
  funny: {
    title: "Funny Monday Motivation Memes",
    description: "Start your week with a laugh. Funny Monday motivation memes and images you can download and share.",
    h1: "Funny Monday Motivation Memes",
    h2: "Because sometimes the best Monday motivation is a good laugh.",
    keywords: ["funny monday motivation meme", "humor monday images", "funny monday pictures", "motivational monday meme generator"],
  },
  success: {
    title: "Monday Motivation Images for Success",
    description: "Download inspirational Monday motivation images for success—clean posters to keep you focused all week.",
    h1: "Motivational Monday Posters for Success",
    h2: "Inspirational images to keep you focused on success all week.",
    keywords: ["monday motivation images for success", "monday success poster", "motivational monday pictures", "powerful monday images"],
  },
  professional: {
    title: "Professional Monday Motivation Images",
    description: "Elegant professional Monday motivation images for the workplace—perfect for Slack, email, and office screens.",
    h1: "Professional Monday Motivation Images",
    h2: "Elegant workplace-ready posters for teams and leaders.",
    keywords: ["professional monday motivation images", "monday motivation for workplace poster", "leadership monday pictures", "monday morning images"],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  const category = IMAGES_SLUG_MAPPING[slug];
  if (!category || !VALID_CATEGORIES.includes(category)) return {};

  const seo = SEO_MAPPING[category] || {
    title: `Monday Motivation Images for ${category}`,
    description: `Discover the best Monday Motivation images and posters for ${category}.`,
    keywords: [`monday motivation images ${category}`, `${category} motivation posters`, `monday ${category} pictures`],
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/images/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://mondaymotivation.org/images/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category: CATEGORY_TO_IMAGES_SLUG[category],
  }));
}

export default async function ImagesCategoryPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  const category = IMAGES_SLUG_MAPPING[slug];
  const showAds = process.env.NODE_ENV === "production";

  if (!category || !VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const quoteIdParam = resolvedSearchParams.quoteId;
  const quoteId = Array.isArray(quoteIdParam) ? quoteIdParam[0] : quoteIdParam;
  const requestedQuote = quoteId ? getQuoteById(quoteId) : null;
  const initialQuote =
    requestedQuote && requestedQuote.category.includes(category)
      ? requestedQuote
      : getRandomQuoteByCategory(category);

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
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 pb-10 px-4 max-w-7xl mx-auto selection:bg-gray-900 selection:text-white">
      <JsonLd data={softwareSchema} />

      <header className="flex flex-col items-center mb-12 w-full">
        <h1
          className="w-full text-4xl md:text-6xl font-bold mb-4 text-center capitalize text-foreground tracking-tight leading-tight"
          style={{ fontFamily: "Times New Roman, Times, serif" }}
        >
          {SEO_MAPPING[category]?.h1 || `${category} Monday Images`}
        </h1>
        <p className="text-gray-500 font-sans text-sm md:text-base max-w-3xl text-center leading-relaxed">
          {SEO_MAPPING[category]?.h2 || `Create and download the best Monday motivation posters for ${category}.`}
        </p>
      </header>

      {/* Canvas 2.0 Engine */}
      <div className="w-full max-w-5xl flex justify-center mb-16">
        <PosterCanvas initialQuote={initialQuote} category={category} />
      </div>

      {/* AdSense Bottom Placeholder */}
      {showAds && <div id="ad-bottom-slot" className="w-full max-w-3xl min-h-[90px] mb-20" aria-hidden="true"></div>}

      {/* Gallery Section (Future feature - temporarily hidden) 
      <div className="w-full max-w-5xl border-t border-gray-200 pt-16 pb-20 text-center">
         <h2 className="text-2xl font-playfair mb-4 text-gray-900">More {category} Backgrounds</h2>
         <p className="text-gray-500 text-sm">Image gallery coming soon. For now, use the generator above to create endless variations.</p>
      </div>
      */}

    </main>
  );
}
