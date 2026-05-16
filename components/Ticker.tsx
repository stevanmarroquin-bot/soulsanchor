'use client'

const text = 'Arte personalizado · Todos los estilos · Cover Ups · Perforaciones · Ciudad de Guatemala · Zona 10 · Soul\'s Anchor Tattoo Studio · Arte personalizado · Todos los estilos · Cover Ups · Perforaciones · Ciudad de Guatemala · Zona 10'

export default function Ticker() {
  return (
    <div
      className="section-line overflow-hidden"
      style={{ padding: '1.1rem 0' }}
    >
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-inner {
          display: flex;
          width: max-content;
          animation: ticker 40s linear infinite;
        }
        .ticker-inner:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-inner">
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              fontSize: '12px',
              letterSpacing: '0.03em',
              textTransform: 'none',
              color: 'rgba(232,228,220,0.16)',
              whiteSpace: 'nowrap',
              paddingRight: '4rem',
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
