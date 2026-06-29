import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLandingPageContent } from '@/lib/content'
import { LandingPageClient } from '@/components/sections/LandingPageClient'

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const content = await getLandingPageContent(slug)

  if (!content) return {}

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      images: [{ url: `/og/${slug}.png` }],
    },
  }
}

// Page Component
export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  if (slug !== 'luong-portfolio' && slug !== 'luong-portfolio-en') {
    notFound()
  }

  return <LandingPageClient />
}
