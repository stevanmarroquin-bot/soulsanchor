'use client'

import { artists } from '@/lib/artists'

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function ArtistCard({ a }: { a: (typeof artists)[0] }) {
  return (
    <a
      href={`/artistas/${a.slug}`}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '0.5rem' }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1/1',
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#111110',
          border: '0.5px solid rgba(232,228,220,0.1)',
          transition: 'border-color 0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(232,228,220,0.35)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(232,228,220,0.1)')}
      >
        {a.photo ? (
          <img
            src={a.photo}
            alt={a.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block', transition: 'transform 0.4s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'AileronHeavy, sans-serif', fontSize: '28px', color: 'rgba(232,228,220,0.08)', textTransform: 'uppercase' }}>
              {getInitials(a.nickname || a.name)}
            </span>
          </div>
        )}
      </div>
      <div style={{ textAlign: 'center' }}>
        <div className="font-aileron" style={{ fontSize: '13px', color: '#e8e4dc', marginBottom: '3px', letterSpacing: '0.02em' }}>
          {a.nickname || a.name.split(' ')[0]}
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(232,228,220,0.45)' }}>
          {a.subtitle || a.styles[0]}
        </div>
      </div>
    </a>
  )
}

const tatuadores = artists.filter(a => a.styleLabel !== 'Estilos de piercing')
const piercers = artists.filter(a => a.styleLabel === 'Estilos de piercing')

export default function Artistas() {
  return (
    <section id="artistas" className="section-line" style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.45)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Artistas
          <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(232,228,220,0.15)', display: 'block' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '2rem 1rem' }}>
          {tatuadores.map((a) => <ArtistCard key={a.slug} a={a} />)}
        </div>

        <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.45)', margin: '3rem 0 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Piercings
          <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(232,228,220,0.15)', display: 'block' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '2rem 1rem' }}>
          {piercers.map((a) => <ArtistCard key={a.slug} a={a} />)}
        </div>

      </div>
    </section>
  )
}
