import { MetadataRoute } from 'next'
import { artists } from '@/lib/artists'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://soulsanchor.com'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...artists.map(a => ({
      url: `${base}/artistas/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
