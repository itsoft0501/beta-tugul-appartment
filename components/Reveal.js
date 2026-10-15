'use client';

import { useEffect } from 'react';

function countUp(el) {
  const to = +el.dataset.to;
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
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((x) => {
          if (!x.isIntersecting) return;
          x.target.classList.add('in');
          x.target.querySelectorAll('.count').forEach(countUp);
          io.unobserve(x.target);
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Gentle parallax for [data-parallax="<speed>"]: offset grows with distance from the viewport centre.
    const layers = [...document.querySelectorAll('[data-parallax]')];
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mid = window.innerHeight / 2;
        layers.forEach((el) => {
          const box = el.parentElement.getBoundingClientRect();
          const off = (box.top + box.height / 2 - mid) * -el.dataset.parallax;
          el.style.transform = `translate3d(0, ${off}px, 0)`;
        });
      });
    };
    if (layers.length) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
