'use client'

import { useLanguage } from '@/components/context/LanguageContext'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { BenefitsSection } from '@/components/sections/BenefitsSection'
import { CertificatesSection } from '@/components/sections/CertificatesSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { LeadForm } from '@/components/forms/LeadForm'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LandingPageContent } from '@/types/landing'

import viContent from '@/content/luong-portfolio.json'
import enContent from '@/content/luong-portfolio-en.json'

export function LandingPageClient() {
  const { lang } = useLanguage()
  
  // Cast JSON content to LandingPageContent types
  const content = (lang === 'en' ? enContent : viContent) as unknown as LandingPageContent

  return (
    <main className="bg-slate-950 text-slate-50 min-h-screen relative">
      <Header />
      <HeroSection {...content.hero} />
      <AboutSection content={content.about} />
      <ExperienceSection content={content.experience} />
      <BenefitsSection {...content.benefits} />
      <CertificatesSection content={content.certificates} />
      <SocialProofSection {...content.socialProof} />
      <LeadForm campaignName={content.campaignName} content={content.contact} />
      <Footer />
    </main>
  )
}
