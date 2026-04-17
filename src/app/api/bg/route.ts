export const runtime = "nodejs";

const pickFirstHeader = (headers: Headers, keys: string[]) => {
  for (const k of keys) {
    const v = headers.get(k);
    if (v) return v;
  }
  return null;
};

const isImageContentType = (contentType: string) =>
  contentType.startsWith("image/") || contentType.startsWith("application/octet-stream");

const fnv1a = (input: string) => {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const fetchImage = async (url: string, timeoutMs: number) => {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  const res = await fetch(url, {
    redirect: "follow",
    signal: controller.signal,
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  }).finally(() => clearTimeout(t));

  if (!res.ok) {
    throw new Error(`Upstream responded ${res.status}`);
  }

  const contentType = pickFirstHeader(res.headers, ["content-type"]) || "";
  if (!contentType || !isImageContentType(contentType)) {
    throw new Error("Upstream is not an image");
  }
  const buf = await res.arrayBuffer();
  return { contentType, buf };
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const w = Number(searchParams.get("w") || "1080");
  const h = Number(searchParams.get("h") || "1080");
  const sig = (searchParams.get("sig") || "").trim();
  const type = (searchParams.get("type") || "").trim().toLowerCase();
  const style = (searchParams.get("style") || "").trim().toLowerCase();

  const width = Number.isFinite(w) && w > 0 && w <= 2000 ? w : 1080;
  const height = Number.isFinite(h) && h > 0 && h <= 2000 ? h : 1080;

  const query = q ? encodeURIComponent(q) : "minimal";
  const cacheBuster = sig ? encodeURIComponent(sig) : String(Date.now());

  if (type === "texture" && style === "material") {
    const seed = fnv1a(`${q}|${sig}`) % 10000;
    const variant = seed % 4;
    const svg =
      variant === 0
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><filter id="paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="5" result="noise" seed="${seed}"/><feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="10" result="light"><feDistantLight azimuth="45" elevation="30" /></feDiffuseLighting><feBlend mode="multiply" in="SourceGraphic" in2="light" /></filter></defs><rect width="100%" height="100%" fill="#f4f1ea" filter="url(#paper)" /></svg>`
        : variant === 1
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><filter id="canvas" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" result="noise" seed="${seed}"/><feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="8" result="light"><feDistantLight azimuth="60" elevation="25" /></feDiffuseLighting><feBlend mode="multiply" in="SourceGraphic" in2="light" /></filter></defs><rect width="100%" height="100%" fill="#e8e1d5" filter="url(#canvas)" /></svg>`
          : variant === 2
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><filter id="wood" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.002 0.3" numOctaves="4" result="noise" seed="${seed}"/><feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="15" result="light"><feDistantLight azimuth="90" elevation="20" /></feDiffuseLighting><feBlend mode="multiply" in="SourceGraphic" in2="light" /></filter><linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#cda681" /><stop offset="100%" stop-color="#8a633f" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#woodGrad)" filter="url(#wood)" /></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><filter id="stone" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="5" result="noise1" seed="${seed}"/><feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise2" seed="${seed + 1}"/><feBlend mode="screen" in="noise1" in2="noise2" result="noise"/><feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="12" result="light"><feDistantLight azimuth="45" elevation="25" /></feDiffuseLighting><feBlend mode="multiply" in="SourceGraphic" in2="light" /></filter><linearGradient id="stoneGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#b6b8ba" /><stop offset="100%" stop-color="#7d8084" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#stoneGrad)" filter="url(#stone)" /></svg>`;

    return new Response(svg, {
      headers: {
        "content-type": "image/svg+xml; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=3600",
      },
    });
  }

  // 特殊处理 funny 相关的图片请求
  const decodedQuery = decodeURIComponent(query).toLowerCase();
  
  let isFunny = false;
  let funnyWord = "funny";

  if (decodedQuery.includes('funny') || decodedQuery.includes('meme') || decodedQuery.includes('awkward') || decodedQuery.includes('cat') || decodedQuery.includes('dog') || decodedQuery.includes('clown') || decodedQuery.includes('monkey')) {
     isFunny = true;
     funnyWord = decodedQuery.split(',')[0].split(' ')[0] || 'funny cat';
  }

  const picsumSeed = fnv1a(`${q}|${sig}`).toString(16);

  // 1. Picsum Photos (最快最稳定，作为首选)
  const primaryUrl = isFunny 
    ? `https://cataas.com/cat?width=${width}&height=${height}&type=sq`
    : `https://picsum.photos/seed/${picsumSeed}/${width}/${height}?blur=2`; // 加上 blur 让背景更适合放文字
    
  // 2. Pollinations AI (备用)
  const secondaryUrl = isFunny
    ? `https://image.pollinations.ai/prompt/${encodeURIComponent(funnyWord)}?width=${width}&height=${height}&nologo=true&seed=${cacheBuster}`
    : `https://image.pollinations.ai/prompt/${query}?width=${width}&height=${height}&nologo=true&seed=${cacheBuster}`;

  // 3. 最终回退
  const fallbackUrl = isFunny
    ? `https://place.dog/${width}/${height}`
    : `https://picsum.photos/${width}/${height}?grayscale&blur=2`;

  console.log(`[BG Route] Request: q="${q}", isFunny=${isFunny}`);
  console.log(`[BG Route] Primary (Picsum/Cataas): ${primaryUrl}`);

  try {
    const { contentType, buf } = await fetchImage(primaryUrl, 4000); // 4秒超时
    console.log(`[BG Route] Primary Success`);
    return new Response(buf, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=0, s-maxage=3600",
      },
    });
  } catch (err1) {
    console.error(`[BG Route] Primary Failed: ${err1}`);
    console.log(`[BG Route] Secondary (Pollinations): ${secondaryUrl}`);
    try {
      const { contentType, buf } = await fetchImage(secondaryUrl, 6000); // AI生成可能较慢，给6秒
      console.log(`[BG Route] Secondary Success`);
      return new Response(buf, {
        headers: {
          "content-type": contentType,
          "cache-control": "public, max-age=0, s-maxage=3600",
        },
      });
    } catch (err2) {
      console.error(`[BG Route] Secondary Failed: ${err2}`);
      console.log(`[BG Route] Fallback: ${fallbackUrl}`);
      try {
      const { contentType, buf } = await fetchImage(fallbackUrl, 3000);
      console.log(`[BG Route] Fallback Success`);
      return new Response(buf, {
        headers: {
          "content-type": contentType,
          "cache-control": "public, max-age=0, s-maxage=3600",
        },
      });
      } catch (err3) {
        console.error(`[BG Route] Fallback Failed: ${err3}`);
        // 如果全失败了，返回一个好看的深色渐变背景，而不是丑陋的浅色 SVG
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f2937"/><stop offset="1" stop-color="#111827"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;
        return new Response(svg, {
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            "cache-control": "public, max-age=0, s-maxage=3600",
          },
        });
      }
    }
  }
}
