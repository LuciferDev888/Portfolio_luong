'use client'

import { cn } from '@/lib/utils'
import { Briefcase, Calendar, Building2 } from 'lucide-react'
import { ScrollReveal } from '@/components/utils/ScrollReveal'

interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  description: string[]
}

interface ExperienceContent {
  title: string
  subtitle?: string
  items: ExperienceItem[]
}

interface ExperienceSectionProps {
  content: ExperienceContent
  className?: string
}

export function ExperienceSection({ content, className }: ExperienceSectionProps) {
  if (!content) return null

  return (
    <section
      id="experience"
      className={cn(
        'py-28 px-4 bg-emerald-500 text-slate-55 relative overflow-hidden border-t border-emerald-450 bg-[url("/images/background2.png")] bg-cover bg-left lg:bg-center',
        className
      )}
    >
      {/* Gradient mask: transparent on the Left (shows desk), solid orange on the Right (text readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-500/80 to-emerald-500 z-0 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      {/* Decorative White Sketch / Line Highlights */}
      <svg className="absolute top-10 right-8 w-56 h-56 text-white/20 pointer-events-none hidden lg:block z-0" viewBox="0 0 100 100" fill="none">
        <path d="M10,80 Q40,20 80,45 T90,90" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
      
      <svg className="absolute bottom-16 left-10 w-72 h-72 text-white/25 pointer-events-none hidden lg:block z-0" viewBox="0 0 100 100" fill="none">
        <path d="M50,50 A30,30 0 1,0 80,50 A20,20 0 1,0 60,50 A10,10 0 1,0 50,50" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
      </svg>

      <div className="max-w-[94%] mx-auto relative z-10">
        
        {/* Section Header (Shifted to the Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-start-6 lg:col-span-7 text-left">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950 bg-clip-text text-transparent bg-gradient-to-r from-slate-950 to-neutral-900">
                {content.title}
              </h2>
            </ScrollReveal>
            {content.subtitle && (
              <ScrollReveal direction="up" delay={100}>
                <p className="text-base md:text-lg text-slate-900 font-bold mt-4 leading-relaxed">
                  {content.subtitle}
                </p>
              </ScrollReveal>
            )}
          </div>
        </div>

        {/* Content Layout - Left side empty for background image, Right side contains timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Columns 1-5): Character Image */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <ScrollReveal direction="left" delay={200} className="w-full">
              <div className="relative group max-w-[90%] md:max-w-md mx-auto">
                {/* Soft white/slate glow backdrop */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white to-slate-200 rounded-[2.2rem] blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-1.5 rounded-[2.2rem]">
                  <img
                    src="/character_images/2.png"
                    alt="Kinh nghiệm"
                    className="w-full h-auto rounded-[2rem] object-cover transition duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (Columns 6-12): Vertical timeline container */}
          <div className="lg:col-span-7 pl-6 md:pl-10 border-l-2 border-slate-950 relative">
            
            {/* Vertical timeline line */}
            <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-slate-950" />

            {/* Timeline Nodes */}
            <div className="space-y-16">
              {content.items.map((item, idx) => (
                <div key={item.id} className="relative group">
                  
                  {/* Bullet node on timeline - Solid black bullet */}
                  <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-50 border-2 border-slate-50 flex items-center justify-center text-emerald-500 shadow-md group-hover:scale-110 transition-all duration-300 z-20">
                    <Briefcase className="w-3 h-3 text-emerald-450" />
                  </span>

                  <ScrollReveal direction="left" delay={idx * 100}>
                    {/* Card wrapper (White Card: bg-slate-950 maps to white in inverted light theme) */}
                    <div className="bg-slate-950 border border-slate-850 hover:border-slate-50 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden text-slate-55">
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 z-10 relative">
                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-extrabold text-slate-50 group-hover:text-emerald-500 transition-colors duration-200">
                            {item.role}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-350 font-bold">
                            <Building2 className="w-4 h-4 text-slate-350" />
                            <span>{item.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 text-emerald-500 text-xs font-black uppercase tracking-wider rounded-full h-fit w-fit shadow-sm">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </div>
                      </div>

                      {/* Job Details List */}
                      <ul className="space-y-3 z-10 relative">
                        {item.description.map((desc, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed font-semibold">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-50 shrink-0" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </ScrollReveal>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default ExperienceSection
