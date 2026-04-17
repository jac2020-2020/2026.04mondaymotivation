export const runtime = "nodejs";

const pickFirstHeader = (headers: Headers, keys: string[]) => {
  for (const k of keys) {
    const v = headers.get(k);
    if (v) return v;
  }
  return null;
};

const fetchImage = async (url: string) => {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new Error(`Upstream responded ${res.status}`);
  }

  const contentType =
    pickFirstHeader(res.headers, ["content-type"]) || "image/jpeg";
  const buf = await res.arrayBuffer();
  return { contentType, buf };
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const w = Number(searchParams.get("w") || "1080");
  const h = Number(searchParams.get("h") || "1080");
  const sig = (searchParams.get("sig") || "").trim();

  const width = Number.isFinite(w) && w > 0 && w <= 2000 ? w : 1080;
  const height = Number.isFinite(h) && h > 0 && h <= 2000 ? h : 1080;

  const query = q ? encodeURIComponent(q) : "minimal";
  const cacheBuster = sig ? encodeURIComponent(sig) : String(Date.now());

  const primaryUrl = `https://source.unsplash.com/random/${width}x${height}/?${query}&sig=${cacheBuster}`;
  const fallbackUrl = `https://loremflickr.com/${width}/${height}/${query}?random=${cacheBuster}`;

  try {
    const { contentType, buf } = await fetchImage(primaryUrl);
    return new Response(buf, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=0, s-maxage=3600",
      },
    });
  } catch {
    try {
      const { contentType, buf } = await fetchImage(fallbackUrl);
      return new Response(buf, {
        headers: {
          "content-type": contentType,
          "cache-control": "public, max-age=0, s-maxage=3600",
        },
      });
    } catch {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3f4f6"/><stop offset="1" stop-color="#e5e7eb"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;
      return new Response(svg, {
        headers: {
          "content-type": "image/svg+xml; charset=utf-8",
          "cache-control": "public, max-age=0, s-maxage=3600",
        },
      });
    }
  }
}

