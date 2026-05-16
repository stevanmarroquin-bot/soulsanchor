'use client'

export default function Acerca() {
  return (
    <section id="acerca" className="section-line" style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Label */}
        <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.4)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Acerca
          <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(232,228,220,0.15)', display: 'block' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
          {/* Left */}
          <div>
            <h2 className="font-aileron" style={{ fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.05, color: '#e8e4dc', marginBottom: '2rem', letterSpacing: '-0.01em' }}>
              Arte personalizado que dura toda la vida.
            </h2>
          </div>

          {/* Right */}
          <div>
            <p style={{ fontSize: 'clamp(14px, 2vw, 15px)', lineHeight: 1.9, color: 'rgba(232,228,220,0.65)', fontWeight: 300, marginBottom: '1.5rem' }}>
              Soul&apos;s Anchor nació como un estudio para quienes aprecian el arte y no tienen miedo a la permanencia ni a expresar sus convicciones.
            </p>
            <p style={{ fontSize: 'clamp(14px, 2vw, 15px)', lineHeight: 1.9, color: 'rgba(232,228,220,0.65)', fontWeight: 300, marginBottom: '2rem' }}>
              Somos un estudio de tatuajes ubicado en el corazón de la Ciudad de Guatemala, zona 10. Cada tatuaje que hacemos, lo hacemos con amor, con el corazón, diseñado específicamente para ti y ejecutado por artistas que dominan su estilo.
            </p>
            <blockquote style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.6, fontWeight: 300, color: 'rgba(232,228,220,0.55)', borderLeft: '1px solid rgba(232,228,220,0.15)', paddingLeft: '1.5rem', fontStyle: 'italic', marginBottom: '2rem' }}>
              &ldquo;Soul&apos;s Anchor es para los que no le temen a tomar decisiones permanentes.&rdquo;
            </blockquote>
            <a href="#artistas" style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.5)', textDecoration: 'none', fontWeight: 400 }}>
              Conoce el equipo →
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
