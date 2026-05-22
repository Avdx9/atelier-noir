'use client';
import { useEffect, useRef } from 'react';

const services = [
  {
    num: '01',
    icon: '✂',
    name: 'The Classic Cut',
    desc: 'A timeless haircut tailored to your face shape and lifestyle. Includes a scalp massage, hot towel finish, and style consultation.',
    price: '45',
    from: false,
    duration: '45 min',
  },
  {
    num: '02',
    icon: '🪒',
    name: 'Signature Beard Sculpt',
    desc: 'Precision beard shaping and conditioning using traditional straight-razor techniques. Defined edges, perfect symmetry.',
    price: '35',
    from: false,
    duration: '30 min',
  },
  {
    num: '03',
    icon: '👑',
    name: "The Gentleman's Full",
    desc: 'Our flagship service: bespoke haircut, beard sculpt, hot towel shave, and scalp treatment. The complete experience.',
    price: '75',
    from: false,
    duration: '90 min',
  },
  {
    num: '04',
    icon: '🎨',
    name: 'Colour & Toning',
    desc: 'Expert colour application from natural blending to bold statements. Includes grey blending, highlights, and full colour.',
    price: '95',
    from: true,
    duration: '90–120 min',
  },
  {
    num: '05',
    icon: '🔥',
    name: 'Hot Towel Shave',
    desc: 'A ritual in itself. Hot steamed towels, pre-shave oil, and a traditional straight-razor shave finished with a cold compress.',
    price: '45',
    from: false,
    duration: '40 min',
  },
  {
    num: '06',
    icon: '✨',
    name: 'Scalp Treatment',
    desc: 'Deep-cleansing scalp detox and hydration therapy. Addresses dandruff, dryness, and hair thinning at the root.',
    price: '55',
    from: false,
    duration: '50 min',
  },
];

export default function Services() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section services" id="services">
      <div className="section-header">
        <span className="section-num">01 — Services</span>
        <h2 className="section-title">
          The <em>Craft</em>
        </h2>
        <p className="section-subtitle">
          Every service is a ritual. Each client, a story. We apply decades of barbering tradition with an eye for modern precision.
        </p>
        <div className="section-divider" />
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <div
            key={s.num}
            className="service-card"
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="service-num">{s.num}</div>
            <div className="service-icon">{s.icon}</div>
            <h3 className="service-name">{s.name}</h3>
            <p className="service-desc">{s.desc}</p>
            <div className="service-footer">
              <div className="service-price">
                {s.from && <span className="from">from </span>}
                <sup>£</sup>{s.price}
              </div>
              <div className="service-dur">{s.duration}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '56px' }}>
        <a href="#booking" className="btn-primary">
          <span>Book a Service</span>
        </a>
      </div>
    </section>
  );
}
