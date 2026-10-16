/**
 * Slices page transition, after the "slices" transition in Codrops' Interlude
 * (github.com/codrops/interlude, MIT).
 *
 * The screen breaks into columns, and in each one the next page pushes the old
 * one up and out, column after column. Both pages are still copies: the old one
 * cloned from the live DOM (canvases and the video frame copied in), the next
 * one parsed from its prefetched HTML. When the last column lands the browser
 * navigates; a cross-document view transition (global.css) keeps the last
 * frame on screen until the real page paints, so the hand-off is seamless.
 */

const COLUMNS = 5; // across the screen
const COLUMNS_SMALL = 3; // below 768px
const DURATION = 900; // ms, each column's push
const STAGGER = 80; // ms between one column and the next
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'; // power3.inOut
const SECTIONS = 3; // the header can only be reached near the top, so the first sections cover the screen

/** Keeps the header and the first sections: enough to fill the screen, cheap to copy ten times. */
function trim(page: HTMLElement) {
  page.querySelectorAll('main > *').forEach((el, i) => i >= SECTIONS && el.remove());
  page.querySelectorAll(':scope > footer, script').forEach((el) => el.remove());
  page.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  page.querySelectorAll('video').forEach((v) => {
    v.removeAttribute('src');
    v.preload = 'none';
  });
}

/** A still copy of the live page: canvases and the playing video frame are painted in. */
function copyLive(): HTMLElement {
  const live = document.querySelector<HTMLElement>('.page')!;
  const copy = live.cloneNode(true) as HTMLElement;

  const srcCanvases = live.querySelectorAll('canvas');
  copy.querySelectorAll('canvas').forEach((c, i) => {
    try {
      c.getContext('2d')?.drawImage(srcCanvases[i]!, 0, 0);
    } catch {}
  });

  const srcVideos = live.querySelectorAll('video');
  copy.querySelectorAll('video').forEach((v, i) => {
    const src = srcVideos[i]!;
    if (src.readyState < 2) return;
    const still = document.createElement('canvas');
    still.width = src.videoWidth;
    still.height = src.videoHeight;
    still.className = v.className;
    for (const a of v.getAttributeNames()) if (a.startsWith('data-astro-cid')) still.setAttribute(a, '');
    try {
      still.getContext('2d')?.drawImage(src, 0, 0);
      v.replaceWith(still);
    } catch {}
  });

  trim(copy);
  return copy;
}

/** The next page as markup, from its (prefetched) HTML. */
async function copyNext(href: string) {
  const res = await fetch(href, { credentials: 'same-origin' });
  if (!res.ok) throw new Error(String(res.status));
  const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
  const page = doc.querySelector<HTMLElement>('.page');
  if (!page) throw new Error('no page');
  trim(page);
  return {
    page: document.importNode(page, true),
    lang: doc.documentElement.lang,
    dir: doc.documentElement.dir || 'ltr',
  };
}

/**
 * One slice: a column-sized frame showing its stretch of a page copy. The frame
 * is what moves and it clips to the column, so the browser moves a column-sized
 * picture rather than a whole page.
 */
function slice(page: HTMLElement, opts: { left: number; width: number; top: number; lang: string; dir: string }) {
  const frame = document.createElement('div');
  frame.style.cssText = 'position:absolute;inset:0;overflow:hidden;will-change:transform;background:var(--c-bg)';
  // dir/lang on the wrapper re-evaluate the [dir='rtl'] tokens and :lang() rules for the copy.
  const doc = document.createElement('div');
  doc.dir = opts.dir;
  doc.lang = opts.lang;
  doc.style.cssText = `position:absolute;top:${-opts.top}px;left:${-opts.left}px;width:${opts.width}px;font-family:var(--font-sans);color:var(--c-text)`;
  doc.append(page);
  frame.append(doc);
  return frame;
}

/** Puts the language switch's thumb under the current item in a copy that never ran its script. */
function placeThumbs(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-lang]').forEach((lang) => {
    const thumb = lang.querySelector<HTMLElement>('[data-lang-thumb]');
    const current = lang.querySelector<HTMLElement>('[aria-current="true"]');
    if (!thumb || !current) return;
    thumb.style.transition = 'none';
    thumb.style.width = `${current.offsetWidth}px`;
    thumb.style.translate = `${current.offsetLeft}px 0`;
    lang.classList.add('is-ready');
  });
}

let layer: HTMLElement | null = null;

// Coming back through the back/forward cache: the page must not still be covered.
addEventListener('pageshow', (e) => {
  if (e.persisted && layer) {
    layer.remove();
    layer = null;
  }
});

/**
 * Plays the slices, then navigates to `href`. Columns run in the next page's
 * reading order: right to left into Arabic, left to right into English.
 */
export async function slicesTo(href: string) {
  if (layer || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    location.assign(href);
    return;
  }

  const width = document.documentElement.clientWidth;
  const height = innerHeight;
  const count = width < 768 ? COLUMNS_SMALL : COLUMNS;
  const columnWidth = width / count;
  const old = copyLive();
  const oldDir = document.documentElement.dir || 'ltr';
  const oldLang = document.documentElement.lang;

  let next: Awaited<ReturnType<typeof copyNext>>;
  try {
    next = await copyNext(href);
  } catch {
    location.assign(href);
    return;
  }

  layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = 'position:fixed;inset:0;z-index:100;overflow:hidden;background:var(--c-bg)';

  const columns = Array.from({ length: count }, (_, i) => {
    const left = i * columnWidth;
    const box = document.createElement('div');
    box.style.cssText = `position:absolute;top:0;bottom:0;left:${left}px;width:${columnWidth + 1}px;overflow:hidden;background:var(--c-bg)`;
    const oldSlice = slice(i === 0 ? old : (old.cloneNode(true) as HTMLElement), {
      left, width, top: scrollY, lang: oldLang, dir: oldDir,
    });
    const nextSlice = slice(i === 0 ? next.page : (next.page.cloneNode(true) as HTMLElement), {
      left, width, top: 0, lang: next.lang, dir: next.dir,
    });
    nextSlice.style.transform = `translateY(${height}px)`;
    box.append(oldSlice, nextSlice);
    layer!.append(box);
    return { oldSlice, nextSlice };
  });

  // Copied canvases lose their pixels when cloned again: repaint them from the first column.
  const firstCanvases = columns[0]!.oldSlice.querySelectorAll('canvas');
  columns.slice(1).forEach(({ oldSlice }) =>
    oldSlice.querySelectorAll('canvas').forEach((c, i) => {
      try {
        c.getContext('2d')?.drawImage(firstCanvases[i]!, 0, 0);
      } catch {}
    }),
  );

  document.body.append(layer);
  placeThumbs(layer);

  const order = next.dir === 'rtl' ? [...columns].reverse() : columns;
  const runs = order.flatMap(({ oldSlice, nextSlice }, i) => {
    const timing: KeyframeAnimationOptions = { duration: DURATION, delay: i * STAGGER, easing: EASE, fill: 'forwards' };
    return [
      oldSlice.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${-height}px)` }], timing),
      nextSlice.animate([{ transform: `translateY(${height}px)` }, { transform: 'translateY(0)' }], timing),
    ];
  });

  await Promise.all(runs.map((a) => a.finished));
  location.assign(href);
}
