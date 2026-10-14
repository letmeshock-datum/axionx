/**
 * Isometric hairline kernel (after iso-figure by Tolga Cohce, MIT, via ISO-GLOW).
 * +x runs down-right, +y down-left, +z up. Faces are drawn by mapping plain
 * rects onto the TOP / FRONT (y = max) / SIDE (x = max) planes.
 * Output is a static SVG string, rendered at build time.
 */
const C = Math.cos(Math.PI / 6);
const S = Math.sin(Math.PI / 6);
type V3 = [number, number, number];
const n = (v: number) => +v.toFixed(3);

export function scene(points: V3[], aspect: number, pad = 6) {
  const pr = points.map(([x, y, z]) => [(x - y) * C, (x + y) * S - z]);
  let minX = Math.min(...pr.map((p) => p[0]!));
  let maxX = Math.max(...pr.map((p) => p[0]!));
  let minY = Math.min(...pr.map((p) => p[1]!));
  let maxY = Math.max(...pr.map((p) => p[1]!));
  let w = maxX - minX + pad * 2;
  let h = maxY - minY + pad * 2;
  if (w / h < aspect) {
    const nw = h * aspect;
    minX -= (nw - w) / 2;
    w = nw;
  } else {
    const nh = w / aspect;
    minY -= (nh - h) / 2;
    h = nh;
  }
  const OX = -minX + pad;
  const OY = -minY + pad;
  const P = (x: number, y: number, z: number) => [n((x - y) * C + OX), n((x + y) * S - z + OY)];
  const D = (x: number, y: number, z: number) => [n((x - y) * C), n((x + y) * S - z)];
  const plane = (O: V3, U: V3, V: V3) => {
    const o = P(...O);
    const u = D(...U);
    const v = D(...V);
    return `matrix(${u[0]} ${u[1]} ${v[0]} ${v[1]} ${o[0]} ${o[1]})`;
  };
  const TOP = (x: number, y: number, z: number) => plane([x, y, z], [1, 0, 0], [0, 1, 0]);
  const FRONT = (x: number, y: number, z: number) => plane([x, y, z], [1, 0, 0], [0, 0, -1]);
  const SIDE = (x: number, y: number, z: number) => plane([x, y, z], [0, -1, 0], [0, 0, -1]);

  /** Opaque box: its three visible faces. */
  const box = (x: number, y: number, z: number, bw: number, bd: number, bh: number, cls = '') =>
    `<g class="${cls}">` +
    `<rect transform="${TOP(x, y, z + bh)}" class="f t" width="${bw}" height="${bd}"/>` +
    `<rect transform="${FRONT(x, y + bd, z + bh)}" class="f fr" width="${bw}" height="${bh}"/>` +
    `<rect transform="${SIDE(x + bw, y + bd, z + bh)}" class="f sd" width="${bd}" height="${bh}"/>` +
    `</g>`;
  /** Draw arbitrary markup on a face plane. */
  const on = (transform: string, inner: string, cls = '') => `<g transform="${transform}" class="${cls}">${inner}</g>`;

  return { w: n(w), h: n(h), viewBox: `0 0 ${n(w)} ${n(h)}`, P, D, TOP, FRONT, SIDE, box, on };
}
