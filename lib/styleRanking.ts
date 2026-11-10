// Order in which artists are recommended on each style page (/tatuajes/[style]).
// First = recommended first. Slugs match lib/artists.ts ('leo' = Polaco).
// Ranked by Stevan on 2026-11-10. 'daniel' is pending: not yet in lib/artists.ts.

export interface StyleRanking {
  slug: string // URL: /tatuajes/[slug]
  name: string
  artists: string[]
}

export const styleRankings: StyleRanking[] = [
  { slug: 'realismo', name: 'Realismo', artists: ['jony', 'rafa', 'pepe', 'luis', 'omar'] },
  { slug: 'black-and-gray', name: 'Black and Gray', artists: ['jony', 'omar', 'stevan', 'chejo'] },
  {
    slug: 'linea-fina',
    name: 'Línea fina',
    // Middle order is a draft pending Stevan's confirmation; Pepe first and Pablo last are confirmed.
    artists: ['pepe', 'ally', 'omar', 'zoldyck', 'rafa', 'daniel', 'stevan', 'matty', 'chejo', 'luis', 'leo', 'pablo'],
  },
  { slug: 'tradicional', name: 'Tradicional', artists: ['matty', 'leo', 'pablo', 'omar'] },
  { slug: 'neo-tradicional', name: 'Neo tradicional', artists: ['omar', 'stevan', 'daniel'] },
  { slug: 'neo-japones', name: 'Neo japonés', artists: ['stevan', 'omar'] },
  {
    slug: 'ilustrativo',
    name: 'Ilustrativo',
    artists: ['stevan', 'omar', 'zoldyck', 'rafa', 'ally', 'daniel', 'matty', 'chejo', 'luis', 'leo', 'pablo'],
  },
  {
    slug: 'color',
    name: 'Color',
    artists: ['stevan', 'omar', 'daniel', 'ally', 'matty', 'chejo', 'rafa', 'leo', 'pablo', 'luis'],
  },
  {
    slug: 'blackwork',
    name: 'Blackwork',
    artists: ['zoldyck', 'ally', 'omar', 'daniel', 'stevan', 'matty', 'chejo', 'rafa', 'luis', 'leo', 'pablo'],
  },
  {
    slug: 'anime',
    name: 'Anime',
    artists: ['zoldyck', 'ally', 'omar', 'daniel', 'stevan', 'matty', 'chejo', 'rafa', 'luis', 'leo', 'pablo'],
  },
  {
    slug: 'cover-up',
    name: 'Cover up',
    artists: ['stevan', 'rafa', 'omar', 'zoldyck', 'ally', 'daniel', 'matty', 'chejo', 'luis', 'leo', 'pablo'],
  },
  { slug: 'piercing', name: 'Piercing', artists: ['focho', 'sofy'] },
]
