'use client';

import { useEffect, useRef, useState } from 'react';

const WALL_T = 0.16; // wall thickness, m
const WALL_H = 1.25; // cut-away wall height, m (kept low so rooms stay visible)
const RAIL_H = 0.45;

/*
 * Schematic layout built from the room areas only (the real drawings are not to scale):
 * living + kitchen on the left over the full depth, bedrooms in the top-right row,
 * bathrooms and hall in the bottom-right row, balcony outside the living room.
 */
export function layoutFor(p) {
  const rooms = p.rooms.map(([n, a]) => ({ n, a: +a }));
  const living = rooms.find((r) => r.n.startsWith('Гал'));
  const beds = rooms.filter((r) => r.n.startsWith('Унт'));
  const baths = rooms.filter((r) => r.n.startsWith('Ариун'));
  const hall = rooms.find((r) => r.n.startsWith('Үүд'));
  const bal = rooms.find((r) => r.n === 'Тагт');

  const D = p.br === 2 ? 8 : 7;
  const S = rooms.filter((r) => r !== bal).reduce((s, r) => s + r.a, 0);
  const Lw = living.a / D;
  const Wr = (S - living.a) / D;
  const W = Lw + Wr;
  const out = [{ ...living, kind: 'living', label: 'Зочны өрөө, гал тогоо', x: 0, y: 0, w: Lw, h: D }];

  const hb = beds.reduce((s, r) => s + r.a, 0) / Wr;
  let x = Lw;
  beds.forEach((b) => {
    const w = b.a / hb;
    out.push({ ...b, kind: 'bed', label: 'Унтлагын өрөө', x, y: 0, w, h: hb });
    x += w;
  });
  const hr = D - hb;
  x = Lw;
  [...baths, hall].forEach((r) => {
    const w = r.a / hr;
    const isHall = r === hall;
    out.push({ ...r, kind: isHall ? 'hall' : 'bath', label: isHall ? 'Үүдний өрөө' : 'Ариун цэвэр', x, y: hb, w, h: hr });
    x += w;
  });

  let balcony = null;
  if (bal) {
    let bw = Math.min(Lw * 0.8, Math.max(1.6, bal.a));
    let bd = bal.a / bw;
    if (bd < 0.7) {
      bd = 0.7;
      bw = Math.min(Lw * 0.9, bal.a / bd);
    }
    balcony = { ...bal, kind: 'balcony', label: 'Тагт', x: (Lw - bw) / 2, y: -bd, w: bw, h: bd };
  }

  // wall segments: [x1, y1, x2, y2, type]
  const walls = [];
  const gap = (x1, y1, x2, y2, at, size, type = 'wall') => {
    // split a segment around an opening centred at fraction `at`
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < size + 0.6) return walls.push([x1, y1, x2, y2, type]);
    const a = Math.max(0.3, at * len - size / 2) / len;
    const b = Math.min(len - 0.3, at * len + size / 2) / len;
    walls.push([x1, y1, x1 + (x2 - x1) * a, y1 + (y2 - y1) * a, type]);
    walls.push([x1 + (x2 - x1) * b, y1 + (y2 - y1) * b, x2, y2, type]);
  };
  // outer walls: windows (glass) along the top facade, entrance door from the hall at the bottom
  walls.push([0, 0, W, 0, 'glass']);
  walls.push([0, 0, 0, D, 'wall']);
  walls.push([W, 0, W, D, 'wall']);
  const h = out.find((r) => r.kind === 'hall');
  walls.push([0, D, h.x, D, 'wall']);
  gap(h.x, D, h.x + h.w, D, 0.5, 0.9);
  walls.push([h.x + h.w, D, W, D, 'wall']);
  // interior walls with door openings
  walls.push([Lw, hb, W, hb, 'wall']);
  out.forEach((r) => {
    if (r.kind === 'living') return;
    if (r.x === Lw) gap(r.x, r.y, r.x, r.y + r.h, r.kind === 'bed' ? 0.78 : 0.5, 0.85);
    else gap(r.x, r.y, r.x, r.y + r.h, 0.5, r.kind === 'bath' ? 0.75 : 0.85);
  });
  if (balcony) {
    const { x: bx, y: by, w: bw } = balcony;
    walls.push([bx, by, bx + bw, by, 'rail'], [bx, by, bx, 0, 'rail'], [bx + bw, by, bx + bw, 0, 'rail']);
  }

  return { W, D, rooms: balcony ? [...out, balcony] : out, walls, hb };
}

function Wall({ seg, s, i }) {
  const [x1, y1, x2, y2, type] = seg;
  const horiz = y1 === y2;
  const len = (horiz ? Math.abs(x2 - x1) : Math.abs(y2 - y1)) * s;
  const t = Math.max(3, WALL_T * s);
  const H = (type === 'rail' ? RAIL_H : WALL_H) * s;
  const style = horiz
    ? { left: Math.min(x1, x2) * s, top: y1 * s - t / 2, width: len, height: t }
    : { left: x1 * s - t / 2, top: Math.min(y1, y2) * s, width: t, height: len };
  return (
    <div className={`p3-wall ${horiz ? 'h' : 'v'} ${type}`} style={{ ...style, '--H': `${H}px`, '--d': `${0.25 + i * 0.03}s` }}>
      <i className="f1" />
      <i className="f2" />
      <i className="cap" />
    </div>
  );
}

function Furniture({ r, s }) {
  const px = (v) => v * s;
  const cx = px(r.w / 2);
  const cy = px(r.h / 2);
  if (r.kind === 'bed') {
    const bw = Math.min(1.6, r.w - 0.6);
    const bl = Math.min(2.0, r.h - 0.6);
    return (
      <>
        <span className="p3-f bed" style={{ left: cx - px(bw) / 2, top: px(0.25), width: px(bw), height: px(bl) }}><b /></span>
        <span className="p3-f rug" style={{ left: cx - px(bw * 0.7) / 2, top: px(0.25 + bl + 0.15), width: px(bw * 0.7), height: px(0.7) }} />
      </>
    );
  }
  if (r.kind === 'living') {
    return (
      <>
        <span className="p3-f counter" style={{ left: px(0.15), top: px(r.h * 0.42), width: px(0.6), height: px(r.h * 0.5) }} />
        <span className="p3-f table" style={{ left: px(1.1), top: px(r.h * 0.62), width: px(1.4), height: px(0.9) }} />
        <span className="p3-f sofa" style={{ left: px(r.w - 1.15), top: px(0.6), width: px(0.85), height: px(Math.min(2.4, r.h * 0.38)) }} />
        <span className="p3-f coffee" style={{ left: px(r.w - 2.1), top: px(0.6 + Math.min(2.4, r.h * 0.38) / 2 - 0.4), width: px(0.8), height: px(0.8) }} />
        <span className="p3-f plant" style={{ left: px(0.35), top: px(0.35), width: px(0.55), height: px(0.55) }} />
      </>
    );
  }
  if (r.kind === 'bath') {
    return <span className="p3-f tub" style={{ left: px(0.15), top: px(0.15), width: px(Math.min(0.75, r.w - 0.3)), height: px(Math.min(1.5, r.h - 0.3)) }} />;
  }
  return null;
}

/*
 * Isometric cut-away model of one apartment. It starts as a flat top-down plan, then tilts
 * into 3D while the walls rise. Drag (or swipe) to turn it; it sways gently when idle.
 */
export default function Plan3D({ plan, built = true, fill = 0.62, interactive = true, labels = true }) {
  const box = useRef(null);
  const [seen, setSeen] = useState(false);
  const [up, setUp] = useState(false);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState(300);
  const rot = useRef({ base: -38, drag: 0, t0: 0, dragging: false, x: 0 });
  const model = useRef(null);
  const { W, D, rooms, walls } = layoutFor(plan);
  const s = size / Math.max(W, D + 1);

  // flat plan -> 3D once it is on screen (and the parent says so)
  useEffect(() => {
    setReady(false);
    if (!built || !seen) {
      setUp(false);
      return;
    }
    const a = setTimeout(() => setUp(true), 80);
    const b = setTimeout(() => setReady(true), 1700);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [built, seen, plan]);

  useEffect(() => {
    const el = box.current;
    const fit = () => setSize(Math.min(el.clientWidth, el.clientHeight) * fill);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fill]);

  useEffect(() => {
    let frame = 0;
    let visible = true;
    const r = rot.current;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) setSeen(true);
        if (visible && !frame) frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    io.observe(box.current);
    function tick(t) {
      frame = 0;
      if (!visible) return;
      if (!r.t0) r.t0 = t;
      const sway = r.dragging ? 0 : Math.sin((t - r.t0) / 2600) * 9;
      if (model.current) model.current.style.setProperty('--rz', `${r.base + r.drag + sway}deg`);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const onDown = (e) => {
    if (!interactive) return;
    const r = rot.current;
    r.dragging = true;
    r.x = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    const r = rot.current;
    if (!r.dragging) return;
    r.drag += (e.clientX - r.x) * 0.4;
    r.x = e.clientX;
  };
  const onUp = () => {
    rot.current.dragging = false;
  };

  return (
    <div
      ref={box}
      className={`p3${up ? ' up' : ''}${ready ? ' ready' : ''}${interactive ? ' grab' : ''}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      role="img"
      aria-label={`${plan.k} сууцны 3D төлөвлөлт, ${plan.area} м² (схем)`}
    >
      {interactive && <span className="p3-hint">↔ Чирж эргүүлээрэй</span>}
      <div className="p3-model" ref={model} style={{ width: W * s, height: D * s, '--lz': `${WALL_H * s + 26}px` }}>
        <div className="p3-shadow" />
        {rooms.map((r, i) => (
          <div key={i} className={`p3-room ${r.kind}`} style={{ left: r.x * s, top: r.y * s, width: r.w * s, height: r.h * s }}>
            <Furniture r={r} s={s} />
            {labels && r.kind !== 'hall' && r.kind !== 'balcony' && (
              <span className="p3-label" style={{ '--d': `${1 + i * 0.12}s` }}>
                <b>{r.label}</b>{r.a.toFixed(2)} м²
              </span>
            )}
          </div>
        ))}
        {walls.map((seg, i) => (
          <Wall key={i} seg={seg} s={s} i={i} />
        ))}
        {labels && (
          <span className="p3-entry" style={{ left: (rooms.find((r) => r.kind === 'hall').x + rooms.find((r) => r.kind === 'hall').w / 2) * s, top: D * s + 18 }}>
            ↑ Орц
          </span>
        )}
      </div>
    </div>
  );
}
