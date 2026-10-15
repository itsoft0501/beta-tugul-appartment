'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';
import { MAP_URL, PHONE } from '@/data/plans';

export default function ScrollUI() {
  const bar = useRef(null);
  const [showCall, setShowCall] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      setShowCall(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="progress" ref={bar} />
      <div className={`callbar${showCall ? ' show' : ''}`}>
        <a className="map" href={MAP_URL} target="_blank" rel="noopener" aria-label="Газрын зураг"><Icon id="i-pin" /></a>
        <a className="call" href={`tel:${PHONE}`}><Icon id="i-phone" />Залгах · 9992 8898</a>
      </div>
    </>
  );
}
