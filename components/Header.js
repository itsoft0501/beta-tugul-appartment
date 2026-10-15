'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icons';
import { PHONE } from '@/data/plans';

const links = [
  ['#why', 'Давуу тал'],
  ['#quality', 'Чанар'],
  ['#plans', 'Байрны төрөл'],
  ['#location', 'Байршил'],
  ['#contact', 'Холбоо барих'],
];

export function Logo({ label }) {
  return (
    <a href="#top" className="logo" aria-label={label}>
      <span className="logo-name">Төгөл</span>
      <span className="logo-sub">АПАРТМЕНТ</span>
    </a>
  );
}

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <header className={solid ? 'solid' : undefined}>
      <div className="wrap nav">
        <Logo label="Төгөл Апартмент — нүүр" />
        <nav aria-label="Үндсэн цэс">
          <ul className="menu" id="menu" onClick={(e) => e.target.closest('a') && setOpen(false)}>
            {links.map(([href, text]) => (
              <li key={href}><a href={href}>{text}</a></li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-primary nav-cta" href={`tel:${PHONE}`}><Icon id="i-phone" />9992 8898</a>
        <button
          className="burger"
          aria-label="Цэс нээх"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
        </button>
      </div>
    </header>
  );
}
