'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'
import { ScrollReveal } from '@/components/utils/ScrollReveal'

interface PricingPlan {
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

interface PricingSectionProps {
  title: string
  subtitle?: string
  plans: PricingPlan[]
  className?: string
}

export function PricingSection({
  title,
  subtitle,
  plans,
  className,
}: PricingSectionProps) {
  return (
    <section
      id="services"
      className={cn(
        'py-28 px-4 bg-emerald-500 text-slate-950 border-t border-emerald-450 relative overflow-hidden',
        className
      )}
    >
      <div className="absolute top-10 right-10 w-96 h-96 bg-white/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[94%] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950">
              {title}
            </h2>
          </ScrollReveal>
          {subtitle && (
            <ScrollReveal direction="up" delay={100}>
              <p className="text-base md:text-lg text-slate-900 font-bold leading-relaxed">
                {subtitle}
              </p>
            </ScrollReveal>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, idx) => {
            const handlePlanClick = () => {
              trackCTAClick(`${plan.name} - ${plan.ctaText}`, 'pricing')
            }

            return (
              <ScrollReveal key={plan.id} direction="up" delay={idx * 150} className="h-full flex">
                <div
                  className={cn(
                    'relative flex flex-col justify-between p-8 rounded-[28px] border transition-all duration-300 backdrop-blur-sm w-full h-full',
                    plan.isPopular
                      ? 'bg-slate-950 border-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white md:scale-105'
                      : 'bg-white border-white text-slate-950 shadow-xl'
                  )}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                      Đề xuất nhiều nhất
                    </span>
                  )}

                  <div>
                    <h3 className={cn(
                      "text-2xl font-black mb-3",
                      plan.isPopular ? "text-slate-50" : "text-slate-950"
                    )}>
                      {plan.name}
                    </h3>
                    {plan.description && (
                      <p className={cn(
                        "text-sm font-semibold mb-6 leading-relaxed",
                        plan.isPopular ? "text-slate-350" : "text-slate-600"
                      )}>
                        {plan.description}
                      </p>
                    )}

                    <div className="flex items-baseline gap-1 mb-8">
                      <span className={cn(
                        "text-4xl font-black",
                        plan.isPopular ? "text-emerald-500" : "text-slate-950"
                      )}>
                        {plan.price}
                      </span>
                      <span className="text-sm font-bold">₫</span>
                      {plan.period && (
                        <span className={cn(
                          "text-xs font-semibold ml-1.5",
                          plan.isPopular ? "text-slate-400" : "text-slate-500"
                        )}>
                          / {plan.period}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={cn(
                            "w-5 h-5 shrink-0 mt-0.5",
                            plan.isPopular ? "text-emerald-500" : "text-emerald-600"
                          )} />
                          <span className={cn(
                            "text-sm leading-snug font-semibold",
                            plan.isPopular ? "text-slate-300" : "text-slate-700"
                          )}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={plan.ctaHref}
                    onClick={handlePlanClick}
                    className={cn(
                      'w-full py-3.5 px-6 font-black rounded-full transition-all duration-200 text-center text-xs uppercase tracking-wider shadow-md cursor-pointer',
                      plan.isPopular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-emerald-500/20'
                        : 'bg-slate-950 hover:bg-slate-900 text-white'
                    )}
                  >
                    {plan.ctaText}
                  </a>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default PricingSection
