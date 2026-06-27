'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
  className?: string
}

export function FAQSection({ items, className }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className={cn('py-24 px-4 bg-slate-950 text-white relative', className)}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-300">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-slate-400 font-light">
            Giải đáp một số thắc mắc của đối tác trước khi bắt đầu triển khai dự án.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {items.map((item) => {
            const isOpen = openId === item.id

            return (
              <div
                key={item.id}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left font-medium text-slate-100 hover:text-emerald-400 transition-colors duration-200"
                >
                  <span className="text-base md:text-lg pr-4">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0',
                      isOpen && 'transform rotate-180 text-emerald-400'
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-slate-400 font-light leading-relaxed border-t border-slate-800/50 text-sm md:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
