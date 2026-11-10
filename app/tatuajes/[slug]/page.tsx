import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { artists, getYearsExperience } from '@/lib/artists'
import { styleRankings } from '@/lib/styleRanking'
import { styleContent, getStyleContent } from '@/lib/styleContent'
import { whatsappLink } from '@/lib/site'

const BASE = 'https://soulsanchor.com'
const PIECES_PER_ARTIST = 4
const BROWSER_IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return styleContent.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getStyleContent(slug)
  if (!c) return {}
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${BASE}/tatuajes/${slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `${BASE}/tatuajes/${slug}`,
      siteName: "Soul's Anchor",
      locale: 'es_GT',
      type: 'website',
    },
  }
}

const eyebrow = { fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(232,228,220,0.45)' }
const btnPrimary = { fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, background: '#e8e4dc', color: '#0a0a08', padding: '0.85rem 1.6rem', textDecoration: 'none', display: 'inline-block' }
const btnGhost = { fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(232,228,220,0.7)', padding: '0.85rem 1.6rem', textDecoration: 'none', display: 'inline-block', border: '0.5px solid rgba(232,228,220,0.25)' }
const section = { padding: 'clamp(3rem,7vw,5.5rem) clamp(1.5rem,5vw,5rem)', borderBottom: '0.5px solid rgba(232,228,220,0.08)' }
const wrap = { maxWidth: '1100px', margin: '0 auto' }

export default async function StylePage({ params }: Props) {
  const { slug } = await params
  const c = getStyleContent(slug)
  const ranking = styleRankings.find(r => r.slug === slug)
  if (!c || !ranking) notFound()

  const styleArtists = ranking.artists
    .map(s => artists.find(a => a.slug === s))
    .filter((a): a is (typeof artists)[number] => !!a && !!a.startDate && !!a.photo) // drafts without photo stay hidden
    .map(a => ({
      artist: a,
      pieces: a.portfolio
        .filter(p => [p.tag].flat().some(t => c.tags.includes(t)) && BROWSER_IMAGE.test(p.src))
        .slice(0, PIECES_PER_ARTIST),
    }))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE },
        { '@type': 'ListItem', position: 2, name: ranking.name, item: `${BASE}/tatuajes/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main style={{ paddingTop: '72px' }}>
        {/* Hero */}
        <section style={section}>
          <div style={wrap}>
            <a href="/#artistas" style={{ ...eyebrow, textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}>
              ← Todos los artistas
            </a>
            <div style={{ ...eyebrow, marginBottom: '1rem' }}>Soul&apos;s Anchor · Zona 10, Ciudad de Guatemala</div>
            <h1 className="font-aileron" style={{ fontSize: 'clamp(38px,7vw,76px)', lineHeight: 0.95, color: '#e8e4dc', letterSpacing: '-0.02em', marginBottom: '2rem', maxWidth: '820px' }}>
              {c.h1}
            </h1>
            {c.intro.map((p, i) => (
              <p key={i} style={{ fontSize: 'clamp(14px,2vw,16px)', lineHeight: 1.9, color: 'rgba(232,228,220,0.68)', fontWeight: 300, maxWidth: '640px', marginBottom: '1.2rem' }}>
                {p}
              </p>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a href="#artistas-estilo" className="font-aileron" style={btnPrimary}>Ver artistas</a>
              <a href={whatsappLink(c.whatsappText)} target="_blank" rel="noopener noreferrer" className="font-aileron" style={btnGhost}>Cotizar por WhatsApp</a>
            </div>
          </div>
        </section>

        {/* Artists */}
        <section id="artistas-estilo" style={section}>
          <div style={wrap}>
            <div style={{ ...eyebrow, marginBottom: '1rem' }}>Artistas</div>
            <h2 className="font-aileron" style={{ fontSize: 'clamp(26px,4vw,42px)', lineHeight: 1, color: '#e8e4dc', marginBottom: '3rem' }}>
              {c.artistsHeading}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem,6vw,4.5rem)' }}>
              {styleArtists.map(({ artist: a, pieces }) => {
                const display = a.nickname || a.name.split(' ')[0]
                return (
                  <article key={a.slug} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(1.5rem,4vw,3rem)', alignItems: 'start' }}>
                    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '88px', flexShrink: 0, aspectRatio: '3/4', background: '#111110', overflow: 'hidden', border: '0.5px solid rgba(232,228,220,0.08)' }}>
                        {a.photo && <img src={a.photo} alt={`${a.name}, ${c.altNoun.toLowerCase()} en Soul's Anchor Guatemala`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />}
                      </div>
                      <div>
                        <h3 className="font-aileron" style={{ fontSize: '26px', lineHeight: 1, color: '#e8e4dc', marginBottom: '0.4rem' }}>{display}</h3>
                        <p style={{ fontSize: '12px', color: 'rgba(232,228,220,0.45)', fontWeight: 300, marginBottom: '0.8rem' }}>
                          {getYearsExperience(a.startDate)} años de experiencia · {a.styles.slice(0, 3).join(', ')}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <a href={`/?artista=${a.slug}#citas`} className="font-aileron" style={{ ...btnPrimary, padding: '0.7rem 1.1rem' }}>Agenda con {display}</a>
                          <a href={`/artistas/${a.slug}`} className="font-aileron" style={{ ...btnGhost, padding: '0.7rem 1.1rem' }}>Ver perfil</a>
                        </div>
                      </div>
                    </div>
                    {pieces.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '4px' }}>
                        {pieces.map((p, i) => (
                          <a key={p.src} href={`/artistas/${a.slug}`} style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#111110', display: 'block' }}>
                            <img src={p.src} alt={`${c.altNoun} por ${display}, Soul's Anchor Guatemala (${i + 1})`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={section}>
          <div style={{ ...wrap, maxWidth: '760px' }}>
            <div style={{ ...eyebrow, marginBottom: '1rem' }}>Preguntas frecuentes</div>
            <h2 className="font-aileron" style={{ fontSize: 'clamp(26px,4vw,42px)', lineHeight: 1, color: '#e8e4dc', marginBottom: '2.5rem' }}>
              {c.faqHeading}
            </h2>
            {c.faqs.map(f => (
              <details key={f.q} style={{ borderTop: '0.5px solid rgba(232,228,220,0.1)', padding: '1.2rem 0' }}>
                <summary style={{ cursor: 'pointer', fontSize: '15px', color: '#e8e4dc', fontWeight: 400 }}>{f.q}</summary>
                <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'rgba(232,228,220,0.62)', fontWeight: 300, marginTop: '0.8rem' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section style={{ ...section, textAlign: 'center', borderBottom: 'none' }}>
          <div style={wrap}>
            <h2 className="font-aileron" style={{ fontSize: 'clamp(26px,4vw,44px)', lineHeight: 1, color: '#e8e4dc', marginBottom: '1.5rem' }}>
              ¿Tienes una idea en mente?
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(232,228,220,0.6)', fontWeight: 300, marginBottom: '2rem' }}>
              Cuéntanos qué quieres tatuarte y te ayudamos a elegir al artista indicado.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/#citas" className="font-aileron" style={btnPrimary}>Agenda tu cita</a>
              <a href={whatsappLink(c.whatsappText)} target="_blank" rel="noopener noreferrer" className="font-aileron" style={btnGhost}>WhatsApp</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
