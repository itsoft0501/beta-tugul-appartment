import { Icon } from './Icons';
import { Zoomable } from './Lightbox';

export default function Why() {
  return (
    <section id="why">
      <div className="wrap">
        <div className="sec-head">
          <div className="reveal"><span className="eyebrow">Захиалга авч байна</span><h2>50 айлын шинэ орон сууцандаа <em>захиалга авч байна</em></h2></div>
          <p className="reveal d1">Тав тухтай байршил, өндөр чанар, орчны тохижилт, төлбөрийн уян хатан нөхцөл — бүгд нэг дор.</p>
        </div>
        <div className="offer-grid">
          <Zoomable as="figure" className="shot reveal" src="/img/promo-50.jpg">
            <img src="/img/promo-50.jpg" alt="Тун удахгүй ашиглалтад орох 50 айлын орон сууц" loading="lazy" />
            <span className="zoom-dot"><Icon id="i-zoom" /></span>
          </Zoomable>
          <div className="offer-col">
            <div className="offer-card reveal d1">
              <div className="offer-num">30%</div>
              <div>
                <h3>Урьдчилгаа төлбөр</h3>
                <p>Төлбөрийн уян хатан нөхцөлтэй. Бартер оролцуулах боломжтой.</p>
                <div className="pills"><span className="pill">1 ба 2 өрөө</span><span className="pill">46–79 м²</span><span className="pill">А бүс</span></div>
              </div>
            </div>
            <Zoomable as="figure" className="shot reveal d2" src="/img/promo-30.jpg">
              <img src="/img/promo-30.jpg" alt="Урьдчилгаа 30%, бартер оролцуулах боломжтой" loading="lazy" />
              <span className="zoom-dot"><Icon id="i-zoom" /></span>
            </Zoomable>
          </div>
        </div>
      </div>
    </section>
  );
}
