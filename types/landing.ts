export interface SEOContent {
  title: string
  description: string
  ogImage?: string
}

export interface HeroContent {
  headline: string
  subheadline?: string
  ctaText: string
  ctaHref: string
  backgroundImage?: string
  videoBackground?: string
}

export interface AboutContent {
  title: string
  subtitle?: string
  bio: string
  education: {
    degree: string
    school: string
    period: string
  }[]
  skillsDetail: {
    category: string
    list: string[]
  }[]
}

export interface BenefitItem {
  id: string
  title: string
  description: string
  icon?: string
}

export interface BenefitsContent {
  title: string
  subtitle?: string
  items: BenefitItem[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  description: string[]
}

export interface ExperienceContent {
  title: string
  subtitle?: string
  items: ExperienceItem[]
}

export interface CertificateItem {
  id: string
  name: string
  issuer: string
  date: string
  link?: string
  image?: string
}

export interface CertificatesContent {
  title: string
  subtitle?: string
  items: CertificateItem[]
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  company?: string
  avatar?: string
  content: string
  rating?: number
}

export interface SocialProofContent {
  title: string
  subtitle?: string
  testimonials: TestimonialItem[]
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  ctaText: string
  ctaHref: string
  isPopular?: boolean
}

export interface PricingContent {
  title: string
  subtitle?: string
  plans: PricingPlan[]
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface CTAContent {
  title: string
  description?: string
  ctaText: string
  ctaHref: string
}

export interface ContactContent {
  sectionTitle: string
  title: string
  subtitle: string
  email: string
  location: string
  phone: string
  ctaText: string
}

export interface LandingPageContent {
  campaignName: string
  seoTitle: string
  seoDescription: string
  hero: HeroContent
  about: AboutContent
  benefits: BenefitsContent
  experience: ExperienceContent
  certificates: CertificatesContent
  socialProof: SocialProofContent
  pricing: PricingContent
  faq: FAQItem[]
  cta: CTAContent
  contact: ContactContent
}
