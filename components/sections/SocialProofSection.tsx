'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { useLanguage } from '@/components/context/LanguageContext'
import { useRef, useState, useEffect } from 'react'

interface TestimonialItem {
  id: string
  name: string
  role: string
  company?: string
  avatar?: string
  content: string
  rating?: number
  image?: string
  tasks?: string[]
  metrics?: string[]
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const totalHeight = rect.height
      const viewportHeight = window.innerHeight
      
      const scrollableDistance = totalHeight - viewportHeight
      if (scrollableDistance <= 0) return

      const progress = -rect.top / scrollableDistance
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const activeIdx = Math.round(scrollProgress * (testimonials.length - 1))

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={cn(
        'relative w-full h-[300vh] bg-slate-950 text-slate-55 border-t border-slate-900 overflow-visible',
        className
      )}
    >
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[url('/images/background5.png')] bg-cover bg-right lg:bg-center flex items-center">
        
        {/* Background Overlay Masks */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

        {/* Section title & subtitle - Fixed at top left */}
        <div className="absolute top-8 sm:top-12 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left pointer-events-none">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-slate-50 leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm md:text-base text-slate-400 font-semibold leading-relaxed mt-1 sm:mt-2">
                {subtitle}
              </p>
            )}
          </div>

          {/* Active project name with smooth fade-in */}
          <div className="relative h-12 w-full md:w-[350px] hidden md:flex items-center md:justify-end mt-2 md:mt-0">
            {testimonials.map((item, idx) => {
              const isActive = activeIdx === idx
              return (
                <div
                  key={item.id}
                  className={cn(
                    "absolute md:right-0 text-xl sm:text-2xl md:text-3.5xl font-black text-emerald-400 tracking-wider transition-all duration-500 ease-out transform",
                    isActive
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                  )}
                >
                  — {item.company}
                </div>
              )
            })}
          </div>
        </div>

        {/* Horizontal scroll slides container */}
        <div
          className="flex h-full items-center transition-transform duration-100 ease-out"
          style={{
            width: `${testimonials.length * 100}vw`,
            transform: `translate3d(-${scrollProgress * (testimonials.length - 1) * 100}vw, 0, 0)`,
          }}
        >
          {testimonials.map((item, idx) => {
            const isActive = activeIdx === idx
            return (
              <div
                key={item.id}
                className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative px-6 md:px-12 lg:px-20 pt-28 pb-12 select-none"
              >
                <div
                  className={cn(
                    "max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center transition-all duration-700 ease-out",
                    isActive ? "opacity-100 scale-100" : "opacity-40 scale-95"
                  )}
                >
                  {/* Left Column: Project Screenshot */}
                  <div className="lg:col-span-6 flex items-center justify-center w-full">
                    <div className="relative group rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/40 p-2 transition-all duration-500 hover:border-emerald-500/30 w-full max-w-[450px] lg:max-w-none">
                      <div className="relative aspect-[16/10] w-full rounded-[1.8rem] overflow-hidden min-h-[160px] sm:min-h-[240px] lg:min-h-[340px]">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={idx === 0}
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Right Column: Review, Tasks, Metrics */}
                  <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-[2rem] shadow-2xl space-y-6 w-full max-w-[500px] lg:max-w-none max-h-[45vh] lg:max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                    
                    {/* Top Section: Quote and Rating */}
                    <div className="relative">
                      {/* Quote Icon */}
                      <div className="absolute -top-2 right-0 text-slate-700 pointer-events-none opacity-40">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.748-9.762 9-10.961l.653 1.414c-4.017 1.18-6.185 4.155-6.233 7.89H21V21h-6.983zM2 21v-7.391c0-5.704 3.748-9.762 9-10.961l.653 1.414C7.636 5.282 5.468 8.257 5.42 11.993H9V21H2z" />
                        </svg>
                      </div>

                      {/* Stars */}
                      {item.rating && (
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                          ))}
                        </div>
                      )}

                      {/* Content */}
                      <blockquote className="text-slate-200 italic text-sm sm:text-base leading-relaxed font-medium">
                        "{item.content}"
                      </blockquote>
                    </div>

                    {/* Middle Section: Job Tasks & Metrics */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                      
                      {/* Tasks */}
                      {item.tasks && item.tasks.length > 0 && (
                        <div className="space-y-2 text-left">
                          <h4 className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest">
                            {lang === 'en' ? 'Key Responsibilities' : 'Công việc thực hiện'}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.tasks.map((task, tIdx) => (
                              <span
                                key={tIdx}
                                className="bg-slate-950/80 border border-slate-850 text-slate-300 text-[10px] sm:text-[11px] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-semibold transition-all duration-300 hover:border-emerald-500/30"
                              >
                                {task}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Metrics */}
                      {item.metrics && item.metrics.length > 0 && (
                        <div className="space-y-2 text-left">
                          <h4 className="text-[10px] sm:text-[11px] font-black text-emerald-400 uppercase tracking-widest">
                            {lang === 'en' ? 'Key Achievements' : 'Kết quả đạt được'}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.metrics.map((metric, mIdx) => (
                              <span
                                key={mIdx}
                                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-[11px] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:bg-emerald-500/20 transition-all duration-300"
                              >
                                {metric}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Bottom Section: Author Details */}
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                      {item.avatar && (
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-slate-700 bg-slate-950 shadow-md">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="text-left">
                        <cite className="not-italic font-extrabold text-slate-100 block text-xs sm:text-sm">
                          {item.name}
                        </cite>
                        <span className="text-[9px] sm:text-[10px] text-emerald-500 font-black uppercase tracking-wider mt-0.5 block">
                          {item.role} {item.company && `• ${item.company}`}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Indicators at the bottom left */}
        <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 z-20 flex gap-2">
          {testimonials.map((_, idx) => {
            const isActive = activeIdx === idx
            return (
              <div
                key={idx}
                className={cn(
                  'h-1.5 sm:h-2 rounded-full transition-all duration-300',
                  isActive ? 'w-6 sm:w-8 bg-emerald-500' : 'w-1.5 sm:w-2 bg-slate-700 hover:bg-slate-650'
                )}
              />
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default SocialProofSection
