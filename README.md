# Atelier Noir — Premium Salon Website

A cinematic, Three.js-powered website for a luxury salon/barbershop. Features:
- Real-time 3D particle galaxy (WebGL/Three.js)
- Scroll-triggered animations (GSAP)
- Smooth scrolling (Lenis)
- Preloader with circular progress ring
- Premium dark aesthetic with gold accents

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Framework Preset: Next.js (auto-detected)
4. Click Deploy — done

## Customisation

- Salon name: `app/layout.js` (metadata) + `components/Hero.jsx`
- Services & prices: `components/Services.jsx`
- Booking link: `components/Booking.jsx`
- Colours: `app/globals.css` (CSS variables at the top)
- Contact details: `components/Footer.jsx`

## Tech Stack

- **Next.js 14** — React framework
- **Three.js** — 3D WebGL particle rendering
- **GSAP** — Animation & scroll triggers
- **Lenis** — Smooth scroll
