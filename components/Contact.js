import { Icon } from './Icons';
import { PHONE, PHONE2 } from '@/data/plans';

export default function Contact() {
  return (
    <section id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="final reveal">
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
