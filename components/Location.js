import { Icon } from './Icons';
import { Zoomable } from './Lightbox';
import { MAP_URL } from '@/data/plans';

const places = [
  ['300', 'м', 'Мэргэд сургууль'],
  ['800', 'м', 'Арвайхээр сумын Нутгийн удирдлагын ордон'],
  ['1', 'км', 'Арвайхээр сумын Политехник коллеж'],
];

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
        <div className="loc-grid">
          <div className="loc addr reveal">
            <div><small>Хаяг</small><p>Өвөрхангай аймаг, Арвайхээр сум, А бүс</p></div>
            <a className="btn btn-gold" href={MAP_URL} target="_blank" rel="noopener"><Icon id="i-pin" />Газрын зураг</a>
          </div>
          {places.map(([n, unit, name], i) => (
            <div className={`loc reveal d${i + 1}`} key={name}>
              <div className="dist">{n}<small>{unit}</small></div>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
