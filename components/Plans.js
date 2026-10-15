'use client';

import { useRef, useState } from 'react';
import { Icon } from './Icons';
import { Zoomable } from './Lightbox';
import { PHONE, PHONE2, plans } from '@/data/plans';

const filters = [
  ['all', 'Бүгд'],
  ['1', '1 унтлагын'],
  ['2', '2 унтлагын'],
];

export default function Plans() {
  const [filter, setFilter] = useState('all');
  const [current, setCurrent] = useState(0);
  const viewer = useRef(null);

  const visible = plans
    .map((p, i) => ({ ...p, i }))
    .filter((p) => filter === 'all' || String(p.br) === filter);

  const pickFilter = (f) => {
    setFilter(f);
    const next = plans.map((p, i) => ({ ...p, i })).filter((p) => f === 'all' || String(p.br) === f);
    if (!next.some((p) => p.i === current)) setCurrent(next[0].i);
  };

  const pickUnit = (i) => {
    setCurrent(i);
    if (window.innerWidth <= 860) viewer.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const p = plans[current];
  const max = Math.max(...p.rooms.map((r) => +r[1]));

  return (
    <section id="plans">
      <div className="wrap">
        <div className="sec-head">
          <div className="reveal"><span className="eyebrow">Байрны төрөл</span><h2>Таны амьдралд <em>тохирсон сууц</em></h2></div>
          <div className="filters reveal d1" role="tablist" aria-label="Унтлагын өрөөний тоогоор шүүх">
            {filters.map(([f, text]) => (
              <button key={f} className={`filter${filter === f ? ' active' : ''}`} role="tab" aria-selected={filter === f} onClick={() => pickFilter(f)}>
                {text}
              </button>
            ))}
          </div>
        </div>
        <div className="config reveal">
          <div className="unit-list" aria-label="Сууцны төрлүүд">
            {visible.map((u) => (
              <button key={u.i} className={`unit${u.i === current ? ' active' : ''}`} aria-pressed={u.i === current} onClick={() => pickUnit(u.i)}>
                <span className="ul">{u.k}</span>
                <span><b>{u.k} сууц</b><small>{u.br} унтлагын өрөө</small></span>
                <span className="ua">{u.area}<sub> м²</sub></span>
              </button>
            ))}
          </div>
          <div className="viewer" ref={viewer} aria-live="polite">
            <Zoomable className="v-img" src={`/img/${p.img}`} label={`${p.k} сууцны зургийг томруулах`} key={`img-${current}`}>
              <img src={`/img/${p.img}`} alt={`${p.k} сууц, ${p.area} м² төлөвлөлт`} />
              <span className="zoom-hint"><Icon id="i-zoom" style={{ width: 15, height: 15 }} />Томруулж үзэх</span>
            </Zoomable>
            <div className="v-body fade-swap" key={`body-${current}`}>
              <div className="v-top">
                <div><h3>{p.k} сууц</h3><span className="tag">{p.br} унтлагын өрөө</span></div>
                <div className="v-area"><b>{p.area}</b><span>нийт м²</span></div>
              </div>
              <ul className="bars">
                {p.rooms.map(([name, area], j) => (
                  <li key={j}>
                    <span>{name}</span>
                    <b>{area} м²</b>
                    <i style={{ '--w': `${((area / max) * 100).toFixed(1)}%` }} />
                  </li>
                ))}
              </ul>
              <div className="v-cta">
                <a className="btn btn-primary" href={`tel:${PHONE}`} aria-label={`${p.k} сууц ${p.area} м² захиалах: ${PHONE}`}><Icon id="i-phone" />Энэ сууцыг захиалах</a>
                <a className="btn btn-ghost" href={`tel:${PHONE2}`}>9589 7513</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
