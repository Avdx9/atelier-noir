'use client';
import { useEffect, useRef } from 'react';

export default function Booking() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('booking-visible');
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section booking" id="booking" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="booking-orb" />

      {/* Outer orbit ring */}
      <div className="booking-ring" style={{ width: 520, height: 520, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <svg width="520" height="520" viewBox="0 0 520 520" style={{ display: 'block' }}>
          <circle cx="260" cy="260" r="255" fill="none" stroke="rgba(196,150,63,0.12)" strokeWidth="1" />
          <circle cx="260" cy="260" r="255" fill="none" stroke="rgba(196,150,63,0.25)" strokeWidth="0.6"
            strokeDasharray="18 22" strokeLinecap="round" />
          {/* Orbital nodes */}
          {[0, 72, 144, 216, 288].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 260 + 255 * Math.cos(rad);
            const y = 260 + 255 * Math.sin(rad);
            return (
              <g key={deg}>
                <circle cx={x} cy={y} r="3.5" fill="#C4963F" opacity="0.7" />
                <circle cx={x} cy={y} r="7" fill="none" stroke="#C4963F" strokeWidth="0.5" opacity="0.3" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Inner orbit ring */}
      <div className="booking-ring booking-ring-2" style={{ width: 340, height: 340, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <svg width="340" height="340" viewBox="0 0 340 340" style={{ display: 'block' }}>
          <circle cx="170" cy="170" r="165" fill="none" stroke="rgba(196,150,63,0.08)" strokeWidth="1" />
          <circle cx="170" cy="170" r="165" fill="none" stroke="rgba(196,150,63,0.18)" strokeWidth="0.5"
            strokeDasharray="6 14" strokeLinecap="round" />
          {[45, 135, 225, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 170 + 165 * Math.cos(rad);
            const y = 170 + 165 * Math.sin(rad);
            return <circle key={deg} cx={x} cy={y} r="2" fill="#E8C97D" opacity="0.5" />;
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="booking-content">
        <span className="booking-eyebrow">05 — Reservations</span>
        <h2 className="booking-title">
          Reserve Your<br />
          <em>Chair</em>
        </h2>
        <p className="booking-sub">
          No walk-ins. Every appointment is a private experience.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://fresha.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ minWidth: '200px', textAlign: 'center' }}
          >
            <span>Book Online</span>
          </a>
          <a
            href="tel:+442071234567"
            className="btn-ghost"
            style={{ minWidth: '200px', textAlign: 'center' }}
          >
            Call to Book
          </a>
        </div>

        <div className="booking-details">
          {[
            { label: 'Address',      value: '14 Redchurch Street, Shoreditch, E2 7DP' },
            { label: 'Hours',        value: 'Mon–Sat  9:00 am – 8:00 pm' },
            { label: 'Phone',        value: '+44 (0)20 7123 4567' },
            { label: 'Bookings',     value: 'Online or by phone' },
          ].map((d) => (
            <div key={d.label} className="booking-detail">
              <div className="label">{d.label}</div>
              <div className="value">{d.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
