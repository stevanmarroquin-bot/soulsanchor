import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Soul's Anchor Tattoo Studio | Guatemala City, Zona 10",
  description:
    "Estudio de tatuaje personalizado en el corazón de Ciudad de Guatemala, Zona 10. Arte original ejecutado por artistas que dominan su estilo.",
  keywords: "tatuaje, tattoo, guatemala, zona 10, soul's anchor, neo japanese, neo traditional",
  openGraph: {
    title: "Soul's Anchor Tattoo Studio",
    description: "Para los que no le temen a tomar decisiones permanentes.",
    url: "https://soulsanchor.com",
    siteName: "Soul's Anchor",
    locale: "es_GT",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
