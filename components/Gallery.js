import { Zoomable } from './Lightbox';
import { plans } from '@/data/plans';

const items = [
  ...plans.map((p) => ({ src: `/img/${p.img}`, title: `${p.k} сууц`, sub: `${p.area} м²` })),
  { src: '/img/promo-50.jpg', title: '50 айл', sub: 'Захиалга' },
  { src: '/img/promo-30.jpg', title: 'Урьдчилгаа', sub: '30%' },
];

// Endless, hover-pausable strip of every apartment image (the list is rendered twice for a seamless loop).
export default function Gallery() {
  return (
    <section className="ribbon" aria-label="Зургийн цомог">
      <div className="ribbon-track">
        {[0, 1].map((copy) =>
          items.map((it) => (
            <Zoomable
              as="figure"
              className="rcard"
              src={it.src}
              label={`${it.title} зургийг томруулах`}
              key={`${copy}-${it.src}`}
              aria-hidden={copy ? true : undefined}
              tabIndex={copy ? -1 : 0}
            >
              <img src={it.src} alt="" loading="lazy" />
              <figcaption>{it.title}<span>{it.sub}</span></figcaption>
            </Zoomable>
          ))
        )}
      </div>
    </section>
  );
}
