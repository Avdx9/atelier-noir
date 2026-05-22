'use client';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">Atelier <span>Noir</span></div>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#booking" className="nav-cta">Book Now</a>
        <div className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(6,6,6,0.97)',
          zIndex: 99, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '40px',
        }}>
          {['Services', 'About', 'Gallery', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '3rem', fontWeight: 300, color: '#F0E6D0',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '20px', fontSize: '0.65rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#C4963F',
              border: '1px solid #C4963F', padding: '14px 36px',
            }}
          >
            Book Now
          </a>
        </div>
      )}
    </>
  );
}
