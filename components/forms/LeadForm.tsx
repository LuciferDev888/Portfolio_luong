'use client'

import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/utils/ScrollReveal'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { ContactContent } from '@/types/landing'
import { trackCTAClick } from '@/lib/analytics'

interface LeadFormProps {
  campaignName: string
  content?: ContactContent
  className?: string
}

export function LeadForm({ campaignName, content, className }: LeadFormProps) {
  return (
    <section
      id="lead-form"
      className={cn(
        'py-28 px-4 bg-slate-950 text-slate-50 relative overflow-hidden border-t border-slate-900 bg-[url("/images/background6.png")] bg-cover bg-right lg:bg-center',
        className
      )}
    >
      {/* Heavy gradient mask: darker on the left where form goes, lighter on the right where the character is */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[94%] mx-auto relative z-10">
        
        {/* Content Layout - Left side contains card, right side left empty for background girl image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Columns 1-7): Header, description and contact card */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header block */}
            <div className="text-left space-y-3">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-50 bg-clip-text">
                  {content?.sectionTitle || 'Kết nối với tôi'}
                </h2>
              </ScrollReveal>
            </div>

            {/* Redesigned Contact Card */}
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-emerald-50 border border-emerald-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-slate-100 space-y-8">
                
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3.5xl font-black tracking-tight text-slate-100">
                    {content?.title || "Let's work together! 🍃"}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-xl">
                    {content?.subtitle || "I'm open to internships, collaborations and exciting opportunities."}
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Email */}
                  <div className="flex items-center gap-4 text-base md:text-lg font-bold">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-emerald-500" />
                    </div>
                    <a
                      href={`mailto:${content?.email || 'ttluong1909@gmail.com'}`}
                      onClick={() => trackCTAClick('Contact Card - Email', 'email')}
                      className="hover:underline hover:text-emerald-500 transition-all text-slate-100"
                    >
                      {content?.email || 'ttluong1909@gmail.com'}
                    </a>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4 text-base md:text-lg font-bold">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-slate-100">
                      {content?.location || 'Tân Thuận Tây, Quận 7, Tp. HCM'}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 text-base md:text-lg font-bold">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-emerald-500" />
                    </div>
                    <a
                      href={`tel:${(content?.phone || '0776 275 793').replace(/\s+/g, '').split('(')[0]}`}
                      onClick={() => trackCTAClick('Contact Card - Phone', 'phone')}
                      className="hover:underline hover:text-emerald-500 transition-all text-slate-100"
                    >
                      {content?.phone || '0776 275 793 (Zalo)'}
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${content?.email || 'ttluong1909@gmail.com'}`}
                    onClick={() => trackCTAClick('Contact Card - Say Hello Button', 'cta_button')}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5 transition-all duration-200 uppercase text-xs tracking-wider"
                  >
                    {content?.ctaText || 'Say Hello'}
                    <Send className="w-4 h-4 ml-1" />
                  </a>
                </div>

              </div>
            </ScrollReveal>

          </div>
          
          {/* Right space empty (Columns 8-12) for background girl alignment */}
          <div className="hidden lg:block lg:col-span-5 h-[10px]" />
          
        </div>
      </div>
    </section>
  )
}

export default LeadForm
