import matter from 'gray-matter';
import { marked } from 'marked';

// Blog posts come from two places:
// 1. Markdown files in src/data/posts (the starter posts)
// 2. Later: posts written in the myCPD Admin dashboard (BLOG_SOURCE_URL), fetched at build time
const SHOW_DRAFTS = import.meta.env.PUBLIC_SHOW_DRAFTS === 'true';

marked.setOptions({ gfm: true });

const files = import.meta.glob('../data/posts/*.md', { query: '?raw', import: 'default', eager: true });

function readingMinutes(text) {
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function normalise(p) {
  const html = p.html ?? marked.parse(p.body || '');
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary || '',
    topic: p.topic || 'CPD',
    date: new Date(p.date),
    updated: p.updated ? new Date(p.updated) : null,
    author: p.author || 'The myCPD team',
    cover: p.cover || null,
    status: p.status || 'published',
    html,
    readingMinutes: readingMinutes(p.body || html),
  };
}

async function remotePosts() {
  const url = import.meta.env.BLOG_SOURCE_URL;
  if (!url) return [];
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const list = await res.json();
    return Array.isArray(list) ? list.map((p) => normalise({ ...p, body: p.content })) : [];
  } catch {
    return [];
  }
}

let cache;
export async function getAllPosts() {
  if (cache) return cache;
  const local = Object.entries(files).map(([path, raw]) => {
    const { data, content } = matter(raw);
    const slug = data.slug || path.split('/').pop().replace(/\.md$/, '');
    return normalise({ ...data, slug, body: content });
  });
  const all = [...local, ...(await remotePosts())]
    .filter((p) => p.status === 'published' || (SHOW_DRAFTS && p.status === 'draft'))
    .sort((a, b) => b.date - a.date);
  // de-duplicate by slug (admin dashboard version wins over the starter file)
  const seen = new Map();
  for (const p of all) if (!seen.has(p.slug)) seen.set(p.slug, p);
  cache = [...seen.values()];
  return cache;
}

export const TOPICS = ['CPD audits', 'Reflection', 'Supervision', 'Regulation'];
