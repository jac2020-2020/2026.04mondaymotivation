import fetchedQuotesData from "@/data/fetched_quotes.json";

export type Category = "work" | "gym" | "funny" | "success" | "professional" | "motivation";

export const QUOTES_SLUG_MAPPING: Record<string, Category> = {
  "monday-motivational-quotes-for-work": "work",
  "powerful-monday-motivation-quotes": "gym",
  "humor-monday-motivation-quotes": "funny",
  "monday-morning-motivational-quotes": "success",
  "professional-monday-motivation-quotes": "professional",
};

export const IMAGES_SLUG_MAPPING: Record<string, Category> = {
  "monday-work-motivation-images": "work",
  "powerful-monday-motivation-images": "gym",
  "monday-motivation-meme": "funny",
  "monday-morning-motivation-images": "success",
  "professional-monday-motivation-images": "professional",
};

export const CATEGORY_TO_QUOTES_SLUG: Record<Category, string> = {
  work: "monday-motivational-quotes-for-work",
  gym: "powerful-monday-motivation-quotes",
  funny: "humor-monday-motivation-quotes",
  success: "monday-morning-motivational-quotes",
  professional: "professional-monday-motivation-quotes",
  motivation: "monday-motivation-quotes",
};

export const CATEGORY_TO_IMAGES_SLUG: Record<Category, string> = {
  work: "monday-work-motivation-images",
  gym: "powerful-monday-motivation-images",
  funny: "monday-motivation-meme",
  success: "monday-morning-motivation-images",
  professional: "professional-monday-motivation-images",
  motivation: "monday-motivation-images",
};

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: Category[];
  seo_alt: string;
}

const baseQuotes: Quote[] = [
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
  {
    id: "work-3",
    text: "Your Monday morning thoughts set the tone for your whole week. See yourself getting stronger, and living a fulfilling, happier & healthier life.",
    author: "Germany Kent",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about Monday morning thoughts by Germany Kent"
  },
  {
    id: "work-4",
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about setting goals by C.S. Lewis"
  },
  {
    id: "work-5",
    text: "Do one thing every day that scares you.",
    author: "Eleanor Roosevelt",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about courage by Eleanor Roosevelt"
  },
  {
    id: "work-6",
    text: "The most effective way to do it is to do it.",
    author: "Amelia Earhart",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about action by Amelia Earhart"
  },
  {
    id: "work-7",
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about today and the future by Mahatma Gandhi"
  },
  {
    id: "work-8",
    text: "Believe you can, and you’re halfway there.",
    author: "Theodore Roosevelt",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about believing you can by Theodore Roosevelt"
  },
  {
    id: "work-9",
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about keep going by Sam Levenson"
  },
  {
    id: "work-10",
    text: "You don’t have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about starting by Zig Ziglar"
  },
  {
    id: "work-11",
    text: "Mondays are the start of the work week, which offer new beginnings 52 times a year!",
    author: "David Dweck",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about new beginnings by David Dweck"
  },
  {
    id: "work-12",
    text: "If you don’t like the road you’re walking, start paving another one.",
    author: "Dolly Parton",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about changing direction by Dolly Parton"
  },
  {
    id: "work-13",
    text: "What you do today can improve all your tomorrows.",
    author: "Ralph Marston",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about improving tomorrows by Ralph Marston"
  },
  {
    id: "work-14",
    text: "You may encounter many defeats, but you must not be defeated.",
    author: "Maya Angelou",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about not being defeated by Maya Angelou"
  },
  {
    id: "work-15",
    text: "Passion is energy. Feel the power that comes from focusing on what excites you.",
    author: "Oprah Winfrey",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about passion and energy by Oprah Winfrey"
  },
  {
    id: "work-16",
    text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    author: "Albert Schweitzer",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about success and happiness by Albert Schweitzer"
  },
  {
    id: "work-17",
    text: "With the new day comes new strength and new thoughts.",
    author: "Eleanor Roosevelt",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about new strength by Eleanor Roosevelt"
  },
  {
    id: "work-18",
    text: "Nothing is impossible, the word itself says 'I'm possible!'",
    author: "Audrey Hepburn",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about nothing is impossible by Audrey Hepburn"
  },
  {
    id: "funny-3",
    text: "Do or do not. There is no try.",
    author: "Yoda",
    category: ["funny", "success"],
    seo_alt: "Motivation quote do or do not by Yoda"
  },
  {
    id: "work-19",
    text: "You can't use up creativity. The more you use, the more you have.",
    author: "Maya Angelou",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about creativity by Maya Angelou"
  },
  {
    id: "work-20",
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about mistakes and trying by Albert Einstein"
  },
  {
    id: "work-21",
    text: "Everything you’ve ever wanted is on the other side of fear.",
    author: "George Addair",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about fear by George Addair"
  },
  {
    id: "work-22",
    text: "What we achieve inwardly will change outer reality.",
    author: "Plutarch",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about inner achievement by Plutarch"
  },
  {
    id: "work-23",
    text: "If you can dream it, you can do it.",
    author: "Walt Disney",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about dreaming and doing by Walt Disney"
  },
  {
    id: "work-24",
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about impossible until done by Nelson Mandela"
  },
  {
    id: "work-25",
    text: "I am not a product of my circumstances; I am a product of my decisions.",
    author: "Stephen Covey",
    category: ["work", "success", "professional"],
    seo_alt: "Monday motivation quote about decisions by Stephen Covey"
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

const csvQuotesRaw: Array<[string, string, string]> = [
  ["General Motivation", "This is your Monday morning reminder that you are amazing and you can handle anything this week throws at you.", ""],
  ["General Motivation", "Don’t count the days, make the days count.", "Muhammad Ali"],
  ["General Motivation", "Mondays are for fresh starts and new goals.", ""],
  ["General Motivation", "You don’t have to be great to start, but you have to start to be great.", "Zig Ziglar"],
  ["General Motivation", "A little progress each day adds up to big results.", ""],
  ["General Motivation", "The secret of getting ahead is getting started.", "Mark Twain"],
  ["General Motivation", "Start where you are. Use what you have. Do what you can.", "Arthur Ashe"],
  ["General Motivation", "Your future is created by what you do today, not tomorrow.", "Robert Kiyosaki"],
  ["General Motivation", "Let today be the start of something new.", ""],
  ["General Motivation", "You’ve got this, even if it’s Monday.", ""],
  ["General Motivation", "Make this Monday so productive that even Tuesday gets jealous.", ""],
  ["General Motivation", "Push yourself, because no one else is going to do it for you.", ""],
  ["General Motivation", "You’re capable of more than you think. Start this week believing it.", ""],
  ["General Motivation", "Don’t watch the clock; do what it does. Keep going.", "Sam Levenson"],
  ["General Motivation", "Be stronger than your excuses.", ""],
  ["General Motivation", "It’s a new week. Time to chase dreams, not deadlines.", ""],
  ["Funny Monday Motivation Quotes", "Mondays are the potholes in the road of life.", "Tom Wilson"],
  ["Funny Monday Motivation Quotes", "If each day is a gift, I’d like to know where I can return Mondays.", "John Wagner"],
  ["Funny Monday Motivation Quotes", "Monday is an awful way to spend 1/7 of your life.", "Steven Wright"],
  ["Funny Monday Motivation Quotes", "I really need a day between Sunday and Monday.", ""],
  ["Funny Monday Motivation Quotes", "Just once, I’d like to wake up on a Monday and discover that it’s actually Saturday.", ""],
  ["Funny Monday Motivation Quotes", "There should be a holiday dedicated to all the brave people who show up to work on Mondays.", ""],
  ["Funny Monday Motivation Quotes", "Monday is like a math problem. Add the irritation, subtract the sleep, multiply the problems, divide the happiness.", ""],
  ["Funny Monday Motivation Quotes", "Candy is nature’s way of making up for Mondays.", "Rebecca Gober"],
  ["Funny Monday Motivation Quotes", "Mondays are fine. It’s your life that sucks.", "Ricky Gervais"],
  ["Funny Monday Motivation Quotes", "Why is Monday so far from Friday but Friday so close to Monday?", ""],
  ["Funny Monday Motivation Quotes", "Monday: the day all my weekend plans go to die.", ""],
  ["Funny Monday Motivation Quotes", "The worst thing about Monday is that it comes every week.", ""],
  ["Funny Monday Motivation Quotes", "On Mondays, I pretend to be normal. But my coffee knows the truth.", ""],
  ["Funny Monday Motivation Quotes", "Even the calendar says WTF after Monday and Tuesday.", ""],
  ["Funny Monday Motivation Quotes", "I’d like to file a complaint about how fast Monday showed up.", ""],
  ["Positive Quotes for Mondays", "With the new day comes new strength and new thoughts.", "Eleanor Roosevelt"],
  ["Positive Quotes for Mondays", "The sun himself is weak when he first rises, and gathers strength and courage as the day gets on.", "Charles Dickens"],
  ["Positive Quotes for Mondays", "Every Monday is a chance to start a new fabulous week.", "Ernest Agyemang Yeboah"],
  ["Positive Quotes for Mondays", "Keep your face always toward the sunshine—and shadows will fall behind you.", "Walt Whitman"],
  ["Positive Quotes for Mondays", "It’s not whether you get knocked down, it’s whether you get up.", "Vince Lombardi"],
  ["Positive Quotes for Mondays", "Believe you can and you’re halfway there.", "Theodore Roosevelt"],
  ["Positive Quotes for Mondays", "A positive attitude causes a chain reaction of positive thoughts, events, and outcomes.", "Wade Boggs"],
  ["Positive Quotes for Mondays", "The best way to get started is to quit talking and begin doing.", "Walt Disney"],
  ["Positive Quotes for Mondays", "You do not find the happy life. You make it.", "Camilla Eyring Kimball"],
  ["Positive Quotes for Mondays", "Every morning you have two choices: continue to sleep with your dreams, or wake up and chase them.", ""],
  ["Positive Quotes for Mondays", "The only way to do great work is to love what you do.", "Steve Jobs"],
  ["Positive Quotes for Mondays", "Choose to be optimistic, it feels better.", "Dalai Lama XIV"],
  ["Positive Quotes for Mondays", "A year from now you may wish you had started today.", "Karen Lamb"],
  ["Positive Quotes for Mondays", "Be willing to be a beginner every single morning.", "Meister Eckhart"],
  ["Positive Quotes for Mondays", "What you do today can improve all your tomorrows.", "Ralph Marston"],
  ["Positive Quotes for Mondays", "The secret of your success is determined by your daily agenda.", "John C. Maxwell"],
  ["Positive Quotes for Mondays", "Happiness is not by chance, but by choice.", "Jim Rohn"],
  ["Positive Quotes for Mondays", "Do what you can, with what you have, where you are.", "Theodore Roosevelt"],
  ["Positive New Week Quotes", "Every Monday is a chance to start a new chapter.", ""],
  ["Positive New Week Quotes", "The beginning is the most important part of the work.", "Plato"],
  ["Positive New Week Quotes", "Each morning we are born again. What we do today matters most.", "Buddha"],
  ["Positive New Week Quotes", "The future depends on what you do today.", "Mahatma Gandhi"],
  ["Positive New Week Quotes", "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Roy T. Bennett"],
  ["Positive New Week Quotes", "Success is the sum of small efforts, repeated day in and day out.", "Robert Collier"],
  ["Positive New Week Quotes", "You are never too old to set another goal or to dream a new dream.", "C.S. Lewis"],
  ["Positive New Week Quotes", "Every new beginning comes from some other beginning’s end.", "Seneca"],
  ["Positive New Week Quotes", "Either you run the day or the day runs you.", "Jim Rohn"],
  ["Positive New Week Quotes", "The secret of getting ahead is getting started.", "Sally Berger"],
  ["Positive New Week Quotes", "When you arise in the morning, think of what a precious privilege it is to be alive.", "Marcus Aurelius"],
  ["Positive New Week Quotes", "The magic in new beginnings is truly the most powerful of them all.", "Josiyah Martin"],
  ["Positive New Week Quotes", "New week. New mindset. New focus. New goals. New results.", ""],
  ["Positive New Week Quotes", "You’ve got 7 fresh days to make progress. Use them well.", ""],
  ["Positive New Week Quotes", "Small steps every day lead to big changes over time.", "Nicky Gumbel"],
  ["Positive New Week Quotes", "Each week offers you a new canvas—paint it with purpose.", ""],
  ["Positive New Week Quotes", "You can’t go back and change the beginning, but you can start where you are and change the ending.", "C.S. Lewis"],
  ["Positive New Week Quotes", "A new week means another chance to get it right.", ""],
  ["Inspirational Quotes for Mondays", "Let this week be the one where you finally believe in yourself.", ""],
  ["Inspirational Quotes for Mondays", "The only limit to our realization of tomorrow is our doubts of today.", "Franklin D. Roosevelt"],
  ["Inspirational Quotes for Mondays", "You miss 100% of the shots you don’t take.", "Wayne Gretzky"],
  ["Inspirational Quotes for Mondays", "Act as if what you do makes a difference. It does.", "William James"],
  ["Inspirational Quotes for Mondays", "What lies behind us and what lies before us are tiny matters compared to what lies within us.", "Ralph Waldo Emerson"],
  ["Inspirational Quotes for Mondays", "Do not wait to strike till the iron is hot, but make it hot by striking.", "William Butler Yeats"],
  ["Inspirational Quotes for Mondays", "Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill"],
  ["Inspirational Quotes for Mondays", "Don’t wish it were easier. Wish you were better.", "Jim Rohn"],
  ["Inspirational Quotes for Mondays", "The best way to predict the future is to create it.", "Peter Drucker"],
  ["Inspirational Quotes for Mondays", "When you have a dream, you’ve got to grab it and never let go.", "Carol Burnett"],
  ["Inspirational Quotes for Mondays", "Doubt kills more dreams than failure ever will.", "Suzy Kassem"],
  ["Inspirational Quotes for Mondays", "Rise up, start fresh, and see the bright opportunity in each new day.", ""],
  ["Inspirational Quotes for Mondays", "Don’t be afraid to give up the good to go for the great.", "John D. Rockefeller"],
  ["Inspirational Quotes for Mondays", "You don’t have to see the whole staircase, just take the first step.", "Martin Luther King Jr."],
  ["Inspirational Quotes for Mondays", "Dream big. Start small. Act now.", "Robin Sharma"],
  ["Inspirational Quotes for Mondays", "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.", "Rikki Rogers"],
  ["Inspirational Quotes for Mondays", "Perseverance is not a long race; it is many short races one after another.", "Walter Elliot"],
  ["Inspirational Quotes for Mondays", "Your passion is waiting for your courage to catch up.", "Isabelle Lafleche"],
  ["Powerful Monday Motivation Quotes", "Don’t wait for opportunity. Create it.", "George Bernard Shaw"],
  ["Powerful Monday Motivation Quotes", "Discipline is the bridge between goals and accomplishment.", "Jim Rohn"],
  ["Powerful Monday Motivation Quotes", "Success usually comes to those who are too busy to be looking for it.", "Henry David Thoreau"],
  ["Powerful Monday Motivation Quotes", "Go the extra mile. It’s never crowded there.", "Wayne Dyer"],
  ["Powerful Monday Motivation Quotes", "Do something today that your future self will thank you for.", "Sean Patrick Flanery"],
  ["Powerful Monday Motivation Quotes", "Great things never come from comfort zones.", "Roy T. Bennett"],
  ["Powerful Monday Motivation Quotes", "The harder the battle, the sweeter the victory.", "Les Brown"],
  ["Powerful Monday Motivation Quotes", "Start where you are. Use what you have. Do what you can.", "Arthur Ashe"],
  ["Powerful Monday Motivation Quotes", "Don’t limit your challenges. Challenge your limits.", "Jerry Dunn"],
  ["Powerful Monday Motivation Quotes", "Don’t stop when you’re tired. Stop when you’re done.", "David Goggins"],
  ["Powerful Monday Motivation Quotes", "The difference between ordinary and extraordinary is that little extra.", "Jimmy Johnson"],
  ["Powerful Monday Motivation Quotes", "Make each day your masterpiece.", "John Wooden"],
  ["Powerful Monday Motivation Quotes", "Winners are not those who never fail but those who never quit.", "Edwin Louis Cole"],
  ["Powerful Monday Motivation Quotes", "Work hard in silence, let your success make the noise.", "Frank Ocean"],
  ["Powerful Monday Motivation Quotes", "Action is the foundational key to all success.", "Pablo Picasso"],
  ["Monday Quotes for School", "Education is the most powerful weapon which you can use to change the world.", "Nelson Mandela"],
  ["Monday Quotes for School", "The expert in anything was once a beginner.", "Helen Hayes"],
  ["Monday Quotes for School", "Don’t let what you cannot do interfere with what you can do.", "John Wooden"],
  ["Monday Quotes for School", "You don’t have to be the best to start, but you have to start to be your best.", ""],
  ["Monday Quotes for School", "The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
  ["Monday Quotes for School", "It always seems impossible until it’s done.", "Nelson Mandela"],
  ["Monday Quotes for School", "Do something today that your future self will thank you for.", "Sean Patrick Flanery"],
  ["Monday Quotes for School", "Push yourself, because no one else is going to do it for you.", ""],
  ["Monday Quotes for School", "Mistakes are proof that you are trying.", ""],
  ["Monday Quotes for School", "Learning is not attained by chance; it must be sought for with ardor and attended to with diligence.", "Abigail Adams"],
  ["Monday Quotes for School", "You don’t get what you wish for. You get what you work for.", ""],
  ["Monday Quotes for School", "Dream big, work hard, stay humble.", ""],
  ["Monday Quotes for School", "Education is not the learning of facts, but the training of the mind to think.", "Albert Einstein"],
  ["Monday Quotes for School", "Small steps lead to big results. Keep going.", ""],
  ["Monday Quotes for School", "Believe in yourself, even when it’s Monday morning.", ""],
  ["Monday Quotes for School", "Your attitude determines your direction.", ""],
  ["Monday Quotes for School", "Be curious. Be courageous. Be consistent.", ""],
  ["Monday Quotes for School", "Monday is the perfect day to learn something new.", ""],
  ["Monday Quotes for Teens", "You can’t use up creativity. The more you use, the more you have.", "Maya Angelou"],
  ["Monday Quotes for Teens", "Don’t be afraid to stand out. The world doesn’t need more copies.", ""],
  ["Monday Quotes for Teens", "You are never too small to make a difference.", "Greta Thunberg"],
  ["Monday Quotes for Teens", "Your vibe attracts your tribe.", ""],
  ["Monday Quotes for Teens", "Be yourself; everyone else is already taken.", "Oscar Wilde"],
  ["Monday Quotes for Teens", "It’s Monday—time to start writing your own story.", ""],
  ["Monday Quotes for Teens", "Work hard, be kind, and amazing things will happen.", "Conan O’Brien"],
  ["Monday Quotes for Teens", "Dream big. Work hard. Stay kind.", "Tim Tebow"],
  ["Monday Quotes for Teens", "You’re stronger than you think and braver than you feel.", ""],
  ["Monday Quotes for Teens", "Don’t let yesterday take up too much of today.", "Will Rogers"],
  ["Monday Quotes for Teens", "You can’t have a million-dollar dream with a lazy mindset.", "Stephen C. Hogan"],
  ["Monday Quotes for Teens", "Every Monday is a chance to be a better version of yourself.", ""],
  ["Monday Quotes for Teens", "Stay close to people who feel like sunshine.", ""],
  ["Monday Quotes for Teens", "Don’t compare your beginning to someone else’s middle.", "Jon Acuff"],
  ["Monday Quotes for Teens", "Keep going. You’re closer than you think.", ""],
  ["Monday Quotes for Teens", "Be the reason someone smiles today.", ""],
  ["Monday Quotes for Teens", "Do what makes your soul shine.", ""],
  ["Monday Quotes for Teens", "You’ve got this, even if it’s Monday.", ""],
  ["Monday Motivation Quotes for Work", "Success is not the key to happiness. Happiness is the key to success.", "Albert Schweitzer"],
  ["Monday Motivation Quotes for Work", "Quality means doing it right when no one is looking.", "Henry Ford"],
  ["Monday Motivation Quotes for Work", "If you want to lift yourself up, lift up someone else.", "Booker T. Washington"],
  ["Monday Motivation Quotes for Work", "Opportunities don’t happen. You create them.", "Chris Grosser"],
  ["Monday Motivation Quotes for Work", "Hard work beats talent when talent doesn’t work hard.", "Tim Notke"],
  ["Monday Motivation Quotes for Work", "The difference between try and triumph is a little umph.", "Marvin Phillips"],
  ["Monday Motivation Quotes for Work", "Great things are done by a series of small things brought together.", "Vincent Van Gogh"],
  ["Monday Motivation Quotes for Work", "Amateurs sit and wait for inspiration; the rest of us just get up and go to work.", "Stephen King"],
  ["Monday Motivation Quotes for Work", "The only place where success comes before work is in the dictionary.", "Vidal Sassoon"],
  ["Monday Motivation Quotes for Work", "Do what you love and success will follow.", "Meg Whitman"],
  ["Monday Motivation Quotes for Work", "Success is walking from failure to failure with no loss of enthusiasm.", "Winston Churchill"],
  ["Monday Motivation Quotes for Work", "Monday is your chance to set the tone for a productive week.", ""],
  ["Monday Motivation Quotes for Work", "Strive not to be a success, but rather to be of value.", "Albert Einstein"],
  ["Monday Motivation Quotes for Work", "Go confidently in the direction of your dreams. Live the life you have imagined.", "Henry David Thoreau"]
];

const normalizeQuoteText = (text: string) =>
  text
    .trim()
    .replace(/[“”]/g, "\"")
    .replace(/[’]/g, String.fromCharCode(39))
    .replace(/\s+/g, " ")
    .toLowerCase();

const cleanImportedText = (text: string) =>
  text
    .trim()
    .replace(/^[“”"]+/, "")
    .replace(/[“”"]+$/, "");

const includesAny = (haystack: string, needles: string[]) => needles.some((n) => haystack.includes(n));

const inferCategories = (label: string, text: string): Category[] => {
  const l = normalizeQuoteText(label);
  const t = normalizeQuoteText(text);
  const combined = `${l} ${t}`;

  const funnyTriggers = ["wtf", "suck", "complaint", "return mondays", "actually saturday", "weekend plans"];
  const gymTriggers = ["gym", "workout", "fitness", "training", "exercise", "cardio", "sweat", "lift", "lifting", "squat", "weights", "muscle", "run", "running"];
  const workTriggers = [
    "career",
    "job",
    "office",
    "boss",
    "cowork",
    "workplace",
    "business",
    "client",
    "meeting",
    "deadline",
    "productiv",
    "to-do",
    "resume",
    "interview",
    "promotion",
    "manager",
    "leadership",
    "team"
  ];

  const isFunny = l.includes("funny") || includesAny(t, funnyTriggers);
  if (isFunny) return ["funny"];

  const isGym = l.includes("gym") || includesAny(combined, gymTriggers);
  const isWork = l.includes("quotes for work") || l.includes("work") || includesAny(combined, workTriggers);

  const cats: Category[] = [];
  if (isGym) cats.push("gym");
  if (isWork) cats.push("work", "professional");
  cats.push("success");

  return Array.from(new Set(cats));
};

const refineCategories = (q: Quote, label: string) => {
  if (q.id.startsWith("gym-")) return ["gym", "success"] as Category[];
  if (q.id.startsWith("funny-")) return ["funny"] as Category[];
  return inferCategories(label, q.text);
};

const makeSeoAlt = (text: string, author: string, categories: Category[]) => {
  const base = categories.includes("funny") ? "Funny Monday quote" : "Monday motivation quote";
  const clean = cleanImportedText(text).replace(/["“”]/g, "");
  const short = clean.length > 110 ? `${clean.slice(0, 110).trim()}…` : clean;
  if (author && author !== "Unknown") return `${base} by ${author}: ${short}`;
  return `${base}: ${short}`;
};

const csvQuotes: Quote[] = csvQuotesRaw
  .map(([label, quoteText, quoteAuthor], index) => {
    const text = cleanImportedText(quoteText);
    const author = quoteAuthor?.trim() ? quoteAuthor.trim() : "Unknown";
    const categories = inferCategories(label, text);
    return {
      id: `csv-${index + 1}`,
      text,
      author,
      category: categories,
      seo_alt: makeSeoAlt(text, author, categories)
    };
  });

export const quotes: Quote[] = (() => {
  const merged = [
    ...baseQuotes.map((q) => ({
      ...q,
      category: refineCategories(q, ""),
    })),
    ...csvQuotes,
    ...fetchedQuotesData.map((q) => {
      return {
        id: q.id,
        text: q.text,
        author: q.author,
        category: [q.category as Category],
        seo_alt: q.seo_alt
      } as Quote;
    })
  ];
  const seen = new Set<string>();
  const result: Quote[] = [];
  for (const q of merged) {
    const key = normalizeQuoteText(q.text);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(q);
  }
  return result;
})();

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

export function getQuoteById(id: string): Quote | null {
  const needle = id.trim();
  if (!needle) return null;
  return quotes.find((q) => q.id === needle) ?? null;
}
