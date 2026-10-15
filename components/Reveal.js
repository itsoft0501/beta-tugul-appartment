'use client';

import { useEffect } from 'react';

function countUp(el, reduce) {
  const to = +el.dataset.to;
  if (reduce) {
    el.textContent = to;
    return;
  }
  const t0 = performance.now();
  const d = 1400;
  const step = (t) => {
    const k = Math.min(1, (t - t0) / d);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Fades `.reveal` blocks in as they scroll into view and runs `.count` number animations.
export default function Reveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((x) => {
          if (!x.isIntersecting) return;
          x.target.classList.add('in');
          x.target.querySelectorAll('.count').forEach((el) => countUp(el, reduce));
          io.unobserve(x.target);
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Gentle scroll parallax for [data-parallax="<speed>"] elements.
    const layers = reduce ? [] : [...document.querySelectorAll('[data-parallax]')];
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        layers.forEach((el) => {
          el.style.transform = `translate3d(0, ${window.scrollY * +el.dataset.parallax}px, 0)`;
        });
      });
    };
    if (layers.length) window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
