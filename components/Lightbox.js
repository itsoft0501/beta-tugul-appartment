'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { plans } from '@/data/plans';

const images = [
  '/img/promo-50.jpg',
  '/img/promo-30.jpg',
  '/img/location.jpg',
  ...plans.map((p) => `/img/${p.img}`),
];

const LightboxContext = createContext(() => {});

export function LightboxProvider({ children }) {
  const [idx, setIdx] = useState(-1);
  const isOpen = idx >= 0;

  const open = useCallback((src) => setIdx(Math.max(0, images.indexOf(src))), []);
  const close = () => setIdx(-1);
  const go = (d) => setIdx((i) => (i + d + images.length) % images.length);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setIdx(-1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <div
        className={`lb${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Зураг томруулж харах"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {isOpen && <img src={images[idx]} alt="" />}
        <button className="lb-btn lb-close" aria-label="Хаах" onClick={close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <button className="lb-btn lb-prev" aria-label="Өмнөх" onClick={() => go(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button className="lb-btn lb-next" aria-label="Дараах" onClick={() => go(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <div className="lb-count">{isOpen ? `${idx + 1} / ${images.length}` : ''}</div>
      </div>
    </LightboxContext.Provider>
  );
}

export const useLightbox = () => useContext(LightboxContext);

// Clickable/keyboard-focusable wrapper that opens `src` in the lightbox.
export function Zoomable({ as: Tag = 'div', src, label = 'Зургийг томруулах', className, children }) {
  const open = useLightbox();
  return (
    <Tag
      className={className}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={() => open(src)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(src);
        }
      }}
    >
      {children}
    </Tag>
  );
}
