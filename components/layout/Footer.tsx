'use client'

import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Footer() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi')

  useEffect(() => {
    const pathname = window.location.pathname
    if (pathname.endsWith('-en')) {
      setLang('en')
    } else {
      setLang('vi')
    }
  }, [])

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-100 py-16 px-6 md:px-10 relative">
      <div className="max-w-[94%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Column 1: Brand details */}
        <div className="space-y-4 text-left">
          <a
            href="#"
            className="text-xl font-black tracking-tighter text-slate-50 flex items-center gap-1.5"
          >
            <span className="text-emerald-500">L</span>
            <span className="text-slate-50">UONG</span>
          </a>
          <p className="text-sm text-slate-400 font-semibold max-w-xs leading-relaxed">
            {lang === 'vi'
              ? 'Chuyên viên SEO & Growth Marketing chuyên nghiệp. Đồng hành cùng doanh nghiệp đột phá phễu tăng trưởng và CRO hiệu quả.'
              : 'Professional SEO & Growth Marketing specialist. Partnering with businesses to scale growth funnels and optimize CRO.'}
          </p>
        </div>

        {/* Column 2: Contact Info */}
        <div className="space-y-4 text-left">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-50">
            {lang === 'vi' ? 'Liên Hệ Trực Tiếp' : 'Direct Contact'}
          </h4>
          <ul className="space-y-3 text-sm text-slate-400 font-semibold">
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href="mailto:ttluong1909@gmail.com" className="hover:text-emerald-500 transition-colors">
                ttluong1909@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href="tel:0776275793" className="hover:text-emerald-500 transition-colors">
                0776 275 793 (Zalo)
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                {lang === 'vi' ? 'Tân Thuận Tây, Quận 7, Tp. HCM' : 'District 7, Ho Chi Minh City, Vietnam'}
              </span>
            </li>
          </ul>
        </div>

        {/* Column 3: Professional Links */}
        <div className="space-y-4 text-left">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-50">
            {lang === 'vi' ? 'Hành Trình Số' : 'Digital Journey'}
          </h4>
          <ul className="space-y-3 text-sm text-slate-400 font-semibold">
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
              <a
                href="https://quangtritravels.io.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-500 transition-colors"
              >
                quangtritravels.io.vn
              </a>
            </li>
            <li className="text-xs text-slate-500 font-normal">
              {lang === 'vi'
                ? 'Trường Đại học Tài chính - Marketing (UFM)'
                : 'University of Finance - Marketing (UFM)'}
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-[94%] mx-auto border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
        <p>© 2026 Trần Thị Lương. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span>{lang === 'vi' ? 'Thiết kế bởi Antigravity' : 'Designed by Antigravity'}</span>
          <span>•</span>
          <a href="#" className="hover:text-emerald-500 transition-colors">
            {lang === 'vi' ? 'Về đầu trang ↗' : 'Back to top ↗'}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
