import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { CertificatesSection } from '@/components/sections/CertificatesSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { LeadForm } from '@/components/forms/LeadForm'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getLandingPageContent } from '@/lib/content'

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
  const content = await getLandingPageContent(slug)

  if (!content) notFound()

  return (
    <main className="bg-slate-950 text-slate-50 min-h-screen relative">
      <Header />
      <HeroSection {...content.hero} />
      <AboutSection content={content.about} />
      <ExperienceSection content={content.experience} />
      <BenefitsSection {...content.benefits} />
      <CertificatesSection content={content.certificates} />
      <SocialProofSection {...content.socialProof} />
      <LeadForm campaignName={content.campaignName} />
      <Footer />
    </main>
  )
}
