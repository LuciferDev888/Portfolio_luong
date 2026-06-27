'use client'

import { cn } from '@/lib/utils'
import { trackCTAClick } from '@/lib/analytics'

interface CTAFooterSectionProps {
  title: string
  description?: string
  ctaText: string
  ctaHref: string
  className?: string
}

export function CTAFooterSection({
  title,
  description,
  ctaText,
  ctaHref,
  className,
}: CTAFooterSectionProps) {
  const handleClick = () => {
    trackCTAClick(ctaText, 'footer')
  }

  return (
    <section className={cn('py-24 px-4 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden', className)}>
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-emerald-100 to-emerald-400">
          {title}
        </h2>

        {description && (
          <p className="max-w-2xl mx-auto text-lg text-slate-300 font-light mb-10 leading-relaxed">
            {description}
          </p>
        )}

        <a
          href={ctaHref}
          onClick={handleClick}
          className="inline-block px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          {ctaText}
        </a>
      </div>
    </section>
  )
}

export default CTAFooterSection
