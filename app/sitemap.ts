import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.qidart.es',
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
