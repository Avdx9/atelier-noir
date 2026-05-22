import './globals.css';

export const metadata = {
  title: 'Atelier Noir — Premium Barbershop & Salon, London',
  description: 'Where craft meets character. Premium barbershop and salon services in the heart of London. Book your appointment today.',
  keywords: 'barbershop london, premium salon, haircut london, beard grooming, luxury barber',
  openGraph: {
    title: 'Atelier Noir — Premium Barbershop & Salon',
    description: 'Where craft meets character.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
