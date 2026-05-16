'use client'

import { useState, useEffect } from 'react'
import { Artist, getYearsExperience } from '@/lib/artists'
import { useScrollReveal } from '@/components/useScrollReveal'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const tagFilters: Record<string, string> = {
  'Ilustrativo': 'ilustrativo',
  'Blackwork': 'blackwork',
  'Línea fina': 'linea-fina',
  'Neo Japonés': 'neo-japanese',
  'Neo Tradicional': 'neo-traditional',
  'Tradicional': 'tradicional',
  'Color': 'color',
  'Kawaii': 'kawaii',
  'Realismo': 'realismo',
  'Oreja': 'oreja',
  'Nariz': 'nariz',
  'Ceja': 'ceja',
  'Labio': 'labio',
  'Ombligo': 'ombligo',
  'Cover Up': 'cover-up',
  'Black and Gray': 'realismo',
  'Anime': 'anime',
}

export default function ArtistClient({ artist }: { artist: Artist }) {
  useScrollReveal()
  const years = getYearsExperience(artist.startDate)
  const [active, setActive] = useState('Todos')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filters = ['Todos', ...artist.styles]
  const visible = artist.portfolio.filter(p => {
    if (active === 'Todos') return true
    const t = tagFilters[active]
    return Array.isArray(p.tag) ? p.tag.includes(t) : p.tag === t
  })

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)', borderBottom: '0.5px solid rgba(232,228,220,0.08)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            <a href="/#artistas" className="reveal" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8e4dc')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.4)')}>
              ← Todos los artistas
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center' }}>

              {/* Info */}
              <div>
                <div className="reveal" style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginBottom: '1rem' }}>
                  Soul&apos;s Anchor · Artista
                </div>

                <h1 className="font-aileron reveal" data-delay="100" style={{ fontSize: 'clamp(36px,6vw,64px)', lineHeight: 0.96, color: '#e8e4dc', letterSpacing: '-0.01em', marginBottom: artist.nickname ? '0.5rem' : '1.5rem' }}>
                  {artist.nickname || artist.name}
                </h1>

                {artist.nickname && (
                  <p className="reveal" data-delay="150" style={{ fontSize: '14px', color: 'rgba(232,228,220,0.38)', fontWeight: 300, marginBottom: '1.5rem' }}>
                    {artist.name}
                  </p>
                )}

                {/* Stats */}
                <div className="reveal" data-delay="200" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  <div>
                    <div className="font-aileron" style={{ fontSize: '32px', lineHeight: 1, color: '#e8e4dc' }}>{years}</div>
                    <div style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginTop: '4px' }}>años de experiencia</div>
                  </div>

                </div>

                {/* Style tags */}
                <div className="reveal" data-delay="240" style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginBottom: '0.75rem' }}>
                  {artist.styleLabel || 'Estilo de tatuaje'}
                </div>
                <div className="reveal" data-delay="250" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2rem' }}>
                  {artist.styles.map(s => (
                    <span key={s} style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', border: '0.5px solid rgba(232,228,220,0.15)', padding: '5px 10px', color: 'rgba(232,228,220,0.55)' }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                {artist.bio && (
                  <p className="reveal" data-delay="300" style={{ fontSize: 'clamp(14px,2vw,15px)', lineHeight: 1.9, color: 'rgba(232,228,220,0.65)', fontWeight: 300, maxWidth: '480px', marginBottom: '2rem' }}>
                    {artist.bio}
                  </p>
                )}

                {/* CTAs */}
                <div className="reveal" data-delay="350" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <a href={`/#citas`} className="font-aileron"
                    style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#e8e4dc', color: '#0a0a08', padding: '0.85rem 2rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    Agenda con {artist.nickname || artist.name.split(' ')[0]}
                  </a>
                  {artist.instagram && (
                    <a href={artist.instagram} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#e8e4dc')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.5)')}>
                      Instagram →
                    </a>
                  )}
                </div>
              </div>

              {/* Photo */}
              <div className="reveal-right" data-delay="100">
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', maxWidth: '420px', marginLeft: 'auto', background: '#111110', border: '0.5px solid rgba(232,228,220,0.07)' }}>
                  {artist.photo ? (
                    <img src={artist.photo} alt={artist.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="font-aileron" style={{ fontSize: '64px', color: 'rgba(232,228,220,0.06)', textTransform: 'uppercase' }}>
                        {(artist.nickname || artist.name).slice(0, 2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section style={{ padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)', borderBottom: '0.5px solid rgba(232,228,220,0.08)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            <div className="reveal" style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              Portafolio <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(232,228,220,0.15)', display: 'block' }} />
            </div>

            {filters.length > 1 && (
              <div className="reveal" data-delay="100" style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', marginBottom: '1px', background: 'rgba(232,228,220,0.07)' }}>
                {filters.map(f => (
                  <button key={f} onClick={() => setActive(f)} className="font-aileron"
                    style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', background: active===f?'#111110':'#0a0a08', color: active===f?'#e8e4dc':'rgba(232,228,220,0.4)', padding: '0.65rem 1.2rem', border: 'none', cursor: 'pointer', transition: 'background 0.15s, color 0.15s' }}>
                    {f}
                  </button>
                ))}
              </div>
            )}

            {visible.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1px', background: 'rgba(232,228,220,0.07)' }}>
                {visible.map((p, i) => (
                  <div key={i} className="reveal" data-delay={String(i*60)} onClick={() => setLightbox(p.src)}
                    style={{ background: '#111110', aspectRatio: '2/3', position: 'relative', overflow: 'hidden', cursor: 'zoom-in' }}>
                    <img src={p.src} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,10,8,0.7) 0%,transparent 50%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>
                      <span className="font-aileron" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e8e4dc' }}>{p.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '5rem', textAlign: 'center', background: '#111110', border: '0.5px solid rgba(232,228,220,0.07)' }}>
                <p style={{ fontSize: '13px', color: 'rgba(232,228,220,0.3)', fontWeight: 300 }}>Portafolio próximamente</p>
              </div>
            )}

            {artist.instagram && (
              <div className="reveal" style={{ marginTop: '1px', background: 'rgba(232,228,220,0.03)', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="font-aileron"
                  style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e8e4dc')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.6)')}>
                  Ver más en Instagram →
                </a>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,8,0.96)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'zoom-out' }}>
          <img src={lightbox} alt="" style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }} />
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'rgba(232,228,220,0.6)', fontSize: '32px', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
      )}
    </>
  )
}
