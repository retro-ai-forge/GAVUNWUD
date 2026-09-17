import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gavunwud.xyz'
  const currentDate = new Date()

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Wiki sections - all the sections from your wiki
  const wikiSections = [
    'overview',
    'getting-started',
    'history',
    'character',
    'token-info',
    'technology',
    'token-utility',
    'ecosystem',
    'flappy-wud',
    'flappening-surge',
    'flappy-tips',
    'flappy-nfts',
    'flappy-stats',
    'wud-universe',
    'wudflip',
    'ai-automation',
    'community',
    'partnerships',
    'n3mus-tournaments',
    'bifrost-partnership',
    'graphics-media',
    'future-roadmap',
    'links-resources',
  ]

  const wikiRoutes = wikiSections.map((section) => ({
    url: `${baseUrl}/wiki#${section}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...wikiRoutes]
}
