/**
 * Wipe page transition, after the "wipe" transition in Codrops' Interlude
 * (github.com/codrops/interlude, MIT).
 *
 * Leave (this page): an accent panel slides in from one side, pushing the page
 * along as it fades. Then the browser navigates. Enter (next page): an inline
 * script in <head> (Base.astro) sees the hand-off note and paints the panel
 * before the first frame, so the screen stays covered; once fonts and the first
 * images are ready the panel carries on out the other side and the page comes
 * in behind it.
 *
 * Direction follows the next page: into English the panel runs right to left,
 * into Arabic left to right.
 */

const LEAVE = { duration: 900, easing: 'cubic-bezier(0.45, 0, 0.55, 1)' }; // power2.inOut
const ENTER = { duration: 900, easing: 'cubic-bezier(0.5, 1, 0.89, 1)' }; // power2.out
const PUSH = 80; // px the page is pushed along
const MEDIA_TIMEOUT = 1500; // ms the reveal waits for fonts and images, at most
export const WIPE_KEY = 'axion:wipe';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function makePanel(x: string) {
  const panel = document.createElement('div');
  panel.setAttribute('aria-hidden', 'true');
  panel.style.cssText = `position:fixed;inset:0;z-index:200;background:var(--c-accent);will-change:transform;transform:translateX(${x})`;
  document.body.append(panel);
  return panel;
}

let leaving: { panel: HTMLElement; anims: Animation[] } | null = null;

// Back through the back/forward cache: the page must not still be covered.
addEventListener('pageshow', (e) => {
  if (!e.persisted || !leaving) return;
  leaving.anims.forEach((a) => a.cancel());
  leaving.panel.remove();
  leaving = null;
});

/** Covers this page with the panel, then navigates to `href`. */
export async function wipeTo(href: string, nextDir: 'ltr' | 'rtl') {
  if (leaving || reduced()) {
    location.assign(href);
    return;
  }
  const s = nextDir === 'rtl' ? -1 : 1; // 1: the panel comes in from the right
  const page = document.querySelector<HTMLElement>('.page')!;
  const panel = makePanel(`${100 * s}%`);
  const anims = [
    panel.animate([{ transform: `translateX(${100 * s}%)` }, { transform: 'translateX(0)' }], { ...LEAVE, fill: 'forwards' }),
    page.animate(
      [{ transform: 'translateX(0)', opacity: 1 }, { transform: `translateX(${-PUSH * s}px)`, opacity: 0 }],
      { ...LEAVE, fill: 'forwards' },
    ),
  ];
  leaving = { panel, anims };
  try {
    sessionStorage.setItem(WIPE_KEY, JSON.stringify({ s, t: Date.now() }));
  } catch {}
  await Promise.all(anims.map((a) => a.finished));
  location.assign(href);
}

/** Fonts and the images in the first screen, or the timeout, whichever comes first. */
function ready() {
  const images = [...document.images]
    .filter((img) => img.getBoundingClientRect().top < innerHeight)
    .map((img) => img.decode().catch(() => {}));
  const all = Promise.all([document.fonts?.ready, ...images]);
  return Promise.race([all, new Promise((r) => setTimeout(r, MEDIA_TIMEOUT))]);
}

/** Reveals a page that arrived covered (html[data-wipe], set in <head>). */
export async function wipeIn() {
  const root = document.documentElement;
  const s = Number(root.dataset.wipe);
  if (!s) return;
  await ready();

  const page = document.querySelector<HTMLElement>('.page')!;
  const panel = makePanel('0');
  delete root.dataset.wipe; // the real panel has taken over from the CSS one

  const anims = [
    panel.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-100 * s}%)` }], { ...ENTER, fill: 'forwards' }),
    page.animate(
      [{ transform: `translateX(${PUSH * s}px)`, opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
      ENTER,
    ),
  ];
  await Promise.all(anims.map((a) => a.finished));
  panel.remove();
}
