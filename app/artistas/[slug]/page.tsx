import { artists, getArtist } from '@/lib/artists'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ArtistClient from './ArtistClient'

export async function generateStaticParams() {
  return artists.map(a => ({ slug: a.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artist = getArtist(slug)
  if (!artist) return {}

  const displayName = artist.nickname || artist.name
  const description = artist.bio.length > 155 ? artist.bio.slice(0, 152) + '...' : artist.bio
  const image = artist.photo || '/logo.png'

  return {
    title: `${displayName} · Tatuador en Guatemala | Soul's Anchor`,
    description,
    alternates: {
      canonical: `https://soulsanchor.com/artistas/${slug}`,
    },
    openGraph: {
      title: `${displayName} · Tatuador en Guatemala | Soul's Anchor`,
      description,
      url: `https://soulsanchor.com/artistas/${slug}`,
      siteName: "Soul's Anchor",
      locale: 'es_GT',
      type: 'profile',
      images: [
        {
          url: image,
          alt: displayName,
        },
      ],
    },
  }
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params
  const artist = getArtist(slug)
  if (!artist) notFound()

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.name,
    jobTitle: 'Tatuador',
    worksFor: {
      '@type': 'TattooParlor',
      name: "Soul's Anchor Tattoo Studio",
      url: 'https://soulsanchor.com',
    },
    ...(artist.instagram ? { sameAs: [artist.instagram] } : {}),
    ...(artist.photo ? { image: `https://soulsanchor.com${artist.photo}` } : {}),
    description: artist.bio,
    url: `https://soulsanchor.com/artistas/${artist.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <ArtistClient artist={artist} />
    </>
  )
}
