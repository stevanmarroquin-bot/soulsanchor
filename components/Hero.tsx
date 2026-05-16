'use client'

import { useState, useEffect } from 'react'

const slides = [
  '/hero/slide-1.jpg',
  '/hero/slide-2.jpg',
  '/hero/slide-3.jpg',
  '/hero/slide-4.jpg',
  '/hero/slide-5.jpg',
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current)
      setFading(true)
      setCurrent((c) => (c + 1) % slides.length)
      setTimeout(() => {
        setPrev(null)
        setFading(false)
      }, 1200)
    }, 5000)
    return () => clearInterval(interval)
  }, [current])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      document.getElementById('hero-bg')?.style.setProperty('transform', `translateY(${y * 0.45}px)`)
      document.getElementById('hero-content')?.style.setProperty('transform', `translateY(${y * 0.15}px)`)
      document.getElementById('hero-content')?.style.setProperty('opacity', `${1 - y / 600}`)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="hero"
      className="section-line"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Slideshow background */}
      <div id="hero-bg" style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
      {slides.map((src, i) => (
        <div
          key={src}
          className={i === current ? 'hero-slide-active' : ''}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transition: 'opacity 1.4s ease-in-out',
            opacity: i === current ? 1 : 0,
            zIndex: 0,
          }}
        >
          <img
            src={src}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
            }}
          />
        </div>
      ))}

      {/* Dark overlay so text stays legible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,10,8,0.55)',
          zIndex: 1,
        }}
      />
      </div>

      {/* Side label */}
      <span
        className="hidden md:block"
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(1rem, 3vw, 3rem)',
          transform: 'translateY(-50%)',
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(232,228,220,0.4)',
          writingMode: 'vertical-rl',
          zIndex: 2,
        }}
      >
        Ciudad de Guatemala · Zona 10
      </span>

      {/* Slide dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 2,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i) }}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: i === current ? '#e8e4dc' : 'rgba(232,228,220,0.35)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              opacity: i === current ? 1 : 0.5,
              transition: 'background 0.3s ease, opacity 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div id="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: '800px', width: '100%' }}>
        <h1
          className="font-aileron hero-enter"
          style={{
            fontSize: 'clamp(56px, 12vw, 120px)',
            lineHeight: 0.82,
            color: '#e8e4dc',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Para los que
          <br />
          <span style={{ color: 'rgba(232,228,220,0.45)' }}>no le temen</span>
          <br />
          a la permanencia.
        </h1>

        <p
          className="hero-enter"
          style={{
            fontSize: 'clamp(14px, 2vw, 16px)',
            lineHeight: 1.85,
            color: 'rgba(232,228,220,0.75)',
            maxWidth: '420px',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 300,
            animationDelay: '0.2s',
          }}
        >
          Un estudio hecho para todos, pero no para cualquiera. Arte original,
          artistas que dominan su oficio, y un espacio para ti.
        </p>

        <div className="hero-enter" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: 'clamp(2rem, 5vw, 3rem)', animationDelay: '0.4s' }}>
          <a
            href="#citas"
            className="font-aileron"
            style={{
              fontSize: 'clamp(12px, 1.5vw, 13px)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: '#e8e4dc',
              color: '#0a0a08',
              padding: 'clamp(0.7rem, 2vw, 0.9rem) clamp(1.5rem, 3vw, 2.2rem)',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Agenda tu cita
          </a>
          <a
            href="#artistas"
            style={{
              fontSize: 'clamp(10px, 1.5vw, 12px)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(232,228,220,0.65)',
              textDecoration: 'none',
              fontWeight: 300,
            }}
          >
            Ver artistas →
          </a>
        </div>

        {/* Stats */}
        <div className="hero-enter" style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 2.5rem)', flexWrap: 'wrap', animationDelay: '0.55s' }}>
          {[
            { num: '10+', label: 'Artistas' },
            { num: 'L–S', label: 'Lun – Sáb' },
            { num: 'Z10', label: 'Zona 10, GT' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-aileron" style={{ fontSize: 'clamp(24px, 4vw, 34px)', lineHeight: 1, color: '#e8e4dc' }}>
                {s.num}
              </div>
              <div style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.55)', marginTop: '4px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
