'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadFormSchema, LeadFormData } from '@/lib/validations'
import { trackFormSubmit } from '@/lib/analytics'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/utils/ScrollReveal'

interface LeadFormProps {
  campaignName: string
  className?: string
}

export function LeadForm({ campaignName, className }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [responseMsg, setResponseMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      message: '',
    },
  })

  const onSubmit = async (data: LeadFormData) => {
    setStatus('submitting')
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          campaignName,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setStatus('success')
        setResponseMsg(result.message || 'Cảm ơn bạn đã đăng ký! Tôi sẽ liên hệ sớm nhất.')
        trackFormSubmit(campaignName, true)
        reset()
      } else {
        throw new Error(result.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.')
      }
    } catch (err: any) {
      setStatus('error')
      setResponseMsg(err.message || 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại.')
      trackFormSubmit(campaignName, false)
    }
  }

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
        
        {/* Content Layout - Left side contains form, right side left empty for background girl image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Columns 1-7): Header, description and form body */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Header block */}
            <div className="text-left space-y-4">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-50 bg-clip-text">
                  Kết Nối Cùng Lương
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={100}>
                <p className="text-base text-slate-350 font-normal leading-relaxed">
                  Điền thông tin bên dưới để nhận tư vấn SEO & Growth miễn phí hoặc thảo luận giải pháp tăng trưởng tối ưu cho doanh nghiệp của bạn.
                </p>
              </ScrollReveal>
            </div>

            {/* Form box card (Dịch lại nền Tối với Chữ trắng viền cam để có chiều sâu nổi bật) */}
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl shadow-2xl text-slate-950">
                {status === 'success' ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-bold text-slate-950 mb-2">Đăng Ký Thành Công</h3>
                    <p className="text-slate-900 font-semibold mb-6 text-sm">
                      {responseMsg}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-450 text-slate-50 text-sm font-black rounded-full transition-colors cursor-pointer uppercase tracking-wider"
                    >
                      Gửi phản hồi mới
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {status === 'error' && (
                      <div className="flex gap-3 p-4 bg-red-950/20 border border-red-950/30 text-red-500 rounded-xl text-sm items-center font-bold">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{responseMsg}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-black text-slate-950 mb-2 uppercase tracking-wide">
                          Họ và tên <span className="text-slate-100">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Nguyễn Văn A"
                          {...register('name')}
                          className="w-full px-4 py-3 bg-slate-200 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-155 text-sm font-semibold"
                        />
                        {errors.name && (
                          <p className="text-red-650 text-xs mt-1 font-bold">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-black text-slate-950 mb-2 uppercase tracking-wide">
                          Số điện thoại <span className="text-slate-100">*</span>
                        </label>
                        <input
                          id="phone"
                          type="text"
                          placeholder="0776xxxxxx"
                          {...register('phone')}
                          className="w-full px-4 py-3 bg-slate-200 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-155 text-sm font-semibold"
                        />
                        {errors.phone && (
                          <p className="text-red-650 text-xs mt-1 font-bold">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-black text-slate-950 mb-2 uppercase tracking-wide">
                        Địa chỉ Email <span className="text-slate-100">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        {...register('email')}
                        className="w-full px-4 py-3 bg-slate-200 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-155 text-sm font-semibold"
                      />
                      {errors.email && (
                        <p className="text-red-650 text-xs mt-1 font-bold">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-xs font-black text-slate-950 mb-2 uppercase tracking-wide">
                          Doanh nghiệp / Tổ chức
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder="Tên doanh nghiệp"
                          {...register('company')}
                          className="w-full px-4 py-3 bg-slate-200 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-155 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label htmlFor="website" className="block text-xs font-black text-slate-950 mb-2 uppercase tracking-wide">
                          Địa chỉ Website (nếu có)
                        </label>
                        <input
                          id="website"
                          type="text"
                          placeholder="https://example.com"
                          {...register('website')}
                          className="w-full px-4 py-3 bg-slate-200 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-155 text-sm font-semibold"
                        />
                        {errors.website && (
                          <p className="text-red-650 text-xs mt-1 font-bold">{errors.website.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-black text-slate-950 mb-2 uppercase tracking-wide">
                        Mô tả mục tiêu của bạn
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tôi muốn kiểm tra lỗi Technical SEO hoặc tăng CRO cho website..."
                        {...register('message')}
                        className="w-full px-4 py-3 bg-slate-200 border border-slate-300 rounded-xl text-slate-950 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-155 text-sm resize-none font-semibold"
                      />
                      {errors.message && (
                        <p className="text-red-650 text-xs mt-1 font-bold">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-450 text-slate-50 font-black rounded-full shadow-lg hover:shadow-emerald-500/25 flex justify-center items-center gap-2 transition duration-200 text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Đang gửi thông tin...
                        </>
                      ) : (
                        'Gửi Đăng Ký Tư Vấn'
                      )}
                    </button>
                  </form>
                )}
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
