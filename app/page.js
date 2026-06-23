'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import BookingForm from '@/components/BookingForm';

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false });

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [['Services','#services'],['Gallery','#gallery'],['Philosophy','#philosophy'],['Book','#booking']];
  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo"><em>Atelier<span>.</span>Noir</em></div>
        <ul className="nav-links">{links.map(([l,h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul>
        <a href="#booking" className="nav-book">Reserve</a>
        <div className="nav-burger" onClick={() => setOpen(!open)}>
          <span style={{ transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </div>
      </nav>
      {open && (
        <div style={{ position:'fixed',inset:0,background:'rgba(6,4,6,0.98)',zIndex:999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'28px' }}>
          {links.map(([l,h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)}
              style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:'2.8rem',fontStyle:'italic',fontWeight:300,color:'#F5ECD7',letterSpacing:'0.08em' }}>
              {l}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)}
            style={{ marginTop:'12px',fontSize:'0.6rem',letterSpacing:'0.22em',textTransform:'uppercase',color:'#060406',background:'#C9A84C',padding:'12px 40px' }}>
            Reserve Now
          </a>
        </div>
      )}
    </>
  );
}

/* ── HERO ── canvas is now ABSOLUTE inside hero — no bleed into footer ── */
function Hero() {
  return (
    <section className="hero">
      {/* Canvas sits INSIDE hero, not fixed — particles stay in this section only */}
      <HeroCanvas />
      <div className="hero-vignette" />
      <div className="hero-fade" />
      <div className="hero-content">
        <div className="hero-eyebrow">Mayfair · London · Est. 2012</div>
        <h1 className="hero-title">
          Atelier
          <em>Noir</em>
        </h1>
        <p className="hero-tagline">"Where artistry meets transformation."</p>
        <div className="hero-divider">
          <div className="hero-line" /><div className="hero-diamond" /><div className="hero-line r" />
        </div>
        <div className="hero-actions">
          <a href="#booking" className="btn-gold"><span>Reserve Your Visit</span></a>
          <a href="#services" className="btn-outline">Our Services</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-txt">Explore</span>
      </div>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const items = ['Bespoke Colour','Precision Cuts','Bridal Styling','Keratin Treatments','Award-Winning Team','Mayfair London'];
  const all = [...items,...items,...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {all.map((t,i) => <div key={i} className="marquee-item"><span className="t">{t}</span><span className="dot" /></div>)}
      </div>
    </div>
  );
}

/* ── SERVICES ── */
const services = [
  { num:'01', icon:'✦', name:'Signature Cut & Style',  desc:"A deeply personalised cut consultation followed by scissor-work that works with your hair's natural movement. Finished with a bespoke style.", price:'From £95',  dur:'75 min' },
  { num:'02', icon:'◈', name:'Bespoke Colour',          desc:'Your colour is mixed uniquely for you. No two Atelier Noir colours are the same. From root touch-up to full transformation.',                    price:'From £185', dur:'3 hrs'  },
  { num:'03', icon:'◇', name:'Balayage & Toning',       desc:'Hand-painted, sun-kissed dimension. Our balayage technique creates effortless, lived-in colour that grows beautifully.',                          price:'From £220', dur:'3.5 hrs'},
  { num:'04', icon:'⬡', name:'Keratin Treatment',       desc:'A smoothing treatment that eliminates frizz and dramatically reduces drying time. Results last up to five months.',                               price:'From £175', dur:'2.5 hrs'},
  { num:'05', icon:'◎', name:'Bridal Styling',          desc:'From trial to wedding morning, our bridal team creates looks that last all day. Trial sessions available Monday to Thursday.',                    price:'From £145', dur:'2 hrs'  },
  { num:'06', icon:'✧', name:'Scalp Treatment',         desc:'A targeted treatment for dry, sensitive, or oily scalps. Combined with a relaxing scalp massage and personalised home care advice.',               price:'From £85',  dur:'60 min' },
];

function Services() {
  const ref = useReveal();
  return (
    <section className="section services" id="services" ref={ref}>
      <div style={{ maxWidth:'1200px' }}>
        <div className="eyebrow reveal">Our Treatments</div>
        <h2 className="sec-title reveal d1">The Art of <em>Beautiful Hair.</em></h2>
      </div>
      <div className="services-grid">
        {services.map((s,i) => (
          <div key={s.num} className={`service-card reveal d${Math.min(i+1,5)}`}>
            <div className="svc-num">{s.num}</div>
            <div className="svc-icon">{s.icon}</div>
            <h3 className="svc-name">{s.name}</h3>
            <p className="svc-desc">{s.desc}</p>
            <div className="svc-footer">
              <div className="svc-price">{s.price}</div>
              <div className="svc-dur">{s.dur}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── GALLERY ── slot 1 = uploaded bridal image ── */
const shots = [
  { src: '/bridal.jpg',                                                                              label: 'Bridal Styling'  },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&q=85', label: 'Colour Work'     },
  { src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=400&fit=crop&q=85', label: 'The Craft'       },
  { src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=500&fit=crop&q=85',    label: 'Balayage'        },
  { src: 'https://images.unsplash.com/photo-1500840216050-6ffa99d75160?w=400&h=400&fit=crop&q=85', label: 'Finishing Touch' },
  { src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=500&h=400&fit=crop&q=85', label: 'The Salon'       },
];

function Gallery() {
  const ref = useReveal();
  return (
    <section className="section gallery" id="gallery" ref={ref}>
      <div style={{ maxWidth:'1200px' }}>
        <div className="eyebrow reveal">Our Work</div>
        <h2 className="sec-title reveal d1">Inside <em>Atelier Noir.</em></h2>
      </div>
      <div className="gallery-grid" style={{ maxWidth:'1200px' }}>
        {shots.map((s,i) => (
          <div key={i} className={`g-item reveal d${Math.min(i+1,4)}`}>
            <Image src={s.src} alt={s.label} fill unoptimized style={{ objectFit:'cover' }} />
            <div className="g-overlay" />
            <div className="g-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── PHILOSOPHY ── */
function Philosophy() {
  const ref = useReveal();
  return (
    <section className="section philosophy" id="philosophy" ref={ref}>
      <div className="philosophy-inner">
        <div className="phil-img reveal">
          <Image
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=640&h=840&fit=crop&q=85"
            alt="Head stylist" fill unoptimized
            style={{ objectFit:'cover', filter:'sepia(12%) contrast(1.08) brightness(0.8)' }}
          />
          <div className="phil-frame" />
          <div className="phil-badge"><div className="yr">12</div><div className="lb">Years in<br/>Mayfair</div></div>
        </div>
        <div className="phil-text">
          <div className="eyebrow reveal">Our Philosophy</div>
          <blockquote className="quote reveal d1">
            "Great hair begins with <em>listening</em> — to the hair, and to the person wearing it."
          </blockquote>
          <p className="phil-body reveal d2">
            Atelier Noir was founded in 2012 with a single conviction: that a truly exceptional hair salon is built on the quality of its relationships, not just the quality of its work. We take on a limited number of clients so that every appointment receives our complete attention.
          </p>
          <p className="phil-body reveal d3">
            Our team holds advanced colour certifications from London and Paris, with ongoing education embedded into our culture. We use only professional-grade products tested for colour longevity, hair health, and ethical sourcing.
          </p>
          <div className="reveal d4" style={{ marginTop:'28px' }}>
            <a href="#booking" className="btn-gold"><span>Reserve Your Visit</span></a>
          </div>
          <div className="phil-awards reveal d5">
            <div className="award"><div className="n">4.9</div><div className="l">Google Rating</div></div>
            <div className="award"><div className="n">800+</div><div className="l">5-Star Reviews</div></div>
            <div className="award"><div className="n">#3</div><div className="l">London Salons 2024</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
const reviews = [
  { text:"I've been coming to Atelier Noir for four years. In that time, Charlotte has transformed my relationship with my hair entirely. I wouldn't trust anyone else.", name:'Victoria Ashworth', role:'Colour Client · 4 years', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=88&h=88&fit=crop', stars:5 },
  { text:"The balayage they created for my wedding was exactly what I'd always imagined but never been able to describe. They understood instinctively.", name:'Sophie Drake', role:'Bridal Client · June 2024', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=88&h=88&fit=crop', stars:5 },
  { text:"I travel from Manchester every six weeks specifically for my appointment here. There is genuinely nothing comparable anywhere in the country.", name:'Priya Anand', role:'Cut & Colour · 2 years', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=88&h=88&fit=crop', stars:5 },
  { text:"Marcus understood my hair in a way no stylist ever has. He knew what would work before I'd even finished explaining. Remarkable instinct.", name:'James Thornton', role:'Signature Cut · Regular', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=88&h=88&fit=crop', stars:5 },
];

function Testimonials() {
  const trackRef = useRef(null);
  const dragging = useRef(false), startX = useRef(0), scrollL = useRef(0);
  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const down = e => { dragging.current=true; startX.current=(e.pageX||e.touches?.[0]?.pageX||0)-el.offsetLeft; scrollL.current=el.scrollLeft; el.style.cursor='grabbing'; };
    const up   = () => { dragging.current=false; el.style.cursor='grab'; };
    const move = e => { if(!dragging.current) return; e.preventDefault(); const x=(e.pageX||e.touches?.[0]?.pageX||0)-el.offsetLeft; el.scrollLeft=scrollL.current-(x-startX.current); };
    el.addEventListener('mousedown',down); el.addEventListener('touchstart',down,{passive:true});
    el.addEventListener('mouseup',up);     el.addEventListener('touchend',up);
    el.addEventListener('mousemove',move); el.addEventListener('touchmove',move,{passive:false});
    window.addEventListener('mouseup',up);
    return () => { el.removeEventListener('mousedown',down); el.removeEventListener('touchstart',down); el.removeEventListener('mouseup',up); el.removeEventListener('touchend',up); el.removeEventListener('mousemove',move); el.removeEventListener('touchmove',move); window.removeEventListener('mouseup',up); };
  }, []);
  return (
    <section className="section testimonials">
      <div style={{ maxWidth:'1200px', padding:'0 48px', marginBottom:'48px' }}>
        <div className="eyebrow">Client Stories</div>
        <h2 className="sec-title" style={{ marginTop:'14px' }}>Told by <em>those who visit.</em></h2>
      </div>
      <div ref={trackRef} className="testi-track" style={{ paddingLeft:'48px', paddingRight:'48px', cursor:'grab' }}>
        {reviews.map((r,i) => (
          <div key={i} className="testi-card" style={{ scrollSnapAlign:'start' }}>
            <div className="testi-stars">{'★'.repeat(r.stars)}</div>
            <p className="testi-text">"{r.text}"</p>
            <div className="testi-author">
              <div className="testi-av"><Image src={r.img} alt={r.name} width={38} height={38} unoptimized /></div>
              <div><div className="testi-name">{r.name}</div><div className="testi-role">{r.role}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── BOOKING ── */
function Booking() {
  const ref = useReveal();
  return (
    <section className="section booking-section" id="booking" ref={ref}>
      <div className="booking-inner">
        <div>
          <div className="eyebrow reveal">Reservations</div>
          <h2 className="sec-title reveal d1">Book Your<br/><em>Visit.</em></h2>
          <p className="booking-intro reveal d2">
            Every appointment at Atelier Noir begins with a personal consultation. Tell us what you're hoping to achieve and we'll build your appointment around it.
          </p>
          <div className="booking-info">
            {[
              { icon:'📍', label:'Location',      val:'24 Mayfair Street, London W1K 2AA' },
              { icon:'🕘', label:'Hours',         val:'Tue – Fri: 9:00 – 20:00\nSaturday: 9:00 – 19:00\nSunday: 10:00 – 17:00' },
              { icon:'📞', label:'Telephone',     val:'+44 (0)20 7123 4567' },
              { icon:'⏱',  label:'Response Time', val:'Confirmed by text within 30 minutes during salon hours.' },
            ].map(d => (
              <div key={d.label} className="binfo-item reveal">
                <div className="binfo-icon">{d.icon}</div>
                <div>
                  <div className="binfo-label">{d.label}</div>
                  <div className="binfo-val" style={{ whiteSpace:'pre-line' }}>{d.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal d2"><BookingForm /></div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  const R1=260, R2=185, R3=118;
  const mkDots = (r,n,col,op=0.5) => Array.from({length:n}).map((_,i) => {
    const a = (i/n)*Math.PI*2;
    return { cx: r+r*Math.cos(a), cy: r+r*Math.sin(a), col, op };
  });
  return (
    <section className="section cta-section">
      <div className="cta-glow" />
      <div className="cta-ring" style={{ width:R1*2,height:R1*2 }}>
        <svg width={R1*2} height={R1*2} style={{ display:'block',animation:'orbitSpin 38s linear infinite' }}>
          <circle cx={R1} cy={R1} r={R1-2} fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="1"/>
          <circle cx={R1} cy={R1} r={R1-2} fill="none" stroke="rgba(201,168,76,0.16)" strokeWidth="0.5" strokeDasharray="10 22" strokeLinecap="round"/>
          {mkDots(R1,8,'#C9A84C').map((d,i)=><g key={i}><circle cx={d.cx} cy={d.cy} r="3" fill={d.col} opacity={d.op}/><circle cx={d.cx} cy={d.cy} r="7" fill="none" stroke={d.col} strokeWidth="0.5" opacity="0.2"/></g>)}
        </svg>
      </div>
      <div className="cta-ring" style={{ width:R2*2,height:R2*2 }}>
        <svg width={R2*2} height={R2*2} style={{ display:'block',animation:'orbitSpinR 24s linear infinite' }}>
          <circle cx={R2} cy={R2} r={R2-2} fill="none" stroke="rgba(201,168,76,0.05)" strokeWidth="1"/>
          <circle cx={R2} cy={R2} r={R2-2} fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="0.5" strokeDasharray="5 12"/>
          {mkDots(R2,5,'#E2C87A').map((d,i)=><circle key={i} cx={d.cx} cy={d.cy} r="2.5" fill={d.col} opacity={d.op}/>)}
        </svg>
      </div>
      <div className="cta-ring" style={{ width:R3*2,height:R3*2 }}>
        <svg width={R3*2} height={R3*2} style={{ display:'block',animation:'orbitSpin 15s linear infinite' }}>
          <circle cx={R3} cy={R3} r={R3-2} fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="1"/>
          {mkDots(R3,4,'#C9A84C',0.4).map((d,i)=><circle key={i} cx={d.cx} cy={d.cy} r="2" fill={d.col} opacity={d.op}/>)}
        </svg>
      </div>
      <span className="cta-eyebrow" style={{ position:'relative',zIndex:2 }}>Begin Your Experience</span>
      <h2 className="cta-title" style={{ position:'relative',zIndex:2 }}>
        Reserve<br/><em>Your Visit.</em>
      </h2>
      <p className="cta-sub" style={{ position:'relative',zIndex:2 }}>
        Available Tuesday through Sunday.<br/>Walk-ins welcome at the styling bar.
      </p>
      {/* Both buttons now go to #booking */}
      <div style={{ display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',position:'relative',zIndex:2 }}>
        <a href="#booking" className="btn-gold"><span>Reserve Your Visit</span></a>
        <a href="#booking" className="btn-outline">Book Online</a>
      </div>
      <div className="cta-details" style={{ position:'relative',zIndex:2 }}>
        {[
          { l:'Address',  v:'24 Mayfair Street, London W1K 2AA' },
          { l:'Tue – Fri',v:'9:00am – 8:00pm' },
          { l:'Weekend',  v:'Sat 9–7 · Sun 10–5' },
          { l:'Phone',    v:'+44 (0)20 7123 4567' },
        ].map(d => (
          <div key={d.l} className="cta-detail"><div className="l">{d.l}</div><div className="v">{d.v}</div></div>
        ))}
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="f-logo"><em>Atelier<span>.</span>Noir</em></div>
          <p className="f-desc">London's most considered hair salon. Where artistry, craft, and care converge in Mayfair.</p>
          <div className="f-social">
            {[['IG','#'],['FB','#'],['TT','#'],['YT','#']].map(([l,h]) => (
              <a key={l} href={h} className="f-s">{l}</a>
            ))}
          </div>
        </div>
        <div className="f-col">
          <div className="ft">Services</div>
          <ul>{['Signature Cut & Style','Bespoke Colour','Balayage & Toning','Keratin Treatment','Bridal Styling','Scalp Treatment'].map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
        </div>
        <div className="f-col">
          <div className="ft">Visit</div>
          <p className="f-addr">24 Mayfair Street<br/>Mayfair<br/>London, W1K 2AA<br/>United Kingdom</p>
          <div style={{ marginTop:'14px',display:'flex',flexDirection:'column',gap:'7px' }}>
            <a href="tel:+442071234567" style={{ fontSize:'0.76rem',color:'var(--cream-dim)',fontStyle:'italic' }}>+44 (0)20 7123 4567</a>
            <a href="mailto:hello@ateliernoir.co.uk" style={{ fontSize:'0.76rem',color:'var(--cream-dim)',fontStyle:'italic' }}>hello@ateliernoir.co.uk</a>
          </div>
        </div>
        <div className="f-col">
          <div className="ft">Hours</div>
          <ul>
            {[['Monday','Closed'],['Tue – Wed','9:00 – 19:00'],['Thu – Fri','9:00 – 20:00'],['Saturday','9:00 – 19:00'],['Sunday','10:00 – 17:00']].map(([d,t]) => (
              <li key={d} style={{ display:'flex',justifyContent:'space-between',gap:'12px' }}>
                <span style={{ fontSize:'0.76rem',color:'var(--cream-dim)' }}>{d}</span>
                <span style={{ fontSize:'0.76rem',color:t==='Closed'?'var(--muted)':'var(--cream-mid)',fontStyle:'italic' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="f-copy">© {y} Atelier Noir Ltd. All rights reserved. Registered in England & Wales.</div>
        <div className="f-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function Home() {
  useEffect(() => {
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration:1.4, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true });
      const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }).catch(() => {});
  }, []);
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <Philosophy />
        <Testimonials />
        <Booking />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
