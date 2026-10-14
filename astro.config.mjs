// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const LATIN =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'.split(',');
const ARABIC =
  'U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC'.split(',');

export default defineConfig({
  site: 'https://axionx.sa',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', ar: 'ar-SA' },
      },
    }),
  ],
  // Fonts are self-hosted from the installed fontsource packages (no network at build time).
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Geist',
      cssVariable: '--font-geist',
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
            unicodeRange: /** @type {[string, ...string[]]} */ (LATIN),
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
            unicodeRange: /** @type {[string, ...string[]]} */ (LATIN),
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans Arabic',
      cssVariable: '--font-arabic',
      // No fallbacks on purpose: the family must stay unicode-range-limited to Arabic so Latin
      // glyphs fall through to Geist (see --font-sans for [dir=rtl] in global.css).
      fallbacks: [],
      options: {
        variants: [
          {
            src: ['@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2'],
            weight: 400,
            style: 'normal',
            display: 'swap',
            unicodeRange: /** @type {[string, ...string[]]} */ (ARABIC),
          },
        ],
      },
    },
  ],
});
