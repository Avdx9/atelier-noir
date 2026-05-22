'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const shots = [
  { seed: 'barber01', label: 'Classic Fade'      },
  { seed: 'barber02', label: 'Beard Sculpt'      },
  { seed: 'barber03', label: 'Texture Cut'       },
  { seed: 'barber04', label: 'Colour & Tone'     },
  { seed: 'barber05', label: 'Hot Towel Shave'   },
  { seed: 'barber06', label: 'Shape & Define'    },
  { seed: 'barber07', label: 'Skin Fade'         },
  { seed: 'barber08', label: 'The Full Service'  },
];

export default function Gallery() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity    = '1';
            e.target.style.transform  = 'translateY(0)';
          }
        });
      },
      { threshold: 0.12 }
    );
    itemRefs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section gallery" id="gallery">
      <div className="section-header">
        <span className="section-num">03 — Portfolio</span>
        <h2 className="section-title">The <em>Work</em></h2>
        <p className="section-subtitle">
          Every chair tells a story. Every cut, a statement of character.
        </p>
        <div className="section-divider" />
      </div>

      <div className="gallery-grid">
        {shots.map((shot, i) => (
          <div
            key={shot.seed}
            className="gallery-item"
            ref={(el) => (itemRefs.current[i] = el)}
            style={{
              opacity: 0,
              transform: 'translateY(28px)',
              transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
            }}
          >
            <Image
              src={`https://picsum.photos/seed/${shot.seed}/800/600`}
              alt={shot.label}
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
            <div className="gallery-item-overlay" />
            <div className="gallery-item-label">{shot.label}</div>
          </div>
        ))}
      </div>

      <div className="gallery-footer">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          style={{ display: 'inline-block' }}
        >
          View Full Portfolio → @ateliernoir
        </a>
      </div>
    </section>
  );
}
