'use client';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export default function Hero() {
  return (
    <>
      <div className="hero-canvas-wrap">
        <HeroCanvas />
      </div>

      <section className="hero" id="hero">
        {/* Radial vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(6,6,6,0.5) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom gradient fade into next section */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '200px', zIndex: 1,
          background: 'linear-gradient(to top, #060606, transparent)',
          pointerEvents: 'none',
        }} />

        <div className="hero-content">
          <div className="hero-eyebrow">London · Est. 2018</div>
          <h1 className="hero-title">
            Atelier
            <em>Noir</em>
          </h1>
          <p className="hero-sub">Where Craft Meets Character</p>

          <div className="hero-actions">
            <a href="#booking" className="btn-primary"><span>Book Your Visit</span></a>
            <a href="#services" className="btn-ghost">Explore Services</a>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-txt">Scroll</span>
        </div>
      </section>
    </>
  );
}
