'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Acerca', anchor: '#acerca' },
  { label: 'Artistas', anchor: '#artistas' },
  { label: 'FAQs', anchor: '#faqs' },
]

function useLangToggle() {
  const [lang, setLang] = useState<'es' | 'en'>('es')

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/es\/(\w+)/)
    if (match && match[1] === 'en') setLang('en')
  }, [])

  function setLanguage(target: 'es' | 'en') {
    if (target === 'en') {
      document.cookie = 'googtrans=/es/en; path=/'
      document.cookie = `googtrans=/es/en; path=/; domain=.${window.location.hostname}`
    } else {
      const past = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
      document.cookie = `googtrans=; ${past}`
      document.cookie = `googtrans=; ${past}; domain=.${window.location.hostname}`
    }
    window.location.reload()
  }

  return { lang, setLanguage }
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { lang, setLanguage } = useLangToggle()

  function resolveHref(l: typeof links[0]) {
    return isHome ? l.anchor : `/${l.anchor}`
  }

  const citasHref = isHome ? '#citas' : '/#citas'

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10,10,8,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '0.5px solid rgba(232,228,220,0.1)',
      }}
    >
      {/* Main bar */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.2rem, 4vw, 3rem)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 0',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src="/logo.png" alt="Soul's Anchor" style={{ height: '52px', width: 'auto', display: 'block', background: 'transparent' }} />
        </a>

        {/* Desktop nav links — center */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={resolveHref(l)}
              style={{
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(232,228,220,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontWeight: 400,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#e8e4dc')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,228,220,0.55)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA — right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language toggle — visible on all screen sizes */}
          <div style={{ display: 'flex', background: 'rgba(232,228,220,0.06)', border: '0.5px solid rgba(232,228,220,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className="font-aileron"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  padding: '0.38rem 0.65rem',
                  cursor: lang === l ? 'default' : 'pointer',
                  border: 'none',
                  background: lang === l ? '#e8e4dc' : 'transparent',
                  color: lang === l ? '#0a0a08' : 'rgba(232,228,220,0.45)',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href={citasHref}
            style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: '#e8e4dc',
              color: '#0a0a08',
              padding: '0.6rem 1.5rem',
              textDecoration: 'none',
              fontFamily: 'AileronHeavy, sans-serif',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Agenda tu cita
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: '#e8e4dc', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: '#e8e4dc', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: '#e8e4dc', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </div>

      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(10,10,8,0.99)', borderTop: '0.5px solid rgba(232,228,220,0.08)' }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={resolveHref(l)}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(232,228,220,0.65)',
                textDecoration: 'none',
                padding: '1.1rem 3rem',
                borderBottom: '0.5px solid rgba(232,228,220,0.05)',
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ padding: '1rem 3rem 1.5rem' }}>
            <a
              href={citasHref}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#0a0a08',
                background: '#e8e4dc',
                textDecoration: 'none',
                padding: '0.85rem',
                textAlign: 'center',
                fontFamily: 'AileronHeavy, sans-serif',
              }}
            >
              Agenda tu cita
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
