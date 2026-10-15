import { Logo } from './Header';
import { PHONE, PHONE2 } from '@/data/plans';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <Logo label="Дээш буцах" />
        <span>© Төгөл Апартмент · Арвайхээр, Өвөрхангай</span>
        <span><a href={`tel:${PHONE}`}>{PHONE}</a> · <a href={`tel:${PHONE2}`}>{PHONE2}</a></span>
      </div>
    </footer>
  );
}
