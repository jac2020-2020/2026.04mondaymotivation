import { MetadataRoute } from 'next';
import { CATEGORY_TO_IMAGES_SLUG, CATEGORY_TO_QUOTES_SLUG } from '@/lib/data';

const SITE_URL = 'https://mondaymotivation.org';

// Define the core categories from your existing code structure
const VALID_CATEGORIES = ["work", "gym", "funny", "success", "professional"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // 2. Dynamic Image Category Pages (/images/[category])
  const imageCategoryRoutes: MetadataRoute.Sitemap = VALID_CATEGORIES.map((category) => ({
    url: `${SITE_URL}/images/${CATEGORY_TO_IMAGES_SLUG[category]}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Dynamic Quote Category Pages (/quotes/[category])
  const quoteCategoryRoutes: MetadataRoute.Sitemap = VALID_CATEGORIES.map((category) => ({
    url: `${SITE_URL}/quotes/${CATEGORY_TO_QUOTES_SLUG[category]}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Combine all routes
  return [...staticRoutes, ...imageCategoryRoutes, ...quoteCategoryRoutes];
}