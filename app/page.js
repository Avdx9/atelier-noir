'use client';
import { useState, useEffect } from 'react';
import Preloader    from '@/components/Preloader';
import Navigation  from '@/components/Navigation';
import Hero        from '@/components/Hero';
import Marquee     from '@/components/Marquee';
import Services    from '@/components/Services';
import About       from '@/components/About';
import Gallery     from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Booking     from '@/components/Booking';
import Footer      from '@/components/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  /* Disable scroll while preloader is active */
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      /* Smooth-scroll init via Lenis (optional progressive enhancement) */
      let lenis;
      import('@studio-freight/lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      }).catch(() => {/* Lenis optional — graceful fallback */});
      return () => { if (lenis) lenis.destroy(); };
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Page fades in smoothly after preloader */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <Navigation />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <About />
          <Gallery />
          <Testimonials />
          <Booking />
        </main>
        <Footer />
      </div>
    </>
  );
}
