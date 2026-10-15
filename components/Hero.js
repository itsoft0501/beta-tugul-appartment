import { Icon } from './Icons';
import { Zoomable } from './Lightbox';
import { PHONE } from '@/data/plans';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="blob b1" aria-hidden="true" />
      <div className="blob b2" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow reveal in">Өвөрхангай аймаг · Арвайхээр</span>
          <h1>
            <span className="line"><span>Арвайхээрт</span></span>
            <span className="line"><span><em>тав тухтай</em></span></span>
            <span className="line"><span>шинэ гэр</span></span>
          </h1>
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
        <div className="hero-visual">
          <div className="hv-main">
            <div className="px" data-parallax="0.08">
              <img src="/img/hero.jpg" alt="Төгөл Апартмент барилгын гадна төрх" fetchPriority="high" />
            </div>
          </div>
          <a className="hv-ring" href="#plans" aria-label="Байрнууд үзэх">
            <svg className="ring-text" viewBox="0 0 100 100" aria-hidden="true">
              <defs><path id="ring-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <text><textPath href="#ring-path" textLength="236" lengthAdjust="spacing">ТӨГӨЛ АПАРТМЕНТ • АРВАЙХЭЭР • </textPath></text>
            </svg>
            <Icon id="i-arrow" />
          </a>
          <Zoomable className="hv-card hv-plan" src="/img/plan-a-52.jpg" label="A сууцны зургийг томруулах">
            <img src="/img/plan-a-52.jpg" alt="" />
            <div><b>A сууц · 52.50 м²</b><span>1 унтлагын өрөө</span></div>
          </Zoomable>
          <div className="hv-card hv-badge">
            <span className="dot" />
            <div><b>Захиалга авч байна</b><span>9992 8898</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
