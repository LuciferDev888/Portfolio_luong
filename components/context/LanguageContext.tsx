'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'vi' | 'en'

interface LanguageContextProps {
  lang: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('vi')

  useEffect(() => {
    // Detect language from URL on client mount
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      if (pathname.endsWith('-en')) {
        setLang('en')
      } else {
        setLang('vi')
      }
    }
  }, [])

  const setLanguage = (newLang: Language) => {
    setLang(newLang)
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      let newPath = pathname
      if (newLang === 'en') {
        if (!pathname.endsWith('-en')) {
          newPath = pathname + '-en'
        }
      } else {
        newPath = pathname.replace(/-en$/, '')
      }
      
      // Update display URL instantly without reloading
      if (newPath !== pathname) {
        window.history.pushState(null, '', newPath)
      }
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
