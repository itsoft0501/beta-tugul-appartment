'use client';

import { useEffect, useRef } from 'react';
import { Icon } from './Icons';

const clamp = (v) => Math.min(1, Math.max(0, v));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Floating info chips around the building: offset as a fraction of the card size, plus 3D depth.
const chips = [
  { x: -0.7, y: -0.04, z: 160, big: '30%', small: 'урьдчилгаа' },
  { x: 0.72, y: -0.2, z: 220, big: '50', small: 'айлын орон сууц' },
  { x: 0.64, y: 0.32, z: 120, big: '46–79', small: 'м² талбай' },
];

/*
 * Pinned, scroll-driven intro:
 *   0.00–0.32  the building turns from a tilted 3D card to face you and grows to fill the screen
 *   0.32–0.62  the camera keeps pushing into the lit balconies (blur + glow), then a warm flash
 *   0.58–0.92  an apartment interior settles into place, then the call to action appears
 */
export default function ScrollIntro() {
  const sec = useRef(null);
  const r = useRef({});

  useEffect(() => {
    const el = r.current;
    let frame = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const render = () => {
      frame = 0;
      const rect = sec.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const p = clamp(-rect.top / (rect.height - vh));

      // ease the mouse tilt towards its target
      mx += (tx - mx) * 0.12;
      my += (ty - my) * 0.12;

      const A = easeInOut(seg(p, 0, 0.32));
      const Braw = seg(p, 0.32, 0.62);
      const B = Braw * Braw;
      const C = easeInOut(seg(p, 0.58, 0.92));

      const cw = el.card.offsetWidth;
      const ch = el.card.offsetHeight;
      const cover = Math.max(vw / cw, vh / ch) * 1.04;
      const lift = -vh * 0.02 * (1 - A);

      const rotX = 16 * (1 - A) - my * 6 * (1 - B);
      const rotY = -18 * (1 - A) + mx * 8 * (1 - B);
      el.scene.style.transform = `translate3d(0, ${lift}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

      const scale = (0.86 + (cover - 0.86) * A) * (1 + 2.4 * B);
      el.card.style.transform = `scale(${scale})`;
      el.card.style.borderRadius = `${28 * (1 - A)}px`;
      el.card.style.filter = `blur(${B * 7}px) brightness(${1 + B * 0.6})`;
      el.card.style.opacity = 1 - seg(p, 0.57, 0.65);

      const chipOut = 1 + A * 1.8;
      el.chips.forEach((c, i) => {
        const d = chips[i];
        c.style.transform = `translate(-50%, -50%) translate3d(${d.x * cw * chipOut}px, ${d.y * ch * chipOut}px, ${d.z}px)`;
        c.style.opacity = 1 - seg(p, 0.1 + i * 0.03, 0.28 + i * 0.03);
      });

      el.word.style.transform = `translate(-50%, -50%) translateY(${-A * vh * 0.12}px) scale(${1 + A * 0.7})`;
      el.word.style.opacity = 1 - seg(p, 0.16, 0.42);

      const t = seg(p, 0.03, 0.2);
      el.title.style.opacity = 1 - t;
      el.title.style.transform = `translateY(${-t * 40}px)`;
      el.cue.style.opacity = 1 - seg(p, 0, 0.05);

      el.flash.style.opacity = Math.min(seg(p, 0.5, 0.6), 1 - seg(p, 0.6, 0.72)) * 0.95;

      const roomIn = seg(p, 0.56, 0.66);
      el.room.style.opacity = roomIn;
      el.room.style.transform = `scale(${1.5 - 0.5 * C}) rotateX(${10 * (1 - C)}deg)`;
      el.room.style.filter = `blur(${(1 - seg(p, 0.58, 0.76)) * 6}px)`;

      const e = seg(p, 0.8, 0.9);
      el.end.style.opacity = e;
      el.end.style.transform = `translateY(${(1 - e) * 30}px)`;
      el.end.style.pointerEvents = e > 0.5 ? 'auto' : 'none';

      el.bar.style.transform = `scaleX(${p})`;

      if (Math.abs(tx - mx) > 0.001 || Math.abs(ty - my) > 0.001) schedule();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onPointer = (ev) => {
      if (ev.pointerType !== 'mouse') return;
      tx = (ev.clientX / window.innerWidth) * 2 - 1;
      ty = (ev.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  const set = (key) => (node) => {
    r.current[key] = node;
  };
  r.current.chips = r.current.chips || [];

  return (
    <section className="intro" ref={sec} aria-label="Төгөл Апартмент">
      <div className="intro-stage">
        <div className="intro-word" ref={set('word')} aria-hidden="true">ТӨГӨЛ</div>
        <div className="intro-3d" ref={set('scene')}>
          <div className="intro-card" ref={set('card')}>
            <img src="/img/hero.jpg" alt="Төгөл Апартмент барилгын гадна төрх" fetchPriority="high" />
          </div>
          {chips.map((c, i) => (
            <div className="chip" key={c.big} ref={(n) => { r.current.chips[i] = n; }} aria-hidden="true">
              <b>{c.big}</b>{c.small}
            </div>
          ))}
        </div>
        <div className="intro-flash" ref={set('flash')} />
        <div className="intro-room" ref={set('room')}>
          <img src="/img/plan-c-56.jpg" alt="" />
        </div>
        <div className="intro-title" ref={set('title')}>
          <span className="eyebrow">Өвөрхангай аймаг · Арвайхээр</span>
          <h1>Төгөл Апартмент</h1>
          <p>Гүйлгээд дотогш нь ороорой</p>
        </div>
        <div className="intro-end" ref={set('end')}>
          <span className="eyebrow">Таны шинэ гэр</span>
          <h2>Тав тухтай <em>шинэ гэр</em> таныг хүлээж байна</h2>
          <a className="btn btn-gold" href="#plans">Байрнууд үзэх<Icon id="i-arrow" /></a>
        </div>
        <div className="scroll-cue" ref={set('cue')} aria-hidden="true"><span /></div>
        <div className="intro-bar" aria-hidden="true"><i ref={set('bar')} /></div>
      </div>
    </section>
  );
}
