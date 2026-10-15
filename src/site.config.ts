/**
 * Site-wide constants. Everything that is likely to change when the
 * placeholder goes live lives here.
 */
export const SITE = {
  /** Canonical origin, no trailing slash; follows `site` in astro.config.mjs. */
  url: import.meta.env.SITE.replace(/\/$/, ''),
  name: 'Axion',
  /** Address copied by the "Request a briefing" button (and used as its mailto fallback). */
  email: 'info@axion.com.sa',
  themeColor: '#080808',
} as const;
