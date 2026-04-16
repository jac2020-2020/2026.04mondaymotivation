export type Category = "work" | "gym" | "funny" | "success" | "professional";

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: Category[];
  seo_alt: string;
}

export const quotes: Quote[] = [
  // Work / Professional
  {
    id: "work-1",
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: ["work", "professional", "success"],
    seo_alt: "Monday Motivation quote about getting started by Mark Twain"
  },
  {
    id: "work-2",
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
    category: ["work", "success"],
    seo_alt: "Monday Motivation quote making days count"
  },
  // Gym / Fitness
  {
    id: "gym-1",
    text: "The hard part isn't getting your body in shape. The hard part is getting your mind in shape.",
    author: "Unknown",
    category: ["gym"],
    seo_alt: "Gym and fitness Monday motivation quote about mindset"
  },
  {
    id: "gym-2",
    text: "Push harder than yesterday if you want a different tomorrow.",
    author: "Unknown",
    category: ["gym"],
    seo_alt: "Workout motivation quote about pushing harder"
  },
  // Funny
  {
    id: "funny-1",
    text: "Monday is a state of mind. Put on your positive pants and get stuff done.",
    author: "Unknown",
    category: ["funny"],
    seo_alt: "Funny Monday motivation quote about positive pants"
  },
  {
    id: "funny-2",
    text: "May your coffee be strong and your Mondays be short.",
    author: "Unknown",
    category: ["funny"],
    seo_alt: "Funny Monday motivation quote about strong coffee"
  }
];

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export function getRandomQuoteByCategory(category: Category): Quote {
  const filtered = quotes.filter((q) => q.category.includes(category));
  if (filtered.length === 0) return getRandomQuote();
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

export function getQuotesByCategory(category: Category): Quote[] {
  return quotes.filter((q) => q.category.includes(category));
}
