'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function useCountUp(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

export default function About() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const clients = useCountUp(3200, 1800, active);
  const years   = useCountUp(6,    1200, active);
  const awards  = useCountUp(14,   1500, active);

  return (
    <section className="section philosophy" id="about" ref={sectionRef}>
      <div className="philosophy-inner">

        {/* Visual */}
        <div className="philosophy-visual">
          <Image
            src="https://picsum.photos/seed/barber42/640/800"
            alt="Atelier Noir barbershop interior"
            width={640} height={800}
            className="philosophy-img"
            unoptimized
          />
          <div className="philosophy-frame" />
          <div className="philosophy-badge">
            <span className="badge-num">6+</span>
            <span className="badge-txt">Years of<br/>Craft</span>
          </div>
        </div>

        {/* Text */}
        <div className="philosophy-text">
          <span className="eyebrow">02 — Our Philosophy</span>
          <h2 className="headline">
            More than a cut.<br />
            <em>A ritual.</em>
          </h2>
          <p className="body-text">
            Founded in the heart of Shoreditch, Atelier Noir was born from a belief that the barbershop should be a sanctuary — a place where time slows, craft is honoured, and every client leaves not just groomed, but genuinely transformed.
          </p>
          <p className="body-text">
            Our barbers are not stylists following trends. They are artisans reading faces, understanding character, and applying technique that has been refined across thousands of appointments. We work with natural hair texture, bone structure, and personal style — never against them.
          </p>

          <div style={{ marginTop: '36px' }}>
            <a href="#booking" className="btn-primary"><span>Meet Our Team</span></a>
          </div>

          <div className="philosophy-stats">
            <div className="stat-item">
              <div className="stat-num">{clients.toLocaleString()}</div>
              <div className="stat-label">Clients Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{years}</div>
              <div className="stat-label">Years Trading</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{awards}</div>
              <div className="stat-label">Industry Awards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
