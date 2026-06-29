'use client'

import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { ScrollReveal } from '@/components/utils/ScrollReveal'

interface BenefitItem {
  id: string
  title: string
  description: string
  icon?: string
}

interface BenefitsSectionProps {
  title: string
  subtitle?: string
  items: BenefitItem[]
  className?: string
}

export function BenefitsSection({
  title,
  subtitle,
  items,
  className,
}: BenefitsSectionProps) {
  return (
    <section
      id="benefits"
      className={cn(
        'py-28 px-4 bg-slate-950 text-slate-50 relative overflow-hidden border-t border-slate-900 bg-[url("/images/background3.png")] bg-cover bg-right lg:bg-center',
        className
      )}
    >
      {/* Heavy gradient mask: darker on the left where text goes, lighter on the right where the character is */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[94%] mx-auto relative z-10">
        
        {/* Content Layout - Left side contains elements, right side left empty for background girl image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Columns 1-7): Header and Benefits list */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Section Header */}
            <div className="text-left space-y-4">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-50 bg-clip-text">
                  {title}
                </h2>
              </ScrollReveal>
              {subtitle && (
                <ScrollReveal direction="up" delay={100}>
                  <p className="text-base md:text-lg text-slate-350 font-normal leading-relaxed">
                    {subtitle}
                  </p>
                </ScrollReveal>
              )}
            </div>

            {/* Benefits Grid (Vibrant Orange Background cards with White Text) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, idx) => {
                const IconComponent = item.icon && (Icons as any)[item.icon]
                  ? (Icons as any)[item.icon]
                  : Icons.HelpCircle

                return (
                  <ScrollReveal key={item.id} direction="up" delay={idx * 100}>
                    <div className="group relative p-6 bg-emerald-500 border border-emerald-450 rounded-3xl transition-all duration-300 backdrop-blur-sm shadow-2xl overflow-hidden h-full text-slate-950">
                      
                      <div className="relative z-10 flex gap-5 items-start">
                        <div className="flex-shrink-0 p-3 bg-slate-950/20 rounded-xl border border-slate-950/30 text-slate-950 transition-all duration-305">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-950 transition-colors duration-200 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-slate-900 leading-relaxed font-semibold text-xs md:text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>

          </div>

          {/* Right Column (Columns 8-12): Character Image */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <ScrollReveal direction="right" delay={200} className="w-full">
              <div className="relative group max-w-[90%] md:max-w-md mx-auto">
                {/* Soft orange glow backdrop */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-[2.2rem] blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-1.5 rounded-[2.2rem]">
                  <img
                    src="/character_images/3.png"
                    alt="Năng lực"
                    className="w-full h-auto rounded-[2rem] object-cover transition duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
