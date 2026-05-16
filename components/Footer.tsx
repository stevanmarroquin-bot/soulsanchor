'use client'


const studioLinks = ['Acerca', 'Artistas', 'FAQs', 'Cuidados del tatuaje', 'Cuidados de perforación']
const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/soulsanchortattoo' },
  { label: 'Facebook', href: 'https://www.facebook.com/soulsanchortattoo' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@soulsanchortattoo' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#070706' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div
        style={{
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '1.2rem' }}>
            <img src="/logo.png" alt="Soul's Anchor" style={{ height: '60px', width: 'auto', display: 'block', background: 'transparent' }} />
          </div>
          <p style={{ fontSize: '12px', lineHeight: 1.8, color: 'rgba(232,228,220,0.5)', fontWeight: 300 }}>
            4 Avenida y 15 Calle esquina<br />
            Santander Plaza, Zona 10<br />
            Ciudad de Guatemala, Guatemala
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.2)', marginTop: '0.75rem', fontWeight: 300 }}>
            soulsanchortattoo@gmail.com
          </p>
        </div>

        {/* Estudio */}
        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.42)', marginBottom: '1.1rem' }}>
            Estudio
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {studioLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, '-')}`}
                style={{ fontSize: '12px', color: 'rgba(232,228,220,0.62)', textDecoration: 'none', fontWeight: 300 }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.42)', marginBottom: '0.5rem' }}>
            Horario
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.5)', lineHeight: 1.8, fontWeight: 300 }}>
            Lun – Sáb: 10am – 7pm
          </p>
        </div>
      </div>

      </div>
      {/* Bottom bar */}
      <div
        style={{
          padding: '1rem clamp(1.5rem, 5vw, 3rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderTop: '0.5px solid rgba(232,228,220,0.05)',
        }}
      >
        <span style={{ fontSize: '10px', color: 'rgba(232,228,220,0.18)', letterSpacing: '0.05em' }}>
          © 2025 Soul&apos;s Anchor Tattoo Studio · Todos los derechos reservados
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.42)', textDecoration: 'none' }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
