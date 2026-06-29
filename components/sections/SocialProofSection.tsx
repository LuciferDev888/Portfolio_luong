'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { ScrollReveal } from '@/components/utils/ScrollReveal'
import { useLanguage } from '@/components/context/LanguageContext'

interface TestimonialItem {
  id: string
  name: string
  role: string
  company?: string
  avatar?: string
  content: string
  rating?: number
}

interface SocialProofSectionProps {
  title: string
  subtitle?: string
  testimonials: TestimonialItem[]
  className?: string
}

export function SocialProofSection({
  title,
  subtitle,
  testimonials,
  className,
}: SocialProofSectionProps) {
  const { lang } = useLanguage()
  return (
    <section
      id="projects"
      className={cn(
        'py-28 px-4 bg-slate-950 text-slate-55 relative overflow-hidden border-t border-slate-900 bg-[url("/images/background5.png")] bg-cover bg-right lg:bg-center',
        className
      )}
    >
      {/* Heavy gradient mask: darker on the left where text goes, lighter on the right where the character is */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[94%] mx-auto relative z-10">
        
        {/* Content Layout - Left side contains elements, right side left empty for background girl image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Columns 1-7): Header and Testimonials grid */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Section Header */}
            <div className="text-left space-y-4">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-50">
                  {title}
                </h2>
              </ScrollReveal>
              {subtitle && (
                <ScrollReveal direction="up" delay={100}>
                  <p className="text-base md:text-lg text-slate-350 font-semibold leading-relaxed">
                    {subtitle}
                  </p>
                </ScrollReveal>
              )}
            </div>

            {/* Testimonial Cards (Floating clean Cards adapting to Light Theme) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {testimonials.map((item, idx) => (
                <ScrollReveal key={item.id} direction="up" delay={idx * 150}>
                  <div className="flex flex-col justify-between p-8 bg-slate-900 border border-slate-800 rounded-[28px] shadow-xl hover:shadow-2xl transition-all duration-300 relative h-full text-slate-50">
                    {/* Top Quote Icon */}
                    <div className="absolute top-6 right-8 text-slate-200 pointer-events-none">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 21v-7.391c0-5.704 3.748-9.762 9-10.961l.653 1.414c-4.017 1.18-6.185 4.155-6.233 7.89H21V21h-6.983zM2 21v-7.391c0-5.704 3.748-9.762 9-10.961l.653 1.414C7.636 5.282 5.468 8.257 5.42 11.993H9V21H2z" />
                      </svg>
                    </div>

                    <div>
                      {/* Star Rating */}
                      {item.rating && (
                        <div className="flex gap-1 mb-5">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-4.5 h-4.5 fill-emerald-500 text-emerald-500" />
                          ))}
                        </div>
                      )}

                      <blockquote className="text-slate-350 italic text-base leading-relaxed mb-6 font-semibold">
                        "{item.content}"
                      </blockquote>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mt-4 pt-6 border-t border-slate-800">
                      {item.avatar && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-850 bg-slate-900">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <cite className="not-italic font-extrabold text-slate-50 block">
                          {item.name}
                        </cite>
                        <span className="text-xs text-emerald-500 font-black uppercase tracking-wider mt-0.5 block">
                          {item.role} {item.company && `• ${item.company}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>

          {/* Right Column (Columns 8-12): Projects Showcase Grid */}
          <div className="lg:col-span-5 space-y-6 w-full text-left">
            <ScrollReveal direction="right" delay={150}>
              <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest mb-4">
                {lang === 'en' ? 'Featured Projects' : 'Dự Án Thực Chiến'}
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-6">
              {[
                { src: '/project/a.png', alt: 'E-Clean Vietnam' },
                { src: '/project/b.png', alt: 'EduHub Academic' },
                { src: '/project/c.png', alt: 'SEO Audit Showcase' },
              ].map((proj, index) => (
                <ScrollReveal key={index} direction="right" delay={200 + index * 100}>
                  <div className="group relative rounded-[2rem] overflow-hidden border border-slate-800 shadow-xl bg-slate-900/40 p-2 transition-all duration-300 hover:border-emerald-500/30">
                    <img
                      src={proj.src}
                      alt={proj.alt}
                      className="w-full h-auto rounded-[1.8rem] object-cover transition duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SocialProofSection
