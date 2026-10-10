import { BASE44_API } from './site.js';

// Read public data from the myCPD app at build time. Never fails the build.
async function getJson(path) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(`${BASE44_API}${path}`, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

let settingsCache;
export async function getSettings() {
  if (settingsCache !== undefined) return settingsCache;
  const list = await getJson('/entities/AppSettings?sort=-updated_date&limit=1');
  settingsCache = Array.isArray(list) && list[0] ? list[0] : null;
  return settingsCache;
}

export async function getTestimonials() {
  const q = encodeURIComponent(JSON.stringify({ is_featured: true }));
  const list = await getJson(`/entities/Testimonial?q=${q}&limit=4`);
  return Array.isArray(list) ? list.filter((t) => t && t.comment) : [];
}
