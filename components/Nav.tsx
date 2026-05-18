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
    // Detect if page is already translated (from cookie)
    const match = document.cookie.match(/googtrans=\/es\/(\w+)/)
    if (match && match[1] === 'en') setLang('en')
  }, [])

  function toggleLang() {
    if (lang === 'es') {
      setLang('en')
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (select) {
        select.value = 'en'
        select.dispatchEvent(new Event('change'))
      }
    } else {
      // Clear translation cookies and reload to restore Spanish
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`
      setLang('es')
      window.location.reload()
    }
  }

  return { lang, toggleLang }
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { lang, toggleLang } = useLangToggle()

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="font-aileron hidden md:block"
            style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              background: 'transparent',
              border: '0.5px solid rgba(232,228,220,0.2)',
              color: 'rgba(232,228,220,0.55)',
              padding: '0.4rem 0.75rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e8e4dc'; e.currentTarget.style.borderColor = 'rgba(232,228,220,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(232,228,220,0.55)'; e.currentTarget.style.borderColor = 'rgba(232,228,220,0.2)' }}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

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
          <div style={{ padding: '1rem 3rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
            <button
              onClick={() => { setMenuOpen(false); toggleLang() }}
              className="font-aileron"
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                background: 'transparent',
                border: '0.5px solid rgba(232,228,220,0.2)',
                color: 'rgba(232,228,220,0.55)',
                padding: '0.7rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {lang === 'es' ? 'View in English' : 'Ver en Español'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
