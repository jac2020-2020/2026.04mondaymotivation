"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Quote, Category, getRandomQuoteByCategory, getRandomQuote } from "@/lib/data";
import { Download, RefreshCw, Type, Image as ImageIcon, Upload, Share } from "lucide-react";

type AspectRatio = "1:1" | "9:16" | "16:9";
type FontStyle = "serif" | "sans" | "handwriting" | "display" | "mono";
type BgType = "photo" | "texture" | "solid";
type PhotoStyle = "cinematic" | "light";
type TextureStyle = "material" | "minimal";

interface SolidColor {
  bg: string;
  isDarkText: boolean;
}

// Function to determine if a hex color needs dark or light text
const getContrastYIQ = (hexcolor: string) => {
  const hex = hexcolor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128; // returns true if text should be dark
};

const PRESET_COLORS: SolidColor[] = [
  { bg: "#FDF5E6", isDarkText: true },  // Warm White
  { bg: "#FDE68A", isDarkText: true },  // Yellow
  { bg: "#A7F3D0", isDarkText: true },  // Mint
  { bg: "#1E293B", isDarkText: false }, // Dark Slate
  { bg: "#7F1D1D", isDarkText: false }, // Deep Red
];

const RATIO_CLASSES: Record<AspectRatio, string> = {
  "1:1": "aspect-square w-full max-w-md",
  "9:16": "aspect-[9/16] w-full max-w-[320px]",
  "16:9": "aspect-video w-full max-w-2xl",
};

// Map categories to relevant image search keywords
const CATEGORY_KEYWORDS: Record<string, string> = {
  "work": "office,business,laptop,coffee,desk",
  "gym": "fitness,workout,gym,training,sports",
  "funny": "smile,happy,funny,comedy,pets",
  "success": "mountain,peak,achievement,victory,sunrise",
  "all": "nature,landscape,abstract,architecture,minimal",
  "motivation": "nature,landscape,abstract,architecture,minimal"
};

const TEXTURE_KEYWORDS: Record<TextureStyle, string> = {
  material: "wood texture,marble texture,concrete texture,linen texture,leather texture,stone texture,paper texture",
  minimal: "paper texture,minimal texture,subtle texture,grain texture,noise texture,matte texture,neutral texture"
};

interface PosterCanvasProps {
  initialQuote: Quote;
  category?: string;
  isLandingPage?: boolean;
}

import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PosterCanvas({ initialQuote, category = "motivation", isLandingPage = false }: PosterCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ratio, setRatio] = useState<AspectRatio>("1:1");
  const [bgImage, setBgImage] = useState("");
  const [bgType, setBgType] = useState<BgType>("photo");
  const [photoStyle, setPhotoStyle] = useState<PhotoStyle>("cinematic");
  const [textureStyle, setTextureStyle] = useState<TextureStyle>("material");
  const [solidColor, setSolidColor] = useState<SolidColor>(PRESET_COLORS[0]);
  const [currentQuote, setCurrentQuote] = useState<Quote>(initialQuote);
  const [internalCategory, setInternalCategory] = useState<Category | "all">((category as Category) || "all");
  const [fontStyle, setFontStyle] = useState<FontStyle>("serif");
  const [isGenerating, setIsGenerating] = useState(false);
  const [canShare, setCanShare] = useState(false);

  const generatePhotoBg = useCallback((currentCat: string) => {
    const baseKeywords = CATEGORY_KEYWORDS[currentCat] || CATEGORY_KEYWORDS["all"];
    const keywordArray = baseKeywords.split(",");
    const randomKeyword = keywordArray[Math.floor(Math.random() * keywordArray.length)];
    const cacheBuster = new Date().getTime();
    setBgImage(`/api/bg?q=${encodeURIComponent(randomKeyword)}&w=1080&h=1080&sig=${cacheBuster}`);
  }, []);

  const generateTextureBg = useCallback((style: TextureStyle) => {
    const baseKeywords = TEXTURE_KEYWORDS[style];
    const keywordArray = baseKeywords.split(",");
    const randomKeyword = keywordArray[Math.floor(Math.random() * keywordArray.length)];
    const cacheBuster = new Date().getTime();
    setBgImage(`/api/bg?q=${encodeURIComponent(randomKeyword)}&w=1080&h=1080&sig=${cacheBuster}`);
  }, []);

  const refreshBackground = useCallback(() => {
    if (bgType === "solid") return;
    if (bgType === "photo") {
      generatePhotoBg(internalCategory);
      return;
    }
    generateTextureBg(textureStyle);
  }, [bgType, generatePhotoBg, generateTextureBg, internalCategory, textureStyle]);

  // Calculate dynamic text size based on length and ratio
  const getDynamicTextClass = (text: string, currentRatio: AspectRatio) => {
    const len = text.length;
    if (currentRatio === "9:16") { // Story (narrow, easily overflows)
      if (len < 40) return "text-2xl md:text-3xl";
      if (len < 80) return "text-xl md:text-2xl";
      if (len < 130) return "text-lg md:text-xl";
      return "text-base md:text-lg";
    }
    if (currentRatio === "16:9") { // Wide
      if (len < 50) return "text-3xl md:text-4xl";
      if (len < 100) return "text-2xl md:text-3xl";
      if (len < 150) return "text-xl md:text-2xl";
      return "text-lg md:text-xl";
    }
    // 1:1 Feed
    if (len < 50) return "text-2xl md:text-3xl lg:text-4xl";
    if (len < 100) return "text-xl md:text-2xl lg:text-3xl";
    if (len < 150) return "text-lg md:text-xl lg:text-2xl";
    return "text-base md:text-lg lg:text-xl";
  };

  const getFontFamilyClass = (style: FontStyle) => {
    switch (style) {
      case "serif": return "font-playfair";
      case "sans": return "font-sans font-bold";
      case "handwriting": return "font-dancing font-medium";
      case "display": return "font-oswald uppercase tracking-wide font-medium";
      case "mono": return "font-mono";
      default: return "font-playfair";
    }
  };

  const getFontScale = (style: FontStyle) => {
    switch (style) {
      case "handwriting": return "1.3em";
      case "mono": return "0.85em";
      case "display": return "0.95em";
      default: return "1em";
    }
  };

  useEffect(() => {
    if ("share" in navigator) {
      setCanShare(true);
    }
  }, []);

  useEffect(() => {
    if (bgType !== "photo") return;
    generatePhotoBg(internalCategory);
  }, [bgType, generatePhotoBg, internalCategory]);

  useEffect(() => {
    if (bgType !== "texture") return;
    generateTextureBg(textureStyle);
  }, [bgType, generateTextureBg, textureStyle]);

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
    if (internalCategory === "all") {
      setCurrentQuote(getRandomQuote());
    } else {
      setCurrentQuote(getRandomQuoteByCategory(internalCategory));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value as Category | "all";
    setInternalCategory(newCat);
    if (bgType === "photo") {
      generatePhotoBg(newCat);
    }
    
    if (newCat === "all") {
      setCurrentQuote(getRandomQuote());
    } else {
      setCurrentQuote(getRandomQuoteByCategory(newCat));
    }
  };

  const handleRefreshBg = () => {
    refreshBackground();
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

  const isDarkText =
    bgType === "solid"
      ? solidColor.isDarkText
      : bgType === "photo"
        ? photoStyle === "light"
        : true;
  const isCanvasReady = bgType === "solid" || Boolean(bgImage);
  const textColorClass = isDarkText ? "text-gray-900" : "text-white";
  const authorColorClass = isDarkText ? "text-gray-600" : "text-gray-300";
  const watermarkColorClass = isDarkText ? "text-gray-400" : "text-white/40";

  return (
    <div className={`w-full ${isLandingPage ? 'flex flex-col items-center' : 'flex flex-col lg:flex-row items-start'} gap-8 relative`}>
      {/* Immersive Blurred Background (Only on Landing Page) */}
      {isLandingPage && bgImage && (
        <div className="absolute left-1/2 -translate-x-1/2 w-[100vw] top-[-600px] bottom-[-600px] -z-10 pointer-events-none flex justify-center">
          <div 
            className="absolute inset-0 max-w-[2000px] mx-auto bg-cover bg-center opacity-30 blur-2xl transition-all duration-1000"
            style={{ 
              backgroundImage: `url(${bgImage})`,
              maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
            }}
          ></div>
        </div>
      )}

      {bgImage && <JsonLd data={imageSchema} />}

      {/* Editor Layout: Left Panel on Desktop, Bottom Panel on Mobile */}
      {!isLandingPage && (
        <div className="w-full lg:w-[350px] shrink-0 order-2 lg:order-1 flex flex-col gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 z-10 relative">
          
          {/* Theme */}
          {category === 'all' && (
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Theme</label>
              <select 
                value={internalCategory} 
                onChange={handleCategoryChange}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black cursor-pointer appearance-none"
                title="Select Theme"
              >
                <option value="all">All Themes</option>
                <option value="work">Work</option>
                <option value="gym">Gym</option>
                <option value="funny">Funny</option>
                <option value="success">Success</option>
              </select>
            </div>
          )}

          {/* Size/Ratio */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Canvas Size</label>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setRatio("9:16")} 
                className={`flex-1 py-2 flex flex-col items-center justify-center rounded-lg transition-all ${ratio === "9:16" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
              >
                <span className="text-sm font-medium">Story</span>
                <span className="text-[10px] opacity-60">9:16</span>
              </button>
              <button 
                onClick={() => setRatio("1:1")} 
                className={`flex-1 py-2 flex flex-col items-center justify-center rounded-lg transition-all ${ratio === "1:1" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
              >
                <span className="text-sm font-medium">Feed</span>
                <span className="text-[10px] opacity-60">1:1</span>
              </button>
              <button 
                onClick={() => setRatio("16:9")} 
                className={`flex-1 py-2 flex flex-col items-center justify-center rounded-lg transition-all ${ratio === "16:9" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
              >
                <span className="text-sm font-medium">Wide</span>
                <span className="text-[10px] opacity-60">16:9</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Content</label>
            <div className="relative">
              <textarea 
                value={currentQuote.text}
                onChange={(e) => setCurrentQuote({ ...currentQuote, text: e.target.value })}
                placeholder="Enter quote..."
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium rounded-xl px-4 py-3 pr-12 pb-8 outline-none focus:ring-2 focus:ring-black transition-shadow resize-none"
              />
              <button 
                onClick={handleRefreshQuote}
                className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                title="Random Quote"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 right-4 pointer-events-none">
                <span className={`text-[10px] font-medium ${currentQuote.text.length > 200 ? 'text-red-500' : 'text-gray-400'}`}>
                  {currentQuote.text.length} / 200 字符
                </span>
              </div>
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Background</label>
            
            <div className="flex bg-gray-100 p-1 rounded-xl mb-3">
              <button 
                onClick={() => {
                  setBgType("photo");
                  generatePhotoBg(internalCategory);
                }} 
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${bgType === "photo" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
              >Photo</button>
              <button 
                onClick={() => {
                  setBgType("texture");
                  setTextureStyle("material");
                  generateTextureBg("material");
                }} 
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${bgType === "texture" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
              >Texture</button>
              <button 
                onClick={() => setBgType("solid")} 
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${bgType === "solid" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
              >Solid</button>
            </div>

            {bgType === "photo" && (
              <div className="flex bg-gray-100 p-1 rounded-xl mb-3">
                <button
                  onClick={() => setPhotoStyle("cinematic")}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${photoStyle === "cinematic" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
                >
                  Cinematic
                </button>
                <button
                  onClick={() => setPhotoStyle("light")}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${photoStyle === "light" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
                >
                  Light
                </button>
              </div>
            )}

            {bgType === "texture" && (
              <div className="flex bg-gray-100 p-1 rounded-xl mb-3">
                <button
                  onClick={() => {
                    setTextureStyle("material");
                    generateTextureBg("material");
                  }}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${textureStyle === "material" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
                >
                  Material
                </button>
                <button
                  onClick={() => {
                    setTextureStyle("minimal");
                    generateTextureBg("minimal");
                  }}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${textureStyle === "minimal" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-900"}`}
                >
                  Minimal
                </button>
              </div>
            )}

            {bgType === "solid" ? (
              <div className="flex flex-wrap gap-3 items-center mt-4">
                {PRESET_COLORS.map((c, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSolidColor(c)} 
                    className={`w-8 h-8 rounded-full border-2 transition-all ${solidColor.bg === c.bg ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent shadow-sm hover:scale-105'}`} 
                    style={{ backgroundColor: c.bg }} 
                    title="Preset Color"
                  />
                ))}
                {/* Custom Color Picker */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm hover:scale-105 transition-all cursor-pointer border-2 border-dashed border-gray-300 bg-gradient-to-tr from-red-200 via-green-200 to-blue-200 flex items-center justify-center">
                  <input 
                    type="color" 
                    value={solidColor.bg}
                    onChange={(e) => setSolidColor({ 
                      bg: e.target.value, 
                      isDarkText: getContrastYIQ(e.target.value) 
                    })}
                    className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 opacity-0 cursor-pointer"
                    title="Custom Color"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={handleRefreshBg}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-sm font-medium text-gray-700"
                  title="New Background"
                >
                  <ImageIcon className="w-4 h-4" /> Random
                </button>
                <button 
                  onClick={triggerFileInput}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-sm font-medium text-gray-700"
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
            )}
          </div>

          {/* Typography */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Typography</label>
            <div className="relative">
              <select 
                value={fontStyle} 
                onChange={(e) => setFontStyle(e.target.value as FontStyle)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black cursor-pointer appearance-none"
              >
                <option value="serif">Serif (Classic)</option>
                <option value="sans">Sans-serif (Modern)</option>
                <option value="handwriting">Handwriting (Artistic)</option>
                <option value="display">Display (Bold)</option>
                <option value="mono">Monospace (Tech)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <Type className="w-4 h-4" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* Action */}
          <div className="flex gap-3 mt-auto lg:mt-4 sticky bottom-4 lg:static z-40">
            <button 
              onClick={handleDownload} 
              disabled={isGenerating || !isCanvasReady}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-bold shadow-lg shadow-black/20 disabled:opacity-50"
            >
              <Download className="w-5 h-5" /> 
              {isGenerating ? "Processing..." : "Download Poster"}
            </button>

            {canShare && (
              <button 
                onClick={handleShare} 
                disabled={isGenerating || !isCanvasReady}
                className="flex items-center justify-center px-4 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                title="Share"
              >
                <Share className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>
      )}

      {/* Canvas Section */}
      <div className={`w-full flex flex-col items-center ${isLandingPage ? '' : 'lg:flex-1 order-1 lg:order-2 sticky top-[80px] lg:top-[120px] z-20'}`}>
        
        {/* Landing Page ONLY: Minimal Toolbar */}
        {isLandingPage && (
          <div className="flex flex-col gap-4 w-full max-w-3xl items-center mb-8">
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
                  disabled={isGenerating || !isCanvasReady}
                  className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <Download className="w-4 h-4" /> 
                  {isGenerating ? "Wait..." : "Download"}
                </button>

                {canShare && (
                  <button 
                    onClick={handleShare} 
                    disabled={isGenerating || !isCanvasReady}
                    className="flex items-center justify-center w-9 h-9 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                    title="Share"
                  >
                    <Share className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className={`w-full flex justify-center ${isLandingPage ? 'p-4' : 'bg-gray-50/50 lg:bg-transparent rounded-3xl p-4 md:p-8 min-h-[50vh] lg:min-h-0'}`}>
          <div 
            className="w-full flex justify-center"
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
                backgroundImage: bgType !== "solid" && bgImage ? `url(${bgImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: bgType === "solid" ? solidColor.bg : "#1a1a1a" // fallback or solid color
              }}
            >
              {/* Overlay Filter */}
              {bgType === "photo" && photoStyle === "cinematic" && <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] backdrop-grayscale-[0.5]"></div>}
              {bgType === "photo" && photoStyle === "light" && <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>}
              {bgType === "texture" && textureStyle === "material" && <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]"></div>}
              {bgType === "texture" && textureStyle === "minimal" && <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px]"></div>}
              
              {/* Solid Mode Inner Border (Decorative touch) */}
              {bgType === "solid" && <div className={`absolute inset-4 md:inset-6 border-2 ${isDarkText ? 'border-gray-900/10' : 'border-white/20'} pointer-events-none`}></div>}

              {/* Quote Content */}
              <div className={`relative z-10 flex flex-col items-center justify-center h-full text-center max-w-2xl px-6 md:px-12 ${getDynamicTextClass(currentQuote.text, ratio)} ${textColorClass}`}>
                <p 
                  className={`leading-relaxed md:leading-relaxed lg:leading-relaxed mb-8 transition-all duration-300 ${getFontFamilyClass(fontStyle)}`}
                  style={{ fontSize: getFontScale(fontStyle) }}
                >
                  &ldquo;{currentQuote.text}&rdquo;
                </p>
                {currentQuote.author?.trim() && currentQuote.author.trim().toLowerCase() !== "unknown" && (
                  <p
                    className={`text-[0.4em] font-sans uppercase tracking-[0.3em] ${authorColorClass}`}
                    style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "10px" }}
                  >
                    — {currentQuote.author}
                  </p>
                )}
              </div>

              {/* Watermark (visible in downloaded image) */}
              <div className={`absolute bottom-6 left-0 right-0 text-center z-10 ${watermarkColorClass}`}>
                <p className="text-[10px] md:text-xs font-sans tracking-[0.2em] font-medium">
                  MONDAYMOTIVATION.ORG
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Landing Page ONLY: Upsell to Advanced Editor (Placed BELOW the image) */}
        {isLandingPage && (
          <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 w-full flex justify-center">
            <Link 
              href="/images" 
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-full hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              <span className="relative z-10 text-sm md:text-base font-bold uppercase tracking-widest flex items-center gap-2">
                ✨ Advanced Editor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
