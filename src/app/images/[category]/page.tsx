import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Category, getRandomQuoteByCategory } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import PosterCanvas from "@/components/PosterCanvas";

const VALID_CATEGORIES: Category[] = ["work", "gym", "funny", "success", "professional"];

type Props = {
  params: Promise<{ category: string }>;
};

const SEO_MAPPING: Record<string, { title: string; description: string }> = {
  work: {
    title: "Monday Motivation Images & Posters for Work",
    description: "Download beautiful, high-quality Monday Motivation posters and images for work and office productivity.",
  },
  gym: {
    title: "Monday Motivation Images for Gym & Fitness",
    description: "Hardcore workout aesthetic posters and Monday Motivation images to crush your fitness goals.",
  },
  funny: {
    title: "Funny Monday Motivation Memes & Images",
    description: "Start your week with a laugh. Short, witty Monday images and funny motivational posters.",
  },
  success: {
    title: "Monday Motivation Posters for Success",
    description: "Inspirational images and posters to drive your success this week.",
  },
  professional: {
    title: "Professional Monday Motivation Images",
    description: "Elegant and professional poster backgrounds for your workplace motivation.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = resolvedParams.category as Category;
  if (!VALID_CATEGORIES.includes(category)) return {};

  const seo = SEO_MAPPING[category] || {
    title: `Monday Motivation Images for ${category}`,
    description: `Discover the best Monday Motivation images and posters for ${category}.`,
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: [`monday motivation images ${category}`, `${category} motivation posters`, `monday ${category} pictures`],
    alternates: {
      canonical: `/images/${category}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://mondaymotivation.org/images/${category}`,
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
    category,
  }));
}

export default async function ImagesCategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = resolvedParams.category as Category;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const initialQuote = getRandomQuoteByCategory(category);

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
        <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 text-center capitalize text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "Times New Roman, Times, serif" }}>
          {category} Images & Posters
        </h1>
        <p className="text-gray-500 font-sans text-sm md:text-base max-w-lg text-center leading-relaxed">
          {SEO_MAPPING[category]?.description || `Discover the best images for ${category}.`}
        </p>
      </header>

      {/* Canvas 2.0 Engine */}
      <div className="w-full max-w-5xl flex justify-center mb-16">
        <PosterCanvas initialQuote={initialQuote} category={category} />
      </div>

      {/* AdSense Bottom Placeholder */}
      <div id="ad-bottom-slot" className="w-full max-w-3xl min-h-[90px] mb-20" aria-hidden="true"></div>

      {/* Gallery Section (Future feature) */}
      <div className="w-full max-w-5xl border-t border-gray-200 pt-16 pb-20 text-center">
         <h2 className="text-2xl font-playfair mb-4 text-gray-900">More {category} Backgrounds</h2>
         <p className="text-gray-500 text-sm">Image gallery coming soon. For now, use the generator above to create endless variations.</p>
      </div>

    </main>
  );
}
