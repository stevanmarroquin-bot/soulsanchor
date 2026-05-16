'use client'

import { useState } from 'react'

const faqs = [
  { q: '¿Cuál es su horario?', a: 'Lunes a Sábado 10am – 7pm. Domingos y feriados cerrado, pero podemos coordinar citas en horario extendido con anticipación.' },
  { q: '¿Cómo reservo mi cita?', a: 'Después de recibir una cotización, reservamos una cita con un adelanto de mínimo Q300, que es una contribución directa al costo total del tatuaje.' },
  { q: '¿Aceptan walk-ins?', a: 'Sí, siempre tenemos disponibilidad.' },
  { q: '¿Cuánto cuesta un tatuaje?', a: 'El precio depende del diseño, estilo, área y tamaño. El mínimo por tatuajes pequeños y simples es de Q450.' },
  { q: '¿Qué formas de pago aceptan?', a: 'Todas. Efectivo, transferencia, tarjeta (con cuotas), PayPal y Bitcoin.' },
  { q: '¿Hacen cover-ups?', a: 'Sí, tenemos especialistas en cover ups. Adjunta fotos del tatuaje a cubrir y sé abierto a las sugerencias de los artistas.' },
  { q: '¿Tengo que llevar mi diseño?', a: 'No. Nuestro objetivo siempre es arte original personalizado. El artista diseña para ti — solo trae tu idea o referencias.' },
  { q: '¿Hacen perforaciones?', a: 'Sí. Contamos con Focho, nuestro body piercer profesional con amplia experiencia. Contáctalo en @focho_tp.' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ borderBottom: '0.5px solid rgba(232,228,220,0.07)', padding: '1.2rem 0', cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <div
        className="font-aileron"
        style={{
          fontSize: '13px',
          color: '#e8e4dc',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          letterSpacing: '0.03em',
        }}
      >
        {q}
        <span style={{ color: 'rgba(232,228,220,0.42)', fontSize: '16px', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, flexShrink: 0, transition: 'transform 0.25s ease', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.28s ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginTop: '0.6rem', fontSize: '14px', lineHeight: 1.8, color: 'rgba(232,228,220,0.65)', fontWeight: 300 }}>
            {a}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQs() {
  const left = faqs.slice(0, 4)
  const right = faqs.slice(4)

  return (
    <section id="faqs" className="section-line" style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div
        style={{
          fontSize: '9px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(232,228,220,0.45)',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        Preguntas frecuentes
        <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(232,228,220,0.1)', display: 'block' }} />
      </div>

      <div className="grid md:grid-cols-2 gap-x-16">
        <div>{left.map((f) => <FAQItem key={f.q} {...f} />)}</div>
        <div>{right.map((f) => <FAQItem key={f.q} {...f} />)}</div>
      </div>
      </div>
    </section>
  )
}
