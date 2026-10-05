import { getCollection, type CollectionEntry } from 'astro:content';

export const CATEGORIES = ['Thoughts', 'Memories', 'Happenings', 'Profiles', 'Podcasts', 'Foundation', 'Notices'] as const;
export type Category = (typeof CATEGORIES)[number];

export const catSlug = (c: string) => c.toLowerCase();
export const catFromSlug = (s: string) => CATEGORIES.find((c) => catSlug(c) === s);

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const readingTime = (body = '') => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
};

export type Post = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  meta: string;
  author: string;
  hero?: string;
  podcastUrl?: string;
  podcastHost?: string;
  read: string;
  entry: CollectionEntry<'blog'>;
};

export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  return entries
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title))
    .map((entry) => {
      const d = entry.data;
      const date = formatDate(d.date);
      return {
        slug: entry.id,
        href: `/blog/${entry.id}`,
        title: d.title,
        excerpt: d.excerpt,
        category: d.category,
        date,
        meta: `${date} — ${d.category}`,
        author: d.author,
        hero: d.hero,
        podcastUrl: d.podcastUrl,
        podcastHost: d.podcastHost,
        read: readingTime(entry.body),
        entry,
      };
    });
}

export const countFor = (posts: Post[], c: string) => posts.filter((p) => p.category === c).length;
