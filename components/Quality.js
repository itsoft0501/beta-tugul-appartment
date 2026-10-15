const items = [
  {
    title: 'Бүрэн цутгамал бүтээц',
    text: 'Газар хөдлөлтөд хамгийн тэсвэртэй, бат бэх нэг цул бүтэц. Дуу чимээ болон дулаан алдагдлыг дээд цэгт нь бууруулна.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M3 21h18M5 21V8l7-5 7 5v13" /><path d="M9 21v-6h6v6M9 10h.01M15 10h.01" /></svg>
    ),
  },
  {
    title: '3 давхар шилтэй, вакуум цонх',
    text: 'Шил хоорондын аргон хий болон Low-E бүрхүүл нь өвөлдөө дулааныг хадгалж, зундаа халуун агаарыг оруулдаггүй. Хотын дуу шуугианаас бүрэн тусгаарлана.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M12 3v18M4 12h16" /></svg>
    ),
  },
  {
    title: 'Дулаалгын ухаалаг шийдэл',
    text: 'Хана дангаараа биш, материалын чанар болон угсралтын зөв технологи (дулааны гүүргүй шийдэл) нь таны гэрийг жилийн дөрвөн улиралд тухтай байлгана.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
    ),
  },
];

export default function Quality() {
  return (
    <section id="quality" className="quality">
      <div className="wrap">
        <div className="sec-head">
          <div className="reveal"><span className="eyebrow">Барилгын чанар</span><h2>Орон сууц авахад зөвхөн өнгө үзэмж чухал гэж үү?</h2></div>
          <p className="reveal d1">Таны болон таны гэр бүлийн аюулгүй байдал, тав тухтай амьдрах баталгаа нь барилгын чанар юм.</p>
        </div>
        <div className="q-grid">
          {items.map((q, i) => (
            <article className={`q reveal${i ? ` d${i}` : ''}`} key={q.title}>
              <span className="q-n">0{i + 1}</span>
              <span className="q-ic">{q.icon}</span>
              <h3>{q.title}</h3>
              <p>{q.text}</p>
            </article>
          ))}
        </div>
        <div className="quote reveal">
          <span className="qm" aria-hidden="true">“</span>
          <div>
            <b>Бид ихэнхдээ орон сууц сонгохдоо дотоод зохион байгуулалт, гадна тохижилтыг чухалчилдаг.</b>
            <p>«Төгөл апартмент» нь оршин суугчдадаа чанарын дээдийг амлахын тулд дээрх инженерчлэлийн шийдлүүдийг цогцлоолоо.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
