'use client'

import { cn } from '@/lib/utils'
import { GraduationCap, Code, Compass, Star } from 'lucide-react'
import { ScrollReveal } from '@/components/utils/ScrollReveal'

interface AboutContent {
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

interface AboutSectionProps {
  content: AboutContent
  className?: string
}

export function AboutSection({ content, className }: AboutSectionProps) {
  if (!content) return null

  return (
    <section
      id="about"
      className={cn(
        'py-28 px-4 bg-slate-950 text-slate-50 relative overflow-hidden border-t border-slate-900 bg-[url("/images/background1.png")] bg-cover bg-right lg:bg-center',
        className
      )}
    >
      {/* Heavy gradient mask: darker on the left where text goes, transparent/lighter on the right where the character is */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
      
      <div className="max-w-[94%] mx-auto relative z-10">
        
        {/* Section Header (Aligned to the left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-7 text-left">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-50 mb-4 bg-clip-text">
                {content.title}
              </h2>
            </ScrollReveal>
            {content.subtitle && (
              <ScrollReveal direction="up" delay={100}>
                <p className="text-base md:text-lg text-slate-350 font-normal leading-relaxed">
                  {content.subtitle}
                </p>
              </ScrollReveal>
            )}
          </div>
        </div>

        {/* Content Layout - Left side contains orange card elements, right side left empty for background girl image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Columns 1-7): Biography, Education & Skills styled with orange background */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Biography (Vibrant Orange Background with White Text) */}
            <ScrollReveal direction="left" delay={150}>
              <div className="bg-emerald-500 border border-emerald-450 p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-2xl text-slate-950">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest mb-4 flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-slate-950" />
                  Câu chuyện của tôi / Biography
                </h3>
                <p className="text-slate-900 leading-relaxed font-semibold text-sm md:text-base">
                  {content.bio}
                </p>
              </div>
            </ScrollReveal>

            {/* Grid for Education and Skills Category details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Education (Vibrant Orange Background with White Text) */}
              <ScrollReveal direction="left" delay={250}>
                <div className="bg-emerald-500 border border-emerald-450 p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-2xl text-slate-950 h-full">
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest mb-6 flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-slate-950" />
                    Học vấn & Bằng cấp / Education
                  </h3>
                  <div className="space-y-6">
                    {content.education.map((edu, idx) => (
                      <div key={idx} className="relative pl-6 border-l-2 border-slate-900/30">
                        {/* Dot indicator */}
                        <span className="absolute -left-2 top-1.5 w-3 h-3 bg-slate-950 rounded-full border-2 border-emerald-500" />
                        <h4 className="text-sm font-black text-slate-950">{edu.degree}</h4>
                        <p className="text-xs text-slate-900 font-semibold mt-0.5">{edu.school}</p>
                        <span className="inline-block mt-2 px-2.5 py-0.5 text-[9px] font-black tracking-wider text-emerald-500 bg-slate-950 rounded-full border border-emerald-450 uppercase">
                          {edu.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Skills badges (Vibrant Orange Background with White Text) */}
              <ScrollReveal direction="left" delay={350}>
                <div className="bg-emerald-500 border border-emerald-450 p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-2xl text-slate-950 h-full space-y-6">
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest flex items-center gap-2.5">
                    <Code className="w-5 h-5 text-slate-950" />
                    Chuyên môn sâu / Focus
                  </h3>
                  
                  <div className="space-y-5">
                    {content.skillsDetail.map((skillGroup, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Star className="w-3 h-3 text-slate-950" />
                          {skillGroup.category}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skillGroup.list.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1.5 bg-slate-950/20 border border-slate-950/30 text-slate-950 text-[10px] font-extrabold rounded-lg transition-colors hover:bg-slate-950/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>

          {/* Right space empty (Columns 8-12) for background girl image */}
          <div className="hidden lg:block lg:col-span-5 h-[10px]" />

        </div>

      </div>
    </section>
  )
}

export default AboutSection
