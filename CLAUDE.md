# Website Build Blueprint
### How this site was built — clean path, no mistakes

Use this as a step-by-step playbook every time you build a new site with Claude. Follow the order. Skip nothing.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 App Router + TypeScript |
| Styles | Tailwind CSS + inline styles |
| Email | Nodemailer + Gmail App Password |
| Deployment | Vercel (GitHub auto-deploy) |
| DNS | GoDaddy |
| Forms | Custom `/api/contact` route (NOT Formspree — free plan blocks file uploads) |
| SEO/AIO | JSON-LD schema, sitemap.ts, robots.ts, llms.txt |
| Translation | Google Translate (cookie + reload method) |

---

## Phase 1 — Project Setup

### 1.1 Create the repo
Create a GitHub repo. Name it after the site (e.g. `soulsanchor`). Set it to private if needed.

### 1.2 Scaffold Next.js
```bash
npx create-next-app@latest soulsanchor --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd soulsanchor
```

### 1.3 Install dependencies
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### 1.4 Connect to GitHub
```bash
git init
git remote add origin https://github.com/YOUR_USER/soulsanchor.git
git add -A && git commit -m "Initial setup"
git push -u origin main
```

### 1.5 Connect to Vercel
- Go to vercel.com → Add New Project → Import from GitHub
- Select the repo → Deploy (no config needed for Next.js)
- Vercel auto-deploys every push to `main`

---

## Phase 2 — Data Layer

### 2.1 Define your data file
Create `lib/artists.ts` (or `lib/content.ts`) with all your typed data. Example structure:

```typescript
export interface Artist {
  slug: string
  name: string
  nickname?: string       // short display name (for cards/grid)
  startDate: string       // 'YYYY-MM-DD'
  styles: string[]
  bio: string
  instagram?: string
  photo?: string
  styleLabel?: string
  portfolio: { src: string; tag: string | string[]; label: string }[]
}

export const artists: Artist[] = [ ... ]

export function getYearsExperience(startDate: string): number {
  const start = new Date(startDate)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  const m = now.getMonth() - start.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years--
  return years
}

export function getArtist(slug: string) {
  return artists.find(a => a.slug === slug)
}
```

**Rules:**
- `nickname` = short name shown in grid cards
- `name` = full name shown on individual artist page
- Never hardcode content in components — always pull from the data file

---

## Phase 3 — Page Structure

### 3.1 `app/layout.tsx` — Root layout with full SEO + Google Translate

```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: 'Your Site Title | Location',
  description: 'Your meta description (150–160 chars).',
  keywords: 'keyword1, keyword2, keyword3',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'Your Site Title',
    description: 'Your OG description.',
    url: 'https://yourdomain.com',
    siteName: 'Your Site',
    locale: 'es_GT',
    type: 'website',
    images: [{ url: '/logo.png', width: 800, height: 800, alt: 'Your Site' }],
    emails: ['your@email.com'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourhandle',
    title: 'Your Site Title',
    description: 'Your Twitter description.',
  },
}

// JSON-LD: change @type to match your business
// Options: LocalBusiness, TattooParlor, Restaurant, Store, etc.
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  name: 'Your Business Name',
  url: 'https://yourdomain.com',
  image: 'https://yourdomain.com/logo.png',
  description: 'Your business description.',
  email: 'your@email.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Street address',
    addressLocality: 'City',
    addressRegion: 'Region',
    addressCountry: 'GT',
  },
  openingHours: ['Mo-Sa 10:00-19:00'],
  priceRange: 'Q450 – Q∞',
  currenciesAccepted: 'GTQ',
  sameAs: [
    'https://www.instagram.com/yourhandle',
    'https://www.facebook.com/yourhandle',
    'https://www.tiktok.com/@yourhandle',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* Google Translate — initialize only, UI hidden via CSS */}
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
```

### 3.2 `app/globals.css` — Required Google Translate overrides

Add this at the bottom of globals.css. Without it, Google Translate injects an ugly toolbar that breaks the layout:

```css
/* Hide Google Translate default UI entirely */
.goog-te-banner-frame,
.goog-te-balloon-frame,
#goog-gt-tt,
.goog-tooltip,
.goog-tooltip-card {
  display: none !important;
}
.skiptranslate {
  display: none !important;
  visibility: hidden !important;
}
body {
  top: 0 !important;
  position: static !important;
}
.goog-te-gadget {
  display: none !important;
}
```

### 3.3 `app/page.tsx` — Homepage

```typescript
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Acerca from '@/components/Acerca'
import Artistas from '@/components/Artistas'
import Portfolio from '@/components/Portfolio'
import Citas from '@/components/Citas'
import FAQs from '@/components/FAQs'
import Footer from '@/components/Footer'
import FAQSchema from './faq-schema'

export default function Home() {
  return (
    <>
      <FAQSchema />
      <Nav />
      <main style={{ paddingTop: '72px' }}>
        <Hero />
        <Acerca />
        <Artistas />
        <Portfolio />
        <Citas />
        <FAQs />
      </main>
      <Footer />
    </>
  )
}
```

---

## Phase 4 — SEO Files

### 4.1 `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { artists } from '@/lib/artists'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://yourdomain.com'
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
```

### 4.2 `app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

### 4.3 `app/faq-schema.tsx` — FAQ structured data for Google

```typescript
const faqs = [
  { question: '...', answer: '...' },
  // all your FAQs
]

export default function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 4.4 `public/llms.txt` — For AI search engines (ChatGPT, Perplexity, Claude)

Write this in plain prose paragraphs (not bullet lists). AI systems extract information more reliably from flowing text. Include:

- Business name, type, city, URL
- What makes it unique
- All team members / artists with names and specialties
- Services offered
- Pricing
- Hours and address
- Contact info and social media
- How to book

---

## Phase 5 — Contact Form with File Uploads

**Do NOT use Formspree free plan** — it blocks file attachments. Build your own API route.

### 5.1 Gmail App Password setup (one-time)
1. Go to the Gmail account that should receive form submissions
2. Enable 2-Step Verification at myaccount.google.com
3. Go to myaccount.google.com/apppasswords
4. Create an app password → copy the 16-character code

### 5.2 `app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()

    // Extract all your fields
    const nombre = data.get('nombre') as string
    const email = data.get('email') as string
    // ... rest of fields

    // Handle file attachments
    const files = data.getAll('referencias') as File[]
    const attachments = await Promise.all(
      files
        .filter(f => f && f.size > 0)
        .map(async file => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        }))
    )

    await transporter.sendMail({
      from: `"Your Site" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nueva solicitud · ${nombre}`,
      html: `<p>Name: ${nombre}</p><p>Email: ${email}</p>`,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
```

### 5.3 Form component — key pattern

```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)
  setError(null)
  const data = new FormData(e.currentTarget)  // captures files automatically
  try {
    const res = await fetch('/api/contact', { method: 'POST', body: data })
    // DO NOT set Content-Type header — browser sets multipart/form-data automatically
    if (res.ok) {
      setSubmitted(true)
    } else {
      setError('No pudimos enviar tu solicitud. Intenta de nuevo.')
    }
  } catch {
    setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
  } finally {
    setLoading(false)
  }
}
```

### 5.4 Add env vars to Vercel via CLI (fastest method)

```bash
cd your-project
vercel link --yes   # links local folder to Vercel project

printf 'your@gmail.com' | vercel env add GMAIL_USER production --yes
printf 'abcd efgh ijkl mnop' | vercel env add GMAIL_APP_PASSWORD production --yes
```

Then redeploy from the Vercel dashboard (Deployments → three dots → Redeploy) so the new env vars take effect.

---

## Phase 6 — Navigation with Language Toggle

### `components/Nav.tsx` — Two-row mobile, single-row desktop

Key patterns:
- **Two rows on mobile:** Row 1 = logo + hamburger. Row 2 = ES|EN pill + CTA button
- **Single row on desktop:** logo + centered links + ES|EN pill + CTA
- **Language toggle:** Use cookie + reload — NOT DOM manipulation of `.goog-te-combo`
- **Artist names:** Show `nickname || name.split(' ')[0]` in cards/grids. Show full name on individual pages.

```typescript
// CORRECT language toggle — works on all devices including mobile
function useLangToggle() {
  const [lang, setLang] = useState<'es' | 'en'>('es')

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/es\/(\w+)/)
    if (match && match[1] === 'en') setLang('en')
  }, [])

  function setLanguage(target: 'es' | 'en') {
    const host = window.location.hostname
    if (target === 'en') {
      document.cookie = 'googtrans=/es/en; path=/'
      document.cookie = `googtrans=/es/en; path=/; domain=.${host}`
    } else {
      const past = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
      document.cookie = `googtrans=; ${past}`
      document.cookie = `googtrans=; ${past}; domain=.${host}`
    }
    window.location.reload()
  }

  return { lang, setLanguage }
}
```

---

## Phase 7 — Dynamic Artist Pages

### `app/artistas/[slug]/page.tsx`

```typescript
import { artists, getArtist } from '@/lib/artists'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ArtistClient from './ArtistClient'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return artists.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artist = getArtist(slug)
  if (!artist) return {}
  const displayName = artist.nickname || artist.name
  return {
    title: `${displayName} · Tatuador en Guatemala | Soul's Anchor`,
    description: artist.bio.slice(0, 155),
    alternates: { canonical: `/artistas/${slug}` },
    openGraph: {
      title: `${displayName} | Soul's Anchor`,
      description: artist.bio.slice(0, 155),
      url: `https://yourdomain.com/artistas/${slug}`,
      images: artist.photo ? [{ url: artist.photo }] : [{ url: '/logo.png' }],
    },
  }
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params
  const artist = getArtist(slug)
  if (!artist) notFound()

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.name,
    jobTitle: 'Tatuador',
    worksFor: { '@type': 'Organization', name: "Soul's Anchor Tattoo Studio" },
    ...(artist.instagram ? { sameAs: [artist.instagram] } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <ArtistClient artist={artist} />
    </>
  )
}
```

---

## Phase 8 — DNS Setup (GoDaddy → Vercel)

### 8.1 Add domain in Vercel first
Vercel → Project → Settings → Domains → Add `yourdomain.com` and `www.yourdomain.com`
Vercel gives you the exact records to add.

### 8.2 In GoDaddy DNS
Delete any existing conflicting records first:
- Delete: `A @ Parked` (GoDaddy parking record)
- Delete: `CNAME www → yourdomain.com.` (GoDaddy default)

Then add:
| Type | Name | Value |
|---|---|---|
| A | @ | `76.76.21.21` (Vercel's IP — confirm in your Vercel domain settings) |
| CNAME | www | `cname.vercel-dns.com.` (exact value from Vercel) |

### 8.3 Wait for propagation
- Your own browser: usually 5–30 minutes
- Other people's computers: up to 48 hours (normal, not a bug)
- SSL certificate: 2–5 minutes after DNS resolves

**While waiting:** share `yourproject.vercel.app` — it's the same site, always works.

**If someone sees a 404 with Apache styling:** their DNS is still cached on the old host. Fix: flush DNS cache or wait. On Mac: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

---

## Phase 9 — Portfolio / Image Grid Pattern

### Collapsible grid with lazy loading

```typescript
const PREVIEW = 9

export default function Portfolio() {
  const [active, setActive] = useState('Todos')
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)

  const all = pieces.filter(p => active === 'Todos' || p.tag === tagMap[active])
  const visible = expanded ? all : all.slice(0, PREVIEW)
  const hasMore = all.length > PREVIEW

  function handleFilter(f: string) {
    setActive(f)
    setExpanded(false)   // always collapse when changing filter
  }

  return (
    <section>
      {/* Filter tabs */}
      {/* Grid */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1px' }}>
          {visible.map((p, i) => (
            <div key={i} onClick={() => setLightbox(p.src)}>
              <img
                src={p.src}
                alt={p.label}
                loading={i < 3 ? 'eager' : 'lazy'}   // only first 3 eager
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Fade overlay when collapsed */}
        {!expanded && hasMore && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to top, #0a0a08 0%, transparent 100%)', pointerEvents: 'none' }} />
        )}
      </div>

      {/* Expand/collapse button */}
      {hasMore && (
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Ocultar portafolio ↑' : `Ver los ${all.length} trabajos ↓`}
        </button>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,8,0.96)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={lightbox} alt="" style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }} />
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>×</button>
        </div>
      )}
    </section>
  )
}
```

---

## Common Mistakes — Never Do These

| ❌ Mistake | ✅ Correct approach |
|---|---|
| Use Formspree free for file uploads | Build `/api/contact` with Nodemailer |
| Manipulate `.goog-te-combo` for translation | Use `googtrans` cookie + `window.location.reload()` |
| Add Google Translate without hiding its UI | Always add the CSS overrides to globals.css |
| Show full name in artist grid | Show `nickname \|\| name.split(' ')[0]` in grid only |
| Set `Content-Type` header when sending FormData | Let the browser set it automatically |
| Add Vercel env vars via UI (unreliable) | Use `vercel env add KEY production --yes` via CLI |
| Delete old DNS records without confirming | Always confirm with user before deleting DNS records |
| Redeploy via `vercel --prod` CLI | Redeploy from Vercel dashboard (CLI upload can fail) |
| Put JSON-LD in a Client Component | Always put `<script type="application/ld+json">` in Server Components |
| One big nav row on mobile | Two rows: logo+hamburger top, buttons bottom |

---

## Deployment Checklist

Before considering the site done:

- [ ] `soulsanchor.com` loads (not just `.vercel.app`)
- [ ] `www.soulsanchor.com` redirects correctly
- [ ] SSL shows padlock (not "Not Private" warning)
- [ ] Form submits and email arrives at the right inbox with attachments
- [ ] `yourdomain.com/sitemap.xml` shows all pages
- [ ] `yourdomain.com/robots.txt` shows correct rules
- [ ] `yourdomain.com/llms.txt` is accessible
- [ ] ES → EN toggle translates the full page
- [ ] EN → ES restores Spanish correctly
- [ ] Mobile nav shows in two rows
- [ ] Portfolio lazy loads (only first 3 images load eagerly)
- [ ] Lightbox opens and closes on all devices
- [ ] Artist pages have individual meta titles

---

## Project File Map

```
soulsanchor/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          ← Email API with file support
│   ├── artistas/
│   │   └── [slug]/
│   │       ├── page.tsx          ← generateMetadata + JSON-LD Person schema
│   │       └── ArtistClient.tsx  ← Client component (portfolio, lightbox)
│   ├── faq-schema.tsx            ← FAQPage JSON-LD (server component)
│   ├── globals.css               ← Global styles + Google Translate overrides
│   ├── layout.tsx                ← Metadata + LocalBusiness JSON-LD + Translate script
│   ├── page.tsx                  ← Homepage
│   ├── robots.ts                 ← Allows all AI crawlers
│   └── sitemap.ts                ← Auto-generates sitemap for all pages
├── components/
│   ├── Nav.tsx                   ← Two-row mobile nav + ES|EN toggle
│   ├── Hero.tsx
│   ├── Artistas.tsx              ← Shows nickname || firstName in grid
│   ├── Portfolio.tsx             ← Collapsible grid + lazy loading + lightbox
│   ├── Citas.tsx                 ← Form → /api/contact (supports file uploads)
│   ├── FAQs.tsx
│   ├── Footer.tsx
│   └── useScrollReveal.ts
├── lib/
│   └── artists.ts                ← All data, types, helper functions
└── public/
    ├── llms.txt                  ← AI crawler document (prose, not bullets)
    ├── logo.png
    └── [images...]
```
