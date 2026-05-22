'use client';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let val = 0;
    const tick = () => {
      const step = Math.random() * 2.8 + 0.4;
      val = Math.min(val + step, 100);
      setProgress(Math.floor(val));
      if (val < 100) {
        setTimeout(tick, 22 + Math.random() * 28);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 900);
        }, 420);
      }
    };
    const t = setTimeout(tick, 180);
    return () => clearTimeout(t);
  }, [onComplete]);

  const RADIUS  = 54;
  const CIRCUM  = 2 * Math.PI * RADIUS;
  const dashArr = (CIRCUM * progress) / 100;

  return (
    <div className={`preloader${exiting ? ' exit' : ''}`}>
      <div className="preloader-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="preloader-ring">
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Track */}
            <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="#2A2A2A" strokeWidth="1" />
            {/* Tick marks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i / 36) * Math.PI * 2 - Math.PI / 2;
              const inner = RADIUS - 6, outer = RADIUS + 6;
              return (
                <line
                  key={i}
                  x1={70 + inner * Math.cos(angle)}
                  y1={70 + inner * Math.sin(angle)}
                  x2={70 + outer * Math.cos(angle)}
                  y2={70 + outer * Math.sin(angle)}
                  stroke="#1C1C1C"
                  strokeWidth="1"
                />
              );
            })}
            {/* Progress arc */}
            <circle
              cx="70" cy="70" r={RADIUS}
              fill="none"
              stroke="#C4963F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={`${dashArr} ${CIRCUM}`}
              transform="rotate(-90 70 70)"
              style={{ filter: 'drop-shadow(0 0 6px rgba(196,150,63,0.8))', transition: 'stroke-dasharray 0.05s linear' }}
            />
            {/* Dot at progress tip */}
            {progress > 2 && (() => {
              const angle = (progress / 100) * Math.PI * 2 - Math.PI / 2;
              return (
                <circle
                  cx={70 + RADIUS * Math.cos(angle)}
                  cy={70 + RADIUS * Math.sin(angle)}
                  r="3"
                  fill="#E8C97D"
                  style={{ filter: 'drop-shadow(0 0 4px #E8C97D)' }}
                />
              );
            })()}
          </svg>
          <div className="preloader-counter">
            <span className="num">{progress}</span>
            <span className="pct">%</span>
          </div>
        </div>
        <div className="preloader-wordmark">
          <div className="name">Atelier Noir</div>
          <div style={{
            width: `${progress}%`, height: '1px',
            background: 'linear-gradient(to right, transparent, #C4963F, transparent)',
            margin: '10px auto 0', transition: 'width 0.05s linear', maxWidth: '120px',
          }} />
        </div>
      </div>
    </div>
  );
}
