import { artists, getArtist } from '@/lib/artists'
import { notFound } from 'next/navigation'
import ArtistClient from './ArtistClient'

export async function generateStaticParams() {
  return artists.map(a => ({ slug: a.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params
  const artist = getArtist(slug)
  if (!artist) notFound()
  return <ArtistClient artist={artist} />
}
