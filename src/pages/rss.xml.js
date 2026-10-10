import { getAllPosts } from '../lib/posts.js';

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET({ site }) {
  const posts = (await getAllPosts()).filter((p) => p.status === 'published');
  const items = posts.map((p) => `<item><title>${esc(p.title)}</title><link>${new URL(`/blog/${p.slug}`, site)}</link><guid>${new URL(`/blog/${p.slug}`, site)}</guid><pubDate>${p.date.toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>myCPD.ie blog</title><link>${new URL('/blog', site)}</link><description>Guides on CPD, reflection and supervision for health and social care professionals.</description><language>en-ie</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
