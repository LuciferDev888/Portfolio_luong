'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X, Globe } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

import { useLanguage } from '@/components/context/LanguageContext'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [opacity, setOpacity] = useState(1) // Default to visible
  const [translateY, setTranslateY] = useState(0) // Default to normal position
  const [isVideoFinished, setIsVideoFinished] = useState(false)
  const { lang, setLanguage } = useLanguage()

  useEffect(() => {
    const pathname = window.location.pathname

    const isLandingPage =
      pathname === '/' ||
      pathname.includes('/luong-portfolio')

    const handleScroll = () => {
      const scrollY = window.scrollY
      const H = window.innerHeight

      if (isLandingPage) {
        const scrollRange = 2.5 * H
        const progress = Math.max(0, Math.min(1, scrollY / scrollRange))

        // Navigation automatically appears when scrollProgress reaches 55%
        if (progress < 0.55) {
          setOpacity(0)
          setTranslateY(-100) // Hidden above screen
          setIsVideoFinished(false)
          setScrolled(false)
        } else {
          setOpacity(1)
          setTranslateY(0) // Completely visible in place
          setIsVideoFinished(true)
          
          // Outer header background stays transparent in hero section, turns white only after scrolling past the video (2.4 * H)
          setScrolled(scrollY > 2.4 * H)
        }
      } else {
        setOpacity(1)
        setTranslateY(0)
        setIsVideoFinished(true)
        setScrolled(scrollY > 50)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Translations for Navigation Links
  const menuTranslations = {
    vi: [
      { label: 'Trang chủ', href: '#' },
      { label: 'Giới thiệu', href: '#about' },
      { label: 'Kỹ năng', href: '#benefits' },
      { label: 'Chứng chỉ', href: '#certificates' },
      { label: 'Dự án', href: '#projects' },
      { label: 'Liên hệ', href: '#lead-form' },
    ],
    en: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#benefits' },
      { label: 'Certificates', href: '#certificates' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#lead-form' },
    ],
  }

  const navLinks = menuTranslations[lang]

  const handleContactClick = (label: string) => {
    trackCTAClick(`Header - ${label}`, 'navigation')
    setIsOpen(false)
  }

  const toggleLanguage = (targetLang: 'vi' | 'en') => {
    if (targetLang === lang) return

    trackCTAClick(`Switch to ${targetLang.toUpperCase()}`, 'language_toggle')
    setLanguage(targetLang)
  }

  return (
    <header
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={cn(
        'fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-350',
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-850/80 shadow-md py-3'
          : 'bg-transparent py-4'
      )}
    >
      
      {/* 1. Left Brand Area: Circular Avatar Logo + Double-line text */}
      <div
        className={cn(
          "flex items-center gap-3 shrink-0 transition-all duration-800 ease-out transform",
          isVideoFinished ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
        )}
      >
        <div className="w-12 h-12 rounded-full border-2 border-emerald-500 bg-slate-900 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
          <Globe className="w-6 h-6 text-emerald-500" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-extrabold text-emerald-500 tracking-tight leading-tight">
            Trần Thị Lương
          </span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">
            SEO & Growth Marketing
          </span>
        </div>
      </div>

      {/* 2. Middle Area: Floating ORANGE Capsule Menu Links */}
      <nav
        className={cn(
          "hidden lg:flex items-center bg-emerald-500 border border-emerald-450 px-8 py-2.5 rounded-full shadow-[0_8px_32px_0_rgba(220,47,2,0.25)] transition-all duration-800 ease-out transform gap-6",
          isVideoFinished ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => handleContactClick(link.label)}
            className="text-[11px] font-black uppercase tracking-widest text-slate-950 hover:text-white transition-colors duration-205 relative group cursor-pointer"
          >
            {link.label}
            {/* Sliding dot indicator */}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-950 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </a>
        ))}
      </nav>

      {/* 3. Right Area: Language Switcher and Solid CTA Button */}
      <div className="flex items-center gap-4 shrink-0">
        
        {/* Language Capsule Selector */}
        <div
          className={cn(
            "hidden sm:flex items-center bg-emerald-500 border border-emerald-450 rounded-full p-0.5 h-8 w-24 shrink-0 transition-all duration-800 ease-out transform shadow-[0_4px_16px_rgba(220,47,2,0.15)]",
            isVideoFinished ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          )}
        >
          <button
            onClick={() => toggleLanguage('vi')}
            className={cn(
              "flex-1 h-full text-[10px] font-black tracking-wider rounded-full transition-all duration-300 uppercase flex items-center justify-center cursor-pointer",
              lang === 'vi' ? 'bg-slate-950 text-emerald-500 shadow-md' : 'text-slate-900 hover:text-slate-950'
            )}
          >
            VI
          </button>
          <button
            onClick={() => toggleLanguage('en')}
            className={cn(
              "flex-1 h-full text-[10px] font-black tracking-wider rounded-full transition-all duration-300 uppercase flex items-center justify-center cursor-pointer",
              lang === 'en' ? 'bg-slate-950 text-emerald-500 shadow-md' : 'text-slate-900 hover:text-slate-950'
            )}
          >
            EN
          </button>
        </div>

        {/* CTA "LIÊN HỆ NGAY" Button */}
        <div
          className={cn(
            "hidden sm:block transition-all duration-800 ease-out transform shrink-0",
            isVideoFinished ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
          )}
        >
          <a
            href="#lead-form"
            onClick={() => handleContactClick('LIÊN HỆ NGAY')}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-450 text-slate-950 text-[11px] font-black tracking-widest rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 uppercase"
          >
            {lang === 'vi' ? 'Liên hệ ngay' : 'Contact now'}
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-100 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute left-6 right-6 top-full mt-3 bg-slate-950/95 border border-slate-900 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 backdrop-blur-xl">
          <nav className="flex flex-col gap-3.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold uppercase tracking-wide text-slate-300 hover:text-emerald-500 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Mobile Language and Contact */}
          <div className="flex items-center justify-between border-t border-slate-900 pt-4 mt-2">
            <button
              onClick={() => toggleLanguage(lang === 'vi' ? 'en' : 'vi')}
              className="text-xs font-bold text-slate-300 flex items-center gap-1.5 hover:text-emerald-500"
            >
              <Globe className="w-4 h-4" />
              Ngôn ngữ / Lang: {lang === 'vi' ? 'Tiếng Việt' : 'English'}
            </button>
            <a
              href="#lead-form"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-emerald-500 text-slate-55 text-xs font-bold rounded-full uppercase"
            >
              {lang === 'vi' ? 'Liên hệ ngay' : 'Contact now'}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
