/**
 * Site-wide constants. Everything that is likely to change when the
 * placeholder goes live lives here.
 */
export const SITE = {
  /** Canonical origin, no trailing slash. Also set in astro.config.mjs → `site`. */
  url: 'https://axionx.sa',
  name: 'Axion',
  /** Address copied by the "Request a briefing" button (and used as its mailto fallback). */
  email: 'hello@axionx.sa',
  themeColor: '#080808',
} as const;
