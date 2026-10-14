import { scene } from './iso';

/**
 * Four SPAR illustrations sharing one 200 × 150 ground plate and one frame,
 * so they read at the same scale side by side. Only what is live uses the
 * accent: travelling pulses, lit screens, the chosen route, the raised boom,
 * the logged gap. Animation lives in SparFigure.astro's CSS.
 */
export type SparKind = 'sense' | 'plan' | 'act' | 'reflect';

const FRAME: [number, number, number][] = [
  [0, 0, 0], [200, 0, 0], [0, 150, 0], [200, 150, 0], [0, 0, 64], [200, 0, 64],
];

function base(id: string) {
  const K = scene(FRAME, 1.3);
  const defs =
    `<defs><filter id="${id}-glow" filterUnits="userSpaceOnUse" x="-600" y="-600" width="1400" height="1400">` +
    `<feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>` +
    `</filter></defs>`;
  const glow = `filter="url(#${id}-glow)"`;
  let svg = defs + K.box(0, 0, 0, 200, 150, 5, 'plate');
  svg += K.on(K.TOP(0, 0, 5), `<rect class="d" x="8" y="8" width="184" height="134" rx="6"/>`);
  return { K, svg, glow };
}

function sense() {
  const b = base('fig-sense');
  const { K, glow } = b;
  let svg = b.svg;
  const { box, on, TOP, FRONT, SIDE } = K;
  // Wires on the plate, source → hub; a dash of light runs along each.
  const wires = ['M 24 28 L 24 80 L 80 80', 'M 160 55 L 160 80 L 120 80', 'M 50 118 L 90 118 L 90 100'];
  svg += on(
    TOP(0, 0, 5),
    wires.map((d) => `<path class="w" d="${d}"/>`).join('') +
      wires.map((d, i) => `<path class="pulse pulse--${i}" pathLength="1000" d="${d}" ${glow}/>`).join(''),
  );
  // Field sensor: pole + camera head, lens lit.
  svg += box(20, 20, 5, 8, 8, 46);
  svg += box(12, 14, 51, 22, 14, 12);
  svg += on(FRONT(12, 28, 63), `<circle class="hot" cx="16" cy="6" r="3" ${glow}/><rect class="d" x="3" y="3" width="6" height="6"/>`);
  // Enterprise system: server with vent slits and a status LED.
  svg += box(20, 106, 5, 30, 26, 40);
  svg += on(
    FRONT(20, 132, 45),
    [10, 16, 22, 28, 34].map((v) => `<line class="d" x1="5" y1="${v}" x2="25" y2="${v}"/>`).join('') +
      `<circle class="hot blink" cx="24" cy="5" r="1.8" ${glow}/>`,
  );
  // Hub: receiving unit with a lit intake strip.
  svg += box(80, 60, 5, 40, 40, 24);
  svg += on(FRONT(80, 100, 29), `<rect class="hot glass" x="6" y="7" width="28" height="6" rx="1" ${glow}/>`);
  svg += on(SIDE(120, 100, 29), [8, 14, 20, 26, 32].map((u) => `<line class="d" x1="${u}" y1="6" x2="${u}" y2="18"/>`).join(''));
  svg += box(96, 76, 29, 8, 8, 10);
  svg += on(TOP(96, 76, 39), `<circle class="hot blink" cx="4" cy="4" r="2" ${glow}/>`);
  // Smartphone lying on the plate, screen on.
  svg += box(150, 15, 5, 26, 40, 3);
  svg += on(
    TOP(150, 15, 8),
    `<rect class="scr" x="2.5" y="3" width="21" height="34" rx="2"/>` +
      `<rect class="hot" x="6" y="8" width="14" height="3" rx="1" ${glow}/>` +
      `<line class="d d--on" x1="6" y1="16" x2="20" y2="16"/><line class="d d--on" x1="6" y1="21" x2="16" y2="21"/>`,
  );
  return { viewBox: K.viewBox, svg };
}

function plan() {
  const b = base('fig-plan');
  const { K, glow } = b;
  let svg = b.svg;
  const { box, on, TOP, FRONT } = K;
  // Grid of decision points.
  let dots = '';
  for (let x = 20; x <= 180; x += 20) for (let y = 20; y <= 130; y += 20) dots += `<circle class="dot" cx="${x}" cy="${y}" r="1"/>`;
  svg += on(TOP(0, 0, 5), dots);
  // Considered route (dim, dashed) and the proposed one (lit, drawn in).
  // Constraints sit behind the proposed route so it stays in view.
  const chosen = 'M 24 128 L 96 128 L 96 72 L 168 72 L 168 34';
  svg += on(
    TOP(0, 0, 5),
    `<path class="w w--alt" d="M 24 128 L 24 52 L 100 52 L 100 12 L 168 12 L 168 30"/>` +
      `<path class="w" d="${chosen}"/>` +
      `<path class="route" pathLength="1000" d="${chosen}" ${glow}/>`,
  );
  svg += box(30, 70, 5, 24, 30, 22);
  svg += box(110, 20, 5, 26, 26, 26);
  svg += box(18, 122, 5, 12, 12, 5, 'start');
  // Target: a flag that lights when the route arrives.
  svg += box(167, 29, 5, 2, 2, 40);
  svg += on(FRONT(169, 31, 45), `<rect class="flag" x="0" y="0" width="18" height="11" ${glow}/>`);
  svg += box(120, 96, 5, 26, 20, 14);
  return { viewBox: K.viewBox, svg };
}

function act() {
  const b = base('fig-act');
  const { K, glow } = b;
  let svg = b.svg;
  const { box, on, TOP, FRONT, SIDE } = K;
  // Lane under the barrier, then the signal wire from console to post.
  svg += on(
    TOP(0, 0, 5),
    `<rect class="d" x="104" y="110" width="88" height="30" rx="2"/>` +
      [118, 136, 154, 172].map((x) => `<line class="d" x1="${x}" y1="125" x2="${x + 8}" y2="125"/>`).join(''),
  );
  const wire = 'M 48 62 L 48 101 L 112 101';
  svg += on(TOP(0, 0, 5), `<path class="w" d="${wire}"/><path class="pulse pulse--act" pathLength="1000" d="${wire}" ${glow}/>`);
  // Console with a lit screen and the action button on top.
  svg += box(20, 22, 5, 52, 40, 28);
  svg += on(
    FRONT(20, 62, 33),
    `<rect class="hot glass" x="6" y="5" width="28" height="12" rx="1" ${glow}/>` +
      `<line class="d" x1="38" y1="8" x2="47" y2="8"/><line class="d" x1="38" y1="13" x2="47" y2="13"/>`,
  );
  svg += on(SIDE(72, 62, 33), [8, 14, 20, 26, 32].map((u) => `<line class="d" x1="${u}" y1="6" x2="${u}" y2="20"/>`).join(''));
  svg += `<g class="btn">${box(48, 34, 33, 14, 14, 4)}</g>`;
  // Barrier: post, lamp, and a boom that lifts in the post's front plane.
  svg += box(112, 96, 5, 10, 10, 40);
  svg += `<g class="lamp" ${glow}>${box(112, 96, 45, 10, 10, 5)}</g>`;
  svg += on(
    FRONT(0, 106, 0),
    `<g transform="translate(117 -38)"><g class="boom">` +
      `<rect class="f fr" x="0" y="-2.5" width="74" height="5"/>` +
      [12, 28, 44, 60].map((x) => `<rect class="stripe" x="${x}" y="-2.5" width="7" height="5"/>`).join('') +
      `</g></g>`,
  );
  return { viewBox: K.viewBox, svg };
}

function reflect() {
  const b = base('fig-reflect');
  const { K, glow } = b;
  let svg = b.svg;
  const { box, on, TOP, FRONT } = K;
  // The loop: a ring on the plate with light running round it.
  svg += on(
    TOP(0, 0, 5),
    `<circle class="w" cx="100" cy="75" r="58"/>` +
      `<circle class="ring" pathLength="1000" cx="100" cy="75" r="58" ${glow}/>` +
      [0, 90, 180, 270].map((a) => `<circle class="dot dot--ring" cx="${100 + 58 * Math.cos((a * Math.PI) / 180)}" cy="${75 + 58 * Math.sin((a * Math.PI) / 180)}" r="2"/>`).join(''),
  );
  // Intent (ghost) vs outcome (solid); the gap between them is logged.
  svg += box(80, 62, 5, 14, 14, 52, 'ghost');
  svg += box(102, 62, 5, 14, 14, 36);
  svg += box(102, 62, 41, 14, 14, 16, 'gap');
  // The log: stacked sheets, newest entry lit.
  svg += box(150, 104, 5, 30, 22, 2);
  svg += box(150, 104, 7, 30, 22, 2);
  svg += box(150, 104, 9, 30, 22, 2);
  svg += on(
    TOP(150, 104, 11),
    `<line class="d" x1="5" y1="6" x2="25" y2="6"/><line class="d" x1="5" y1="11" x2="21" y2="11"/>` +
      `<line class="entry" x1="5" y1="16" x2="23" y2="16" ${glow}/>`,
  );
  svg += on(FRONT(102, 76, 57), `<line class="gap-mark" x1="-6" y1="0" x2="-6" y2="16" ${glow}/>`);
  return { viewBox: K.viewBox, svg };
}

export const sparFigures: Record<SparKind, () => { viewBox: string; svg: string }> = { sense, plan, act, reflect };
