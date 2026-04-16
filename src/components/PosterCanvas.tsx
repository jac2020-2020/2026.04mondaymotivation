"use client";

import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Quote, Category, getRandomQuoteByCategory, getRandomQuote } from "@/lib/data";
import { Download, RefreshCw, Type, Image as ImageIcon, Upload, Share } from "lucide-react";

type AspectRatio = "1:1" | "9:16" | "16:9";
type FontStyle = "serif" | "sans";

const RATIO_CLASSES: Record<AspectRatio, string> = {
  "1:1": "aspect-square w-full max-w-md",
  "9:16": "aspect-[9/16] w-full max-w-[320px]",
  "16:9": "aspect-video w-full max-w-2xl",
};

interface PosterCanvasProps {
  initialQuote: Quote;
  category?: string;
}

import { JsonLd } from "@/components/JsonLd";

export default function PosterCanvas({ initialQuote, category = "motivation" }: PosterCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ratio, setRatio] = useState<AspectRatio>("1:1");
  const [bgImage, setBgImage] = useState("");
  const [currentQuote, setCurrentQuote] = useState<Quote>(initialQuote);
  const [internalCategory, setInternalCategory] = useState<Category | "all">((category as Category) || "all");
  const [fontStyle, setFontStyle] = useState<FontStyle>("serif");
  const [isGenerating, setIsGenerating] = useState(false);
  const [canShare, setCanShare] = useState(false);

  const generateRandomBg = () => {
    const seed = Math.random().toString(36).substring(7);
    setBgImage(`https://picsum.photos/seed/${seed}/1080/1080`);
  };

  // Generate a random background image on mount or when category changes
  useEffect(() => {
    generateRandomBg();
    // Check if Web Share API is available (usually mobile/safari)
    if ("share" in navigator) {
      setCanShare(true);
    }
  }, [category]);

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: bgImage,
    license: "https://creativecommons.org/publicdomain/zero/1.0/",
    acquireLicensePage: "https://mondaymotivation.org",
    creditText: "MondayMotivation.org",
    creator: {
      "@type": "Organization",
      name: "MondayMotivation.org"
    },
    copyrightNotice: "MondayMotivation.org",
    description: currentQuote.seo_alt,
    name: `Monday Motivation Quote by ${currentQuote.author}`
  };

  const handleRefreshQuote = () => {
    if (internalCategory === "all" || internalCategory === "motivation" as any) {
      setCurrentQuote(getRandomQuote());
    } else {
      setCurrentQuote(getRandomQuoteByCategory(internalCategory as Category));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value as Category | "all";
    setInternalCategory(newCat);
    if (newCat === "all") {
      setCurrentQuote(getRandomQuote());
    } else {
      setCurrentQuote(getRandomQuoteByCategory(newCat));
    }
  };

  const handleRefreshBg = () => {
    generateRandomBg();
  };

  const handleToggleFont = () => {
    setFontStyle((prev) => (prev === "serif" ? "sans" : "serif"));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBgImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const generateImageBlob = async (): Promise<Blob | null> => {
    if (!canvasRef.current) return null;
    const dataUrl = await toPng(canvasRef.current, { 
      quality: 1.0,
      pixelRatio: 2, 
      cacheBust: true,
    });
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await toPng(canvasRef.current, { 
        quality: 1.0,
        pixelRatio: 2, 
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `monday-motivation-${currentQuote.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!canShare) return;
    try {
      setIsGenerating(true);
      const blob = await generateImageBlob();
      if (!blob) throw new Error("Could not generate image blob");
      
      const file = new File([blob], `monday-motivation-${currentQuote.id}.png`, { type: 'image/png' });
      
      if ("canShare" in navigator && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Monday Motivation',
          text: `"${currentQuote.text}" - ${currentQuote.author}`,
          files: [file],
        });
      } else if ("share" in navigator) {
        // Fallback to text only if image sharing isn't supported
        await navigator.share({
          title: 'Monday Motivation',
          text: `"${currentQuote.text}" - ${currentQuote.author}\n\nGenerated via mondaymotivation.org`,
          url: window.location.href,
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {bgImage && <JsonLd data={imageSchema} />}
      {/* Tools Container */}
      <div className="flex flex-col gap-4 w-full max-w-3xl items-center">
        
        {/* Customization Toolbar */}
        <div className="flex flex-wrap gap-2 justify-center bg-white p-2 rounded-2xl shadow-sm border border-gray-200 z-20 w-full max-w-fit">
          <select 
            value={internalCategory} 
            onChange={handleCategoryChange}
            className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer py-2 px-3 hover:bg-gray-100 rounded-xl appearance-none"
            title="Select Theme"
          >
            <option value="all">All Themes</option>
            <option value="work">Work</option>
            <option value="gym">Gym</option>
            <option value="funny">Funny</option>
            <option value="success">Success</option>
          </select>

          <div className="w-px h-6 bg-gray-200 self-center mx-1 hidden sm:block"></div>

          <button 
            onClick={handleRefreshQuote}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-700"
            title="New Quote"
          >
            <RefreshCw className="w-4 h-4" /> Quote
          </button>
          
          <button 
            onClick={handleRefreshBg}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-700"
            title="New Background"
          >
            <ImageIcon className="w-4 h-4" /> Background
          </button>

          <div className="w-px h-6 bg-gray-200 self-center mx-1 hidden sm:block"></div>

          <button 
            onClick={handleToggleFont}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-700"
            title="Toggle Font"
          >
            <Type className="w-4 h-4" /> Font
          </button>

          <button 
            onClick={triggerFileInput}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-700"
            title="Upload Image"
          >
            <Upload className="w-4 h-4" /> Upload
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Ratio & Download/Share Toolbar */}
        <div className="flex flex-wrap gap-4 justify-center bg-white p-2 rounded-full shadow-md border border-gray-100 z-20">
          <div className="flex items-center gap-1 border-r pr-4 border-gray-200">
            <button 
              onClick={() => setRatio("9:16")} 
              className={`px-4 py-2 text-sm rounded-full transition-colors ${ratio === "9:16" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-600"}`}
            >
              Story
            </button>
            <button 
              onClick={() => setRatio("1:1")} 
              className={`px-4 py-2 text-sm rounded-full transition-colors ${ratio === "1:1" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-600"}`}
            >
              Feed
            </button>
            <button 
              onClick={() => setRatio("16:9")} 
              className={`px-4 py-2 text-sm rounded-full transition-colors ${ratio === "16:9" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-600"}`}
            >
              Wide
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownload} 
              disabled={isGenerating || !bgImage}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <Download className="w-4 h-4" /> 
              {isGenerating ? "Wait..." : "Download"}
            </button>

            {canShare && (
              <button 
                onClick={handleShare} 
                disabled={isGenerating || !bgImage}
                className="flex items-center justify-center w-9 h-9 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                title="Share"
              >
                <Share className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Canvas Wrapper */}
      <div 
        className="w-full flex justify-center p-4"
        aria-label={currentQuote.seo_alt}
        role="img"
      >
        {/* Visually hidden image for SEO crawlers that look for <img> tags */}
        {bgImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bgImage} alt={currentQuote.seo_alt} className="sr-only" />
        )}
        <div 
          ref={canvasRef}
          className={`relative overflow-hidden rounded-xl shadow-2xl flex flex-col items-center justify-center p-8 md:p-12 transition-all duration-500 ease-in-out ${RATIO_CLASSES[ratio]}`}
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#1a1a1a" // fallback color
          }}
        >
          {/* Overlay Filter: Grayscale + Darken */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] backdrop-grayscale-[0.5]"></div>

          {/* Quote Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center max-w-lg">
            <p className={`text-3xl md:text-4xl lg:text-5xl leading-snug md:leading-snug lg:leading-snug mb-8 ${fontStyle === "serif" ? "font-playfair" : "font-sans font-bold"}`}>
              "{currentQuote.text}"
            </p>
            <p className="text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-gray-300">
              — {currentQuote.author}
            </p>
          </div>

          {/* Watermark (visible in downloaded image) */}
          <div className="absolute bottom-6 left-0 right-0 text-center z-10 opacity-40">
            <p className="text-[10px] md:text-xs font-sans tracking-[0.2em] text-white">
              MONDAYMOTIVATION.ORG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


