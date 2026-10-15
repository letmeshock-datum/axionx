/**
 * Site-wide constants. Everything that is likely to change when the
 * placeholder goes live lives here.
 */
export const SITE = {
  /** Canonical origin, no trailing slash; follows `site` in astro.config.mjs. */
  url: import.meta.env.SITE.replace(/\/$/, ''),
  /** Origin for share images (og:image). axionx.sa is attached in Vercel but its DNS isn't live,
   *  so link previews load the image from the Vercel domain, which always resolves. */
  shareOrigin: 'https://axion-dun-xi.vercel.app',
  name: 'Axion',
  /** Address copied by the "Request a briefing" button (and used as its mailto fallback). */
  email: 'info@axion.com.sa',
  themeColor: '#080808',
} as const;
