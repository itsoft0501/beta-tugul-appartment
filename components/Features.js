import { Icon } from './Icons';

const items = [
  ['i-pin', 'Тав тухтай байршил', 'Сургууль, үйлчилгээний газрууд ойрхон'],
  ['i-shield', 'Өндөр чанар', 'Бүрэн цутгамал барилга, орчин үеийн шийдэл'],
  ['i-tree', 'Орчны тохижилт', 'Тав тухтай амьдрах бүрэн боломж'],
  ['i-wallet', 'Уян хатан төлбөр', 'Урьдчилгаа 30%, бартер боломжтой'],
];

export default function Features() {
  return (
    <section className="features" aria-label="Давуу талууд">
      <div className="wrap">
        <div className="feat-grid reveal">
          {items.map(([icon, title, text]) => (
            <div className="feat" key={title}>
              <span className="feat-ic"><Icon id={icon} className={undefined} /></span>
              <div><b>{title}</b><span>{text}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
