import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://mycpd.ie',
  trailingSlash: 'ignore',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
