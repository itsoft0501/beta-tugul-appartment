import { Icon } from './Icons';
import { PHONE } from '@/data/plans';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow reveal in">Өвөрхангай аймаг · Арвайхээр</span>
          <h1 className="reveal in d1">Арвайхээрт <em>тав тухтай</em> шинэ гэр</h1>
          <p className="lead reveal in d2"><b>Төгөл Апартмент</b> — тун удахгүй ашиглалтад орох 50 айлын шинэ орон сууц. Урьдчилгаа 30%, бартер оролцуулах боломжтой.</p>
          <div className="cta reveal in d2">
            <a className="btn btn-primary" href={`tel:${PHONE}`}><Icon id="i-phone" />Захиалга өгөх</a>
            <a className="btn btn-ghost" href="#plans">Байрнууд үзэх<Icon id="i-arrow" /></a>
          </div>
          <dl className="hero-stats reveal in d3">
            <div><dt><span className="count" data-to="50">50</span></dt><dd>айлын орон сууц</dd></div>
            <div><dt><span className="count" data-to="30">30</span>%</dt><dd>урьдчилгаа</dd></div>
            <div><dt>46–79</dt><dd>м² талбай</dd></div>
          </dl>
        </div>
        <div className="hero-media reveal in d1">
          <img src="/img/hero.jpg" alt="Төгөл Апартмент барилгын гадна төрх" fetchPriority="high" />
          <div className="hero-badge">
            <span className="dot" />
            <div><b>Захиалга авч байна</b><span>Борлуулалт: 9992 8898</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
