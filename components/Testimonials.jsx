'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

const reviews = [
  {
    text: "I've been to barbershops across London and nothing comes close. The attention to detail, the atmosphere, the actual quality of the cut — Atelier Noir is in a different league entirely.",
    name: 'James Whitfield',
    role: 'Creative Director',
    seed: 'face01',
    stars: 5,
  },
  {
    text: "Walked in for a trim, left with a completely transformed look. The barber spent fifteen minutes just studying my face before picking up the scissors. That's craft.",
    name: 'Marcus Osei',
    role: 'Architect',
    seed: 'face02',
    stars: 5,
  },
  {
    text: "The hot towel shave alone is worth the trip. Genuinely feels like a luxury spa experience. I block out two hours and savour every minute. Worth every penny.",
    name: 'Daniel Hartley',
    role: 'Finance Director',
    seed: 'face03',
    stars: 5,
  },
  {
    text: "As someone who's incredibly particular about my beard, finding Atelier Noir was a revelation. First barber I've trusted completely. Monthly visits, no exceptions.",
    name: 'Ravi Patel',
    role: 'Tech Entrepreneur',
    seed: 'face04',
    stars: 5,
  },
  {
    text: "The colour consultation alone saved me from a terrible decision. They talked me through what actually suits my complexion. Results are extraordinary.",
    name: 'Tom Ashworth',
    role: 'Brand Strategist',
    seed: 'face05',
    stars: 5,
  },
];

function Stars({ count }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#C4963F', fontSize: '0.8rem' }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX   = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onDown = (e) => {
      isDragging.current = true;
      startX.current = (e.pageX || e.touches[0].pageX) - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const onUp = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
    };
    const onMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = (e.pageX || e.touches[0].pageX) - el.offsetLeft;
      el.scrollLeft = scrollLeft.current - (x - startX.current);
    };

    el.addEventListener('mousedown',  onDown);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('mouseup',    onUp);
    el.addEventListener('touchend',   onUp);
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('touchmove',  onMove, { passive: false });
    window.addEventListener('mouseup', onUp);

    return () => {
      el.removeEventListener('mousedown',  onDown);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('mouseup',    onUp);
      el.removeEventListener('touchend',   onUp);
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('touchmove',  onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <section className="section testimonials" id="testimonials">
      <div className="section-header">
        <span className="section-num">04 — Testimonials</span>
        <h2 className="section-title">Client <em>Stories</em></h2>
        <p className="section-subtitle">
          Drag to explore. Over 400 five-star reviews across Google and Trustpilot.
        </p>
        <div className="section-divider" />
      </div>

      <div
        ref={trackRef}
        className="testimonials-track"
        style={{
          overflowX: 'auto',
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '4px',
          scrollSnapType: 'x mandatory',
        }}
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            className="testimonial-card"
            style={{ scrollSnapAlign: 'start' }}
          >
            <Stars count={r.stars} />
            <p className="testimonial-text">"{r.text}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                <Image
                  src={`https://picsum.photos/seed/${r.seed}/88/88`}
                  alt={r.name}
                  width={44} height={44}
                  unoptimized
                />
              </div>
              <div>
                <div className="testimonial-name">{r.name}</div>
                <div className="testimonial-role">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rating badges */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '40px',
        marginTop: '52px', paddingTop: '40px',
        borderTop: '1px solid var(--border)',
        maxWidth: '700px', margin: '52px auto 0',
      }}>
        {[
          { platform: 'Google Reviews', score: '4.9', count: '312 reviews' },
          { platform: 'Trustpilot',     score: '4.8', count: '189 reviews' },
          { platform: 'Treatwell',      score: '5.0', count: '97 reviews'  },
        ].map((b) => (
          <div key={b.platform} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.4rem', fontWeight: 300, color: '#E2B96A', lineHeight: 1,
            }}>
              {b.score}
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4963F', margin: '6px 0 4px' }}>
              {b.platform}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8A7A64' }}>{b.count}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
