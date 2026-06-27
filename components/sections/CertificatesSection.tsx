'use client'

import { cn } from '@/lib/utils'
import { Award, Calendar, CheckCircle } from 'lucide-react'
import { ScrollReveal } from '@/components/utils/ScrollReveal'

interface CertificateItem {
  id: string
  name: string
  issuer: string
  date: string
  link?: string
  image?: string
}

interface CertificatesContent {
  title: string
  subtitle?: string
  items: CertificateItem[]
}

interface CertificatesSectionProps {
  content: CertificatesContent
  className?: string
}

export function CertificatesSection({ content, className }: CertificatesSectionProps) {
  if (!content) return null

  return (
    <section
      id="certificates"
      className={cn(
        'py-28 px-4 bg-slate-950 text-slate-50 relative overflow-hidden border-t border-slate-900 bg-[url("/images/background4.png")] bg-cover bg-left lg:bg-center',
        className
      )}
    >
      {/* Light-gradient mask: transparent on the left, darker/solid-light on the right for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/85 to-slate-950/98 z-0 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[94%] mx-auto relative z-10">
        
        {/* Section Header (Shifted to the Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-start-6 lg:col-span-7 text-left">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-50 bg-clip-text">
                {content.title}
              </h2>
            </ScrollReveal>
            {content.subtitle && (
              <ScrollReveal direction="up" delay={100}>
                <p className="text-base md:text-lg text-slate-350 font-semibold leading-relaxed">
                  {content.subtitle}
                </p>
              </ScrollReveal>
            )}
          </div>
        </div>

        {/* Content Layout - Left side empty for background image, Right side contains certificates cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Columns 1-5) left empty to show background character */}
          <div className="hidden lg:block lg:col-span-5 h-[10px]" />

          {/* Right Column (Columns 6-12): Certificates grid */}
          <div className="lg:col-span-7 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.items.map((item, idx) => (
                <ScrollReveal key={item.id} direction="up" delay={idx * 80}>
                  <div className="group flex gap-4 p-5 bg-emerald-500 border border-emerald-450 rounded-3xl transition-all duration-300 backdrop-blur-sm shadow-xl relative overflow-hidden h-full text-slate-950">
                    
                    {/* Award Icon Wrapper */}
                    <div className="flex-shrink-0 p-3 bg-slate-950/20 rounded-xl border border-slate-950/30 text-slate-950 transition-all duration-350 h-fit">
                      <Award className="w-5 h-5" />
                    </div>

                    {/* Content Details */}
                    <div className="flex flex-col justify-between space-y-2 relative z-10">
                      <div>
                        <h3 className="text-sm font-black text-slate-950 mb-1 leading-snug">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] text-slate-900 font-bold">
                          <span className="text-slate-950 font-black">{item.issuer}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-slate-950 font-black tracking-wide uppercase mt-1">
                        <CheckCircle className="w-3.5 h-3.5 text-slate-950" />
                        Đã chứng thực
                      </div>
                    </div>
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

export default CertificatesSection
