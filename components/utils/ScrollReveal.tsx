'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  threshold?: number
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.05,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSwaying, setIsSwaying] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const swayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // Trigger once
        }
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  useEffect(() => {
    if (!isVisible) return

    const handleScroll = () => {
      // Turn off sway animation while scrolling is active
      setIsSwaying(false)

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (swayTimeoutRef.current) clearTimeout(swayTimeoutRef.current)

      // Detect scroll stop (triggered 150ms after scroll action ends)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsSwaying(true)

        // Stop swaying after exactly 1 second (1000ms)
        swayTimeoutRef.current = setTimeout(() => {
          setIsSwaying(false)
        }, 1000)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (swayTimeoutRef.current) clearTimeout(swayTimeoutRef.current)
    }
  }, [isVisible])

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-12'
      case 'down':
        return '-translate-y-12'
      case 'left':
        return 'translate-x-12'
      case 'right':
        return '-translate-x-12'
      default:
        return ''
    }
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        'transition-all ease-out transform opacity-0',
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : getDirectionClass(),
        isSwaying && 'animate-sway',
        className
      )}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
