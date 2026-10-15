import { Icon } from './Icons';
import { PHONE, PHONE2 } from '@/data/plans';

// Line drawing of the building that traces itself in when the panel scrolls into view.
function BuildingSketch() {
  return (
    <svg className="final-draw" viewBox="0 0 200 330" aria-hidden="true">
      <path pathLength="1" d="M40 330V40h120v290" />
      <path pathLength="1" d="M30 40h140M50 26h100v14" />
      <path pathLength="1" d="M40 70h120M40 100h120M40 130h120M40 160h120M40 190h120M40 220h120M40 250h120M40 280h120" />
      <path pathLength="1" d="M80 40v240M120 40v240" />
      <path pathLength="1" d="M86 330v-34h28v34" />
      <path pathLength="1" d="M0 330h200" />
      <path pathLength="1" d="M18 330v-28c-12 0-12-26 0-36 12 10 12 36 0 36M182 330v-28c-12 0-12-26 0-36 12 10 12 36 0 36" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="final reveal">
          <BuildingSketch />
          <div>
            <span className="eyebrow">Холбоо барих</span>
            <h2>Шинэ гэрээ өнөөдөр сонгоорой</h2>
            <p>Тун удахгүй ашиглалтад орох 50 айлын орон сууцандаа захиалга авч байна. Залгаад дэлгэрэнгүй мэдээлэл аваарай.</p>
          </div>
          <div className="phones">
            <a className="phone" href={`tel:${PHONE}`}><span className="pi"><Icon id="i-phone" /></span><span><small>Борлуулалт</small><b>9992 8898</b></span></a>
            <a className="phone" href={`tel:${PHONE2}`}><span className="pi"><Icon id="i-phone" /></span><span><small>Нэмэлт утас</small><b>9589 7513</b></span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
