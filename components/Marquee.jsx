export default function Marquee() {
  const items = [
    'Premium Grooming',
    'Est. 2018',
    'London, UK',
    'The Art of the Craft',
    'Precision Cuts',
    'Beard Architecture',
    'Colour Mastery',
    'By Appointment',
  ];

  // Duplicate for seamless loop
  const all = [...items, ...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {all.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span className="text">{item}</span>
            <span className="dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
