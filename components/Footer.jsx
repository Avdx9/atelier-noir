'use client';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const canvasRef = useRef(null);

  /* Tiny ambient particle canvas in footer */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));

    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,150,63,${p.a})`;
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onResize); };
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      {/* Ambient particles */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', opacity: 0.5,
        }}
      />

      <div className="footer-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <div className="logo">Atelier <span>Noir</span></div>
            <p className="tagline">
              A sanctuary of craft in the heart of London. Where every client leaves not merely groomed, but transformed.
            </p>
            <div className="footer-social">
              {[
                { label: 'IG', href: 'https://instagram.com' },
                { label: 'FB', href: 'https://facebook.com'  },
                { label: 'TT', href: 'https://tiktok.com'    },
                { label: 'YT', href: 'https://youtube.com'   },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <div className="col-title">Services</div>
            <ul>
              {['The Classic Cut', 'Beard Sculpt', "Gentleman's Full", 'Colour & Toning', 'Hot Towel Shave', 'Scalp Treatment'].map((s) => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div className="footer-col">
            <div className="col-title">Studio</div>
            <ul>
              {['Our Story', 'The Team', 'Gift Cards', 'Memberships', 'Press', 'Careers'].map((s) => (
                <li key={s}><a href="#about">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="footer-col">
            <div className="col-title">Visit Us</div>
            <p className="address">
              14 Redchurch Street<br />
              Shoreditch<br />
              London, E2 7DP<br />
              United Kingdom
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="tel:+442071234567" style={{ fontSize: '0.78rem', color: 'var(--cream-mid)', transition: 'color 0.3s' }}>
                +44 (0)20 7123 4567
              </a>
              <a href="mailto:hello@ateliernoir.co.uk" style={{ fontSize: '0.78rem', color: 'var(--cream-mid)', transition: 'color 0.3s' }}>
                hello@ateliernoir.co.uk
              </a>
            </div>
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '6px' }}>
                Hours
              </div>
              {[
                { day: 'Mon – Fri', time: '9:00 – 20:00' },
                { day: 'Saturday',  time: '9:00 – 18:00' },
                { day: 'Sunday',    time: 'Closed'        },
              ].map((h) => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--cream-dim)', marginBottom: '4px' }}>
                  <span>{h.day}</span>
                  <span style={{ color: h.time === 'Closed' ? 'var(--cream-dim)' : 'var(--cream-mid)' }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {year} Atelier Noir Ltd. All rights reserved. Company No. 12345678. Registered in England & Wales.
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
