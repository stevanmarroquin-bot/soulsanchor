'use client'

import { useState } from 'react'

const filters = ['Todos', 'Anime', 'Color', 'Cover Up', 'Línea fina', 'Neo Japonés', 'Neo Tradicional', 'Realismo', 'Tradicional']

const pieces = [
  { src: '/portfolio/anime.jpeg',          tag: 'anime',           label: 'Anime' },
  { src: '/portfolio/anime1.jpeg',         tag: 'anime',           label: 'Anime' },
  { src: '/portfolio/anime2.jpeg',         tag: 'anime',           label: 'Anime' },
  { src: '/portfolio/anime3.jpeg',         tag: 'anime',           label: 'Anime' },
  { src: '/portfolio/color.jpeg',          tag: 'color',           label: 'Color' },
  { src: '/portfolio/color1.jpeg',         tag: 'color',           label: 'Color' },
  { src: '/portfolio/color2.jpeg',         tag: 'color',           label: 'Color' },
  { src: '/portfolio/color3.jpeg',         tag: 'color',           label: 'Color' },
  { src: '/portfolio/color4.jpeg',         tag: 'color',           label: 'Color' },
  { src: '/portfolio/color5.jpeg',         tag: 'color',           label: 'Color' },
  { src: '/portfolio/coverup.png',         tag: 'cover-up',        label: 'Cover Up' },
  { src: '/portfolio/coverup1.png',        tag: 'cover-up',        label: 'Cover Up' },
  { src: '/portfolio/fineline.jpeg',       tag: 'linea-fina',      label: 'Línea fina' },
  { src: '/portfolio/fineline1.jpeg',      tag: 'linea-fina',      label: 'Línea fina' },
  { src: '/portfolio/fineline2.jpeg',      tag: 'linea-fina',      label: 'Línea fina' },
  { src: '/portfolio/fineline3.jpeg',      tag: 'linea-fina',      label: 'Línea fina' },
  { src: '/portfolio/fineline4.jpeg',      tag: 'linea-fina',      label: 'Línea fina' },
  { src: '/portfolio/japanese.JPG',        tag: 'neo-japanese',    label: 'Neo Japonés' },
  { src: '/portfolio/japanese1.png',       tag: 'neo-japanese',    label: 'Neo Japonés' },
  { src: '/portfolio/japanese2.png',       tag: 'neo-japanese',    label: 'Neo Japonés' },
  { src: '/portfolio/japanese3.png',       tag: 'neo-japanese',    label: 'Neo Japonés' },
  { src: '/portfolio/japanese4.png',       tag: 'neo-japanese',    label: 'Neo Japonés' },
  { src: '/portfolio/japanese5.png',       tag: 'neo-japanese',    label: 'Neo Japonés' },
  { src: '/portfolio/neotradicional.jpg',  tag: 'neo-traditional', label: 'Neo Tradicional' },
  { src: '/portfolio/neotradicional1.JPG', tag: 'neo-traditional', label: 'Neo Tradicional' },
  { src: '/portfolio/neotradicional2.jpg', tag: 'neo-traditional', label: 'Neo Tradicional' },
  { src: '/portfolio/neotradicional3.png', tag: 'neo-traditional', label: 'Neo Tradicional' },
  { src: '/portfolio/neotradicional4.jpg', tag: 'neo-traditional', label: 'Neo Tradicional' },
  { src: '/portfolio/neotradicional5.png', tag: 'neo-traditional', label: 'Neo Tradicional' },
  { src: '/portfolio/neotradicional6.JPG', tag: 'neo-traditional', label: 'Neo Tradicional' },
  { src: '/portfolio/realismo.jpeg',       tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo1.png',       tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo2.jpeg',      tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo3.jpeg',      tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo4.jpeg',      tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo5.png',       tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo6.jpeg',      tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo7.jpeg',      tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo8.jpeg',      tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo9.jpeg',      tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/realismo10.jpeg',     tag: 'realismo',        label: 'Realismo' },
  { src: '/portfolio/tradicional.jpeg',    tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional1.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional2.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional3.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional4.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional5.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional6.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional7.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional8.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
  { src: '/portfolio/tradicional9.jpeg',   tag: 'tradicional',     label: 'Tradicional' },
]

const tagMap: Record<string, string> = {
  'Neo Japonés':    'neo-japanese',
  'Neo Tradicional':'neo-traditional',
  'Anime':          'anime',
  'Tradicional':    'tradicional',
  'Realismo':       'realismo',
  'Color':          'color',
  'Línea fina':     'linea-fina',
  'Cover Up':       'cover-up',
}

export default function Portfolio() {
  const [active, setActive] = useState('Todos')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const visible = pieces.filter(
    (p) => active === 'Todos' || p.tag === tagMap[active]
  )

  return (
    <section id="portafolio" className="section-line" style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Label */}
        <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.45)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Portafolio
          <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(232,228,220,0.15)', display: 'block' }} />
        </div>

        <h2 className="font-aileron" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 0.96, color: '#e8e4dc', marginBottom: '2rem', letterSpacing: '-0.01em' }}>
          El trabajo habla por sí solo.
        </h2>

        {/* Filter tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', marginBottom: '1px', background: 'rgba(232,228,220,0.07)' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="font-aileron"
              style={{
                fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
                background: active === f ? '#111110' : '#0a0a08',
                color: active === f ? '#e8e4dc' : 'rgba(232,228,220,0.4)',
                padding: '0.65rem 1.2rem', border: 'none', cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px', background: 'rgba(232,228,220,0.07)' }}>
          {visible.map((p, i) => (
            <div
              key={i}
              onClick={() => setLightbox(p.src)}
              style={{ background: '#111110', aspectRatio: '2/3', position: 'relative', overflow: 'hidden', cursor: 'zoom-in' }}
            >
              <img
                src={p.src}
                alt={p.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.4s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,8,0.5)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <span className="font-aileron" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e8e4dc' }}>{p.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div style={{ marginTop: '1px', background: 'rgba(232,228,220,0.04)', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '12px', color: 'rgba(232,228,220,0.4)', fontWeight: 300 }}>
            Más de 10 años de trabajo en el estudio
          </span>
          <a href="https://www.instagram.com/soulsanchortattoo" target="_blank" rel="noopener noreferrer" className="font-aileron" style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.65)', textDecoration: 'none' }}>
            Ver más en Instagram →
          </a>
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,8,0.95)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'zoom-out' }}
        >
          <img
            src={lightbox}
            alt=""
            style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'rgba(232,228,220,0.6)', fontSize: '28px', cursor: 'pointer', lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      )}
    </section>
  )
}
