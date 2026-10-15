import { Icon } from './Icons';
import { Zoomable } from './Lightbox';
import { MAP_URL } from '@/data/plans';

const places = [
  ['300', 'м', 'Мэргэд сургууль'],
  ['800', 'м', 'Арвайхээр сумын Нутгийн удирдлагын ордон'],
  ['1', 'км', 'Арвайхээр сумын Политехник коллеж'],
];

// Schematic (not to-scale street map) of the three landmarks around the building; 1 км ≈ 170 units.
const rings = [
  [51, '300 м'],
  [136, '800 м'],
  [170, '1 км'],
];
const points = [
  { x: 273, y: 176, d: 'M240 215Q262 204 273 176', name: 'Мэргэд сургууль', dist: '300 м', lx: 284, ly: 168, anchor: 'start' },
  { x: 112, y: 168, d: 'M240 215Q178 214 112 168', name: 'Удирдлагын ордон', dist: '800 м', lx: 112, ly: 142, anchor: 'middle' },
  { x: 349, y: 345, d: 'M240 215Q322 258 349 345', name: 'Политехник коллеж', dist: '1 км', lx: 349, ly: 372, anchor: 'middle' },
];

function LocationMap() {
  return (
    <div className="loc-map reveal">
      <svg viewBox="0 0 480 420" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Төгөл Апартмент болон ойролцоох байгууллагуудын схем">
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path className="grid" d="M40 0H0V40" fill="none" />
          </pattern>
        </defs>
        <rect x="-480" y="-240" width="1440" height="900" fill="url(#map-grid)" />
        <path className="road" d="M-480 150C120 140 300 80 960 132" />
        <path className="road" d="M0 660C120 300 210 250 360 -240" />
        <path className="road" d="M-480 290C150 282 330 336 960 284" />
        {rings.map(([r, label]) => (
          <g key={r}>
            <circle className="ring" cx="240" cy="215" r={r} />
            <text className="ring-lbl" x="240" y={215 - r - 6} textAnchor="middle">{label}</text>
          </g>
        ))}
        {points.map((p, i) => (
          <path key={p.name} className="route" d={p.d} pathLength="1" style={{ transitionDelay: `${0.3 + i * 0.35}s` }} />
        ))}
        {points.map((p, i) => (
          <g key={p.name}>
            <circle className="pt-pulse" cx={p.x} cy={p.y} r="6" style={{ animationDelay: `${i * 0.6}s` }} />
            <circle className="pt" cx={p.x} cy={p.y} r="6" />
            <text className="pt-lbl" x={p.lx} y={p.ly} textAnchor={p.anchor}>{p.name}</text>
            <text className="pt-sub" x={p.lx} y={p.ly + 15} textAnchor={p.anchor}>{p.dist}</text>
          </g>
        ))}
        <circle className="pt-pulse" cx="240" cy="215" r="22" />
        <circle className="home" cx="240" cy="215" r="22" />
        <path className="home-ic" d="M230 218l10-9 10 9v10h-20z M237 228v-6h6v6" />
      </svg>
      <span className="legend">● Төгөл Апартмент</span>
    </div>
  );
}

export default function Location() {
  return (
    <section id="location" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="reveal"><span className="eyebrow">Байршил</span><h2>Арвайхээр сумын <em>А бүс</em></h2></div>
          <p className="reveal d1">Бүх төрлийн үйлчилгээ, боловсрол, засаг захиргааны байгууллагуудтай ойрхон байрлалтай.</p>
        </div>
        <Zoomable className="loc-hero reveal" src="/img/location.jpg" label="Байршлын зургийг томруулах">
          <img src="/img/location.jpg" alt="Төгөл Апартмент байршил, Арвайхээр" loading="lazy" />
        </Zoomable>
        <div className="loc-split">
          <LocationMap />
          <div className="loc-side">
            <div className="loc addr reveal">
              <div><small>Хаяг</small><p>Өвөрхангай аймаг, Арвайхээр сум, А бүс</p></div>
              <a className="btn btn-primary" href={MAP_URL} target="_blank" rel="noopener"><Icon id="i-pin" />Газрын зураг</a>
            </div>
            <div className="loc-trio">
              {places.map(([n, unit, name], i) => (
                <div className={`loc reveal d${i + 1}`} key={name}>
                  <div className="dist">{n}<small>{unit}</small></div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
