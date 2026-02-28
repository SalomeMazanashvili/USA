import { sanityClient } from "./sanity";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  publishedAt: string;      // ISO datetime
  category: string;         // e.g. "იმიგრაცია"
  mainImage: any;           // Sanity image ref → use urlFor()
  featured: boolean;
  body: any[];              // Portable Text blocks
}

export interface Vacancy {
  _id: string;
  title: string;
  category: string;         // must match category IDs: "nanny", "cdl-driver", etc.
  location: string;
  type: string;             // "სრული განაკვეთი" | "ნახევარი განაკვეთი" | "დროებითი"
  publishedAt: string;      // ISO datetime — displayed as relative time
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

// ─── News ─────────────────────────────────────────────────────────────────────

export async function getAllNews(): Promise<NewsItem[]> {
  return sanityClient.fetch(`
    *[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      publishedAt,
      category,
      mainImage,
      featured
    }
  `);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  return sanityClient.fetch(
    `*[_type == "news" && _id == $id][0] {
      _id,
      title,
      excerpt,
      publishedAt,
      category,
      mainImage,
      featured,
      body
    }`,
    { id }
  );
}

// ─── Vacancies ────────────────────────────────────────────────────────────────

export async function getAllVacancies(): Promise<Vacancy[]> {
  return sanityClient.fetch(`
    *[_type == "vacancy"] | order(publishedAt desc) {
      _id,
      title,
      category,
      location,
      type,
      publishedAt,
      salary,
      description
    }
  `);
}

export async function getVacancyById(id: string): Promise<Vacancy | null> {
  return sanityClient.fetch(
    `*[_type == "vacancy" && _id == $id][0] {
      _id,
      title,
      category,
      location,
      type,
      publishedAt,
      salary,
      description,
      requirements,
      benefits
    }`,
    { id }
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Turns an ISO date into a Georgian-style relative time string */
export function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "დღეს";
  if (days === 1) return "1 დღის წინ";
  if (days < 7) return `${days} დღის წინ`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 კვირის წინ";
  if (weeks < 4) return `${weeks} კვირის წინ`;
  const months = Math.floor(days / 30);
  return `${months} თვის წინ`;
}

/** Formats ISO datetime to Georgian display date */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("ka-GE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
