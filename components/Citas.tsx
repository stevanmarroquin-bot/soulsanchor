'use client'

import { useState } from 'react'
import { artists } from '@/lib/artists'

const tattooSteps = [
  { n: '01', title: 'Elige tu artista', desc: 'Revisa el trabajo de cada artista, elige el estilo y artista que mejor se adapte a tu visión.' },
  { n: '02', title: 'Describe tu proyecto', desc: '¿Qué quieres plasmar o transmitir? Incluye referencias si tienes.' },
  { n: '03', title: 'Muéstranos el área', desc: 'Indícanos en dónde te quieres tatuar y manda una foto del área de ser posible.' },
  { n: '04', title: 'Define el tamaño', desc: 'Dinos de qué tamaño aproximado deseas el tatuaje, sé lo más específico posible.' },
  { n: '05', title: 'Recibe tu cotización', desc: 'Recibirás una consulta, recomendaciones y cotización personalizada.' },
  { n: '06', title: 'Agenda con adelanto', desc: 'Q.300 mínimo para apartar tu espacio. El adelanto se descuenta del precio final.' },
  { n: '07', title: 'Confía en el proceso', desc: 'Tu diseño estará listo para el día de la cita. Puedes hacer cambios antes de empezar. Si quieres ver el diseño antes, coordinamos una consulta en persona o vía Google Meet.' },
]

const piercingSteps = [
  { n: '01', title: 'Elige tu perforador', desc: 'Revisa el trabajo de nuestros especialistas en piercing y joyería corporal.' },
  { n: '02', title: 'Describe tu idea', desc: 'Cuéntanos qué tipo de piercing deseas y en qué zona del cuerpo.' },
  { n: '03', title: 'Consulta personalizada', desc: 'Te asesoramos sobre anatomía, joyería y proceso de cicatrización.' },
  { n: '04', title: 'Agenda tu cita', desc: 'Coordinamos fecha y hora para tu perforación.' },
]

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: '0.5px solid rgba(232,228,220,0.12)',
  padding: '0.6rem 0.8rem',
  color: '#e8e4dc',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'DM Sans, sans-serif',
}

const labelStyle = {
  fontSize: '12px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: 'rgba(232,228,220,0.32)',
  marginBottom: '6px',
  display: 'block',
  marginTop: '0.9rem',
}

function ContactFields({ contacto, setContacto }: { contacto: string; setContacto: (v: string) => void }) {
  return (
    <>
      <label style={labelStyle}>¿Cómo prefieres que te contactemos?</label>
      <div style={{ display: 'flex', gap: '1px', background: 'rgba(232,228,220,0.07)' }}>
        {['WhatsApp', 'Instagram', 'Correo'].map((opt) => (
          <label key={opt} style={{ flex: 1, cursor: 'pointer' }}>
            <input type="radio" name="contacto_preferido" value={opt} required onChange={() => setContacto(opt)} style={{ display: 'none' }} />
            <div style={{
              padding: '0.6rem',
              textAlign: 'center',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: contacto === opt ? '#e8e4dc' : 'rgba(232,228,220,0.45)',
              background: contacto === opt ? '#1a1a18' : '#0a0a08',
              transition: 'background 0.15s, color 0.15s',
              userSelect: 'none',
            }}>
              {opt}
            </div>
          </label>
        ))}
      </div>
      {contacto === 'WhatsApp' && (
        <>
          <label style={labelStyle}>WhatsApp / Tel</label>
          <input style={inputStyle} name="whatsapp" type="text" placeholder="+502 ..." required />
        </>
      )}
      {contacto === 'Correo' && (
        <>
          <label style={labelStyle}>Correo electrónico</label>
          <input style={inputStyle} name="correo" type="email" placeholder="tu@email.com" required />
        </>
      )}
      {contacto === 'Instagram' && (
        <>
          <label style={labelStyle}>Instagram</label>
          <input style={inputStyle} name="instagram" type="text" placeholder="@tuusuario" required />
        </>
      )}
    </>
  )
}

export default function Citas() {
  const [tipo, setTipo] = useState<'tatuaje' | 'piercing'>('tatuaje')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contacto, setContacto] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/mwvygvlv', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const body = await res.json().catch(() => ({}))
        const msg = body?.errors?.map((err: { message: string }) => err.message).join(', ')
        setError(msg || 'No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos directamente.')
      }
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleTipoChange = (t: 'tatuaje' | 'piercing') => {
    setTipo(t)
    setSubmitted(false)
    setContacto('')
  }

  const steps = tipo === 'tatuaje' ? tattooSteps : piercingSteps
  const tatuadores = artists.filter(a => a.styleLabel !== 'Estilos de piercing')
  const piercers = artists.filter(a => a.styleLabel === 'Estilos de piercing')

  return (
    <section id="citas" className="section-line" style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.45)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Citas
          <span style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'rgba(232,228,220,0.1)', display: 'block' }} />
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', gap: '1px', background: 'rgba(232,228,220,0.07)', marginBottom: '3rem', width: 'fit-content' }}>
          {(['tatuaje', 'piercing'] as const).map((t) => (
            <button key={t} onClick={() => handleTipoChange(t)} className="font-aileron"
              style={{
                padding: '0.65rem 2rem',
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                background: tipo === t ? '#e8e4dc' : '#0a0a08',
                color: tipo === t ? '#0a0a08' : 'rgba(232,228,220,0.45)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}>
              {t === 'tatuaje' ? 'Tatuaje' : 'Piercing'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Steps */}
          <div>
            <h2 className="font-aileron" style={{ fontSize: 'clamp(30px, 4vw, 44px)', lineHeight: 0.96, color: '#e8e4dc', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Agenda tu cita.
            </h2>
            {steps.map((s) => (
              <div key={s.n} style={{ display: 'flex', gap: '1.1rem', marginBottom: '1.5rem' }}>
                <div className="font-aileron" style={{ fontSize: '24px', color: 'rgba(232,228,220,0.1)', minWidth: '26px', lineHeight: 1.1 }}>
                  {s.n}
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <div className="font-aileron" style={{ fontSize: '13px', color: '#e8e4dc', marginBottom: '4px', letterSpacing: '0.02em' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(232,228,220,0.65)', fontWeight: 300 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            <div style={{ background: '#111110', border: '0.5px solid rgba(232,228,220,0.1)', padding: '2rem' }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.45)', marginBottom: '1.2rem' }}>
                Solicitud de cita · {tipo === 'tatuaje' ? 'Tatuaje' : 'Piercing'}
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div className="font-aileron" style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8e4dc', marginBottom: '0.75rem' }}>
                    ¡Gracias por tu solicitud!
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(232,228,220,0.4)', fontWeight: 300 }}>
                    Te estaremos respondiendo en 24 horas hábiles o menos.
                  </div>
                </div>
              ) : tipo === 'tatuaje' ? (
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="tipo" value="tatuaje" />

                  <label style={{ ...labelStyle, marginTop: 0 }}>Nombre completo</label>
                  <input style={inputStyle} name="nombre" type="text" placeholder="Tu nombre" required />

                  <ContactFields contacto={contacto} setContacto={setContacto} />

                  <label style={labelStyle}>Artista de preferencia</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} name="artista">
                    <option value="" style={{ background: '#111110' }}>Sugerir a un artista</option>
                    {tatuadores.map(a => (
                      <option key={a.slug} value={a.nickname || a.name} style={{ background: '#111110' }}>
                        {a.nickname || a.name}
                      </option>
                    ))}
                  </select>

                  <label style={labelStyle}>Describe tu tatuaje</label>
                  <textarea style={{ ...inputStyle, resize: 'none' }} name="descripcion" rows={2} placeholder="Tu idea, referencias, etc." />

                  <label style={labelStyle}>Estilo que buscas</label>
                  <input style={inputStyle} name="estilo" type="text" placeholder="Neo Japonés, Blackwork, Realismo..." />

                  <label style={labelStyle}>Área del tatuaje</label>
                  <input style={inputStyle} name="area" type="text" placeholder="Brazo, espalda, pierna..." />

                  <label style={labelStyle}>Tamaño aproximado</label>
                  <input style={inputStyle} name="tamano" type="text" placeholder="Sé lo más específico posible." required />

                  <div style={{ background: 'rgba(232,228,220,0.03)', border: '0.5px solid rgba(232,228,220,0.08)', padding: '0.9rem 1rem' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.35)', marginBottom: '0.5rem' }}>Referencias</div>
                    <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.5)', lineHeight: 1.8, fontWeight: 300 }}>
                      Envíanos tus referencias, fotos del área o del tatuaje que deseas cubrir directamente por <strong style={{ color: 'rgba(232,228,220,0.7)', fontWeight: 400 }}>WhatsApp o Instagram</strong> después de enviar este formulario.
                    </p>
                  </div>

                  {error && (
                    <p style={{ fontSize: '12px', color: '#e57373', background: 'rgba(229,115,115,0.08)', border: '0.5px solid rgba(229,115,115,0.25)', padding: '0.75rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={loading} className="font-aileron"
                    style={{ width: '100%', background: 'rgba(232,228,220,0.92)', color: '#0a0a08', border: 'none', padding: '0.85rem', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', marginTop: '1rem', opacity: loading ? 0.6 : 1 }}>
                    {loading ? 'Enviando...' : 'Enviar solicitud'}
                  </button>

                  <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.18)', marginTop: '0.75rem', textAlign: 'center', fontWeight: 300 }}>
                    También puedes visitarnos · Lun–Sáb · 10am a 7pm · Zona 10
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="tipo" value="piercing" />

                  <label style={{ ...labelStyle, marginTop: 0 }}>Nombre completo</label>
                  <input style={inputStyle} name="nombre" type="text" placeholder="Tu nombre" required />

                  <ContactFields contacto={contacto} setContacto={setContacto} />

                  <label style={labelStyle}>Especialista de preferencia</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} name="especialista">
                    <option value="" style={{ background: '#111110' }}>Sugerir un especialista</option>
                    {piercers.map(a => (
                      <option key={a.slug} value={a.nickname || a.name} style={{ background: '#111110' }}>
                        {a.nickname || a.name}
                      </option>
                    ))}
                  </select>

                  <label style={labelStyle}>Tipo de piercing</label>
                  <input style={inputStyle} name="tipo_piercing" type="text" placeholder="Oreja, nariz, ceja..." />

                  <label style={labelStyle}>Zona del cuerpo</label>
                  <input style={inputStyle} name="zona" type="text" placeholder="Describe dónde deseas la perforación." />

                  <label style={labelStyle}>Consulta o comentario</label>
                  <textarea style={{ ...inputStyle, resize: 'none' }} name="consulta" rows={2} placeholder="¿Tienes alguna duda o referencia?" />

                  {error && (
                    <p style={{ fontSize: '12px', color: '#e57373', background: 'rgba(229,115,115,0.08)', border: '0.5px solid rgba(229,115,115,0.25)', padding: '0.75rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={loading} className="font-aileron"
                    style={{ width: '100%', background: 'rgba(232,228,220,0.92)', color: '#0a0a08', border: 'none', padding: '0.85rem', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', marginTop: '1rem', opacity: loading ? 0.6 : 1 }}>
                    {loading ? 'Enviando...' : 'Enviar solicitud'}
                  </button>

                  <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.18)', marginTop: '0.75rem', textAlign: 'center', fontWeight: 300 }}>
                    También puedes visitarnos · Lun–Sáb · 10am a 7pm · Zona 10
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
