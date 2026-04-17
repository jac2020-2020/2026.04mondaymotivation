import { getRandomQuote } from "@/lib/data";
import PosterCanvas from "@/components/PosterCanvas";

export const metadata = {
  title: "Poster Generator | Monday Motivation",
  description: "Create your own customized Monday motivation posters. Choose themes, upload backgrounds, and download high-quality images for free.",
  alternates: {
    canonical: "/images",
  },
};

export default function GeneratorPage() {
  const initialQuote = getRandomQuote();

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-32 px-4 max-w-7xl mx-auto">
      <header className="flex flex-col items-center mb-16 w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
          Poster <span className="italic text-brand-primary">Generator</span>
        </h1>
        <p className="text-gray-500 font-sans text-base max-w-xl leading-relaxed">
          Customize your Monday motivation. Change themes, backgrounds, fonts, or upload your own image.
        </p>
      </header>

      <div className="w-full max-w-5xl flex justify-center">
        <PosterCanvas initialQuote={initialQuote} category="all" isLandingPage={false} />
      </div>
    </main>
  );
}
