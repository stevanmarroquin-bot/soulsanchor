import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://soulsanchor.com'),
  title: "Soul's Anchor Tattoo Studio | Guatemala City, Zona 10",
  description:
    "Estudio de tatuaje personalizado en el corazón de Ciudad de Guatemala, Zona 10. Arte original ejecutado por artistas que dominan su estilo.",
  keywords: "tatuaje, tattoo, guatemala, zona 10, soul's anchor, neo japanese, neo traditional",
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Soul's Anchor Tattoo Studio",
    description: "Para los que no le temen a tomar decisiones permanentes.",
    url: "https://soulsanchor.com",
    siteName: "Soul's Anchor",
    locale: "es_GT",
    type: "website",
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: "Soul's Anchor Tattoo Studio",
      },
    ],
    emails: ['soulsanchortattoo@gmail.com'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@soulsanchortattoo',
    title: "Soul's Anchor Tattoo Studio | Guatemala City, Zona 10",
    description: "Estudio de tatuaje personalizado en el corazón de Ciudad de Guatemala, Zona 10. Arte original ejecutado por artistas que dominan su estilo.",
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  name: "Soul's Anchor Tattoo Studio",
  url: 'https://soulsanchor.com',
  image: 'https://soulsanchor.com/logo.png',
  description:
    "Estudio de tatuaje personalizado en Ciudad de Guatemala, Zona 10. Arte original ejecutado por 14 artistas especializados en Neo Japonés, Neo Tradicional, Realismo, Blackwork, Tradicional, Anime, Línea fina, Color, Cover Up y Piercing.",
  email: 'soulsanchortattoo@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4 Avenida y 15 Calle esquina, Santander Plaza',
    addressLocality: 'Ciudad de Guatemala',
    addressRegion: 'Zona 10',
    addressCountry: 'GT',
  },
  openingHours: ['Mo-Sa 10:00-19:00'],
  priceRange: 'Q450 – Q∞',
  currenciesAccepted: 'GTQ',
  sameAs: [
    'https://www.instagram.com/soulsanchortattoo',
    'https://www.facebook.com/soulsanchortattoo',
    'https://www.tiktok.com/@soulsanchortattoo',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'es',
                  includedLanguages: 'en',
                  autoDisplay: false,
                }, 'google_translate_element');
              }
            `,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
      </head>
      <body>
        <div id="google_translate_element" style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  )
}
