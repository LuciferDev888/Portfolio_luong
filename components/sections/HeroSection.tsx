'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { trackCTAClick } from '@/lib/analytics'

interface HeroSectionProps {
  headline: string
  subheadline?: string
  ctaText: string
  ctaHref: string
  className?: string
}

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  className,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef(0)
  
  const [scrollProgress, setScrollProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSwaying, setIsSwaying] = useState(false)
  
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const swayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Typewriter Loop Variables
  const words = ["Sự đột phá", "Tăng trưởng", "Tối ưu hóa", "Định hướng số liệu"]
  const [currentWordIdx, setCurrentWordIdx] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  // Track CTA click
  const handleClick = () => {
    trackCTAClick(ctaText, 'hero')
  }

  // Load video metadata
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      if (video.readyState >= 1) {
        setDuration(video.duration)
      }

      const handleLoadedMetadata = () => {
        setDuration(video.duration)
      }

      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [])

  // Damped seek animation loop (Inertia Gliding)
  useEffect(() => {
    let animationFrameId: number

    const updateVideoTime = () => {
      const video = videoRef.current
      if (video && video.duration && !isNaN(video.duration)) {
        const targetTime = targetTimeRef.current
        const currentTime = video.currentTime
        const diff = targetTime - currentTime

        // Damped seeking: LERP
        if (Math.abs(diff) > 0.01) {
          video.currentTime = currentTime + diff * 0.06
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoTime)
    }

    animationFrameId = requestAnimationFrame(updateVideoTime)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [duration])

  // Scroll listener to update scroll progress and set target video time
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return

      const container = containerRef.current
      const video = videoRef.current

      const rect = container.getBoundingClientRect()
      const scrolled = -rect.top
      const totalScrollable = rect.height - window.innerHeight

      if (totalScrollable <= 0) return

      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))
      setScrollProgress(progress)

      // 1. Slow down video scrubbing (completes in the first 55% of the scroll)
      const rawVideoProgress = Math.min(1, progress / 0.55)
      const easedVideoProgress = Math.pow(rawVideoProgress, 0.5) // square root curve for deceleration
      const targetDuration = duration || video.duration

      if (targetDuration && !isNaN(targetDuration)) {
        targetTimeRef.current = easedVideoProgress * targetDuration
      }

      // 2. Detect Scroll Stop to trigger Sway Animation
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      if (progress > 0.55) {
        scrollTimeoutRef.current = setTimeout(() => {
          setIsSwaying(true)
          
          if (swayTimeoutRef.current) clearTimeout(swayTimeoutRef.current)
          
          swayTimeoutRef.current = setTimeout(() => {
            setIsSwaying(false)
          }, 1500)
        }, 150)
      } else {
        setIsSwaying(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (swayTimeoutRef.current) clearTimeout(swayTimeoutRef.current)
    }
  }, [duration])

  // Reveal trigger state
  const isVideoFinished = scrollProgress >= 0.55

  // Typewriter Loop Effect
  useEffect(() => {
    if (!isVideoFinished) {
      setCurrentText('')
      setIsDeleting(false)
      return
    }

    const handleType = () => {
      const fullWord = words[currentWordIdx]
      
      if (!isDeleting) {
        // Adding letters
        setCurrentText(fullWord.substring(0, currentText.length + 1))
        setTypingSpeed(100) // regular typing speed
        
        if (currentText === fullWord) {
          setTypingSpeed(2000) // wait before deleting
          setIsDeleting(true)
        }
      } else {
        // Removing letters
        setCurrentText(fullWord.substring(0, currentText.length - 1))
        setTypingSpeed(50) // deleting speed is faster
        
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIdx((prev) => (prev + 1) % words.length)
          setTypingSpeed(300) // pause before writing next word
        }
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIdx, typingSpeed, isVideoFinished])

  // Scroll indicator opacity: fades out quickly as user scrolls down
  const indicatorOpacity = Math.max(0, 1 - scrollProgress * 4)

  return (
    <section
      ref={containerRef}
      className={cn('relative h-[350vh] bg-slate-950 text-slate-50', className)}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        {/* Background Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
        >
          <source src="/video_background_hero/video_background_hero_compressed.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 3. Left-to-right Gradient overlay (Starts from Left edge, fades out towards the middle, using slate-950 for light mode mapping) */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-full lg:w-[58%] bg-gradient-to-r from-slate-950 via-slate-950/45 to-transparent backdrop-blur-[3px] pointer-events-none transition-opacity duration-1000 z-10",
            isVideoFinished ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Hero Split Layout Grid (Nudged down using pt-14 lg:pt-20 to clear navigation) */}
        <div className="relative z-20 max-w-[94%] mx-auto w-full px-4 md:px-8 lg:px-12 pt-14 lg:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Transparent text container sitting on top of the screen gradient */}
          <div
            className={cn(
              "lg:col-span-7 flex flex-col text-left items-start max-w-[620px] bg-transparent border-transparent z-20 transition-all duration-1000 ease-out"
            )}
          >
            
            {/* Xin Chào Subtitle */}
            <div
              style={{ animationDelay: '0ms' }}
              className={cn(
                "text-sm font-extrabold uppercase tracking-widest text-emerald-500 mb-3 transform transition-all duration-700 ease-out",
                isVideoFinished ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
                isSwaying && "animate-sway"
              )}
            >
              Xin chào, tôi là
            </div>

            {/* Artistic Name (Trần Thị Lương) - added pr-12 pb-4 & trailing space to prevent clipping of 'g' tail */}
            <h1
              style={{ animationDelay: '100ms' }}
              className={cn(
                "flex flex-col items-start leading-none mb-6 transform transition-all duration-700 ease-out w-full",
                isVideoFinished ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
              )}
            >
              <span className="text-xl md:text-2xl font-light uppercase tracking-[0.25em] text-slate-350 mb-1">
                Trần Thị
              </span>
              <span className="text-7xl md:text-9xl font-extrabold font-caveat text-transparent bg-clip-text bg-gradient-to-r from-emerald-450 via-emerald-500 to-amber-500 tracking-wide select-none pb-4 pr-12">
                Lương{" "}
              </span>
            </h1>

            {/* Subheadline and description block */}
            <div
              style={{ animationDelay: '200ms' }}
              className={cn(
                "flex flex-col items-start w-full transform transition-all duration-700 ease-out",
                isVideoFinished ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-14",
                isSwaying && "animate-sway"
              )}
            >
              {/* Headline - "CRO với" is merged to single line inside max-w-[620px] container */}
              <h2 className="text-xl md:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug mb-3">
                Tôi đột phá Organic Traffic & CRO với
              </h2>
              
              {/* Highlighted box with Typewriter Loop & fixed min-height to prevent layout shifting */}
              <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-450 font-black text-2xl md:text-4xl tracking-wide rounded-r-md mb-6 shadow-lg min-h-[52px] md:min-h-[58px]">
                {currentText}
                <span className="ml-1.5 animate-pulse font-normal">|</span>
              </div>

              {/* Biography / Description paragraph */}
              <p className="text-sm md:text-base text-slate-200 leading-relaxed font-normal mb-8 max-w-xl">
                Chuyên viên SEO & Growth Marketing chuyên nghiệp. Tối ưu hóa phễu chuyển đổi, gia tăng organic traffic và lập chiến lược tăng trưởng định hướng dữ liệu giúp doanh nghiệp tăng trưởng bền vững.
              </p>
            </div>

            {/* Action Buttons (Pill shaped solid and border outlines) */}
            <div
              style={{ animationDelay: '300ms' }}
              className={cn(
                "flex flex-col sm:flex-row gap-4 justify-start w-full sm:w-auto transform transition-all duration-700 ease-out",
                isVideoFinished ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
                isSwaying && "animate-sway"
              )}
            >
              <a
                href={ctaHref}
                onClick={handleClick}
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 text-sm tracking-wider uppercase text-center min-w-[190px]"
              >
                Liên hệ hợp tác
              </a>
              <a
                href="#benefits"
                className="px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold rounded-full border border-slate-700/60 backdrop-blur-sm transition-all duration-300 ease-in-out text-sm tracking-wider uppercase text-center min-w-[190px] shadow-md flex items-center justify-center gap-1.5"
              >
                Xem dự án <span>↗</span>
              </a>
            </div>

          </div>

          {/* Right Column: Character Image with slide-in from right & hover zoom effect */}
          <div
            style={{ animationDelay: '400ms' }}
            className={cn(
              "lg:col-span-5 flex justify-center items-center z-10 transition-all duration-1000 ease-out transform",
              isVideoFinished ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            )}
          >
            <div 
              className={cn(
                "relative w-full max-w-[340px] lg:max-w-full aspect-[4/5] lg:h-[80vh] rounded-[40px] overflow-hidden border border-neutral-800 bg-neutral-950/20 backdrop-blur-sm shadow-2xl p-2 group transition-all duration-500 hover:scale-105 hover:rotate-1.5 hover:shadow-[0_20px_50px_rgba(220,47,2,0.35)]",
                isSwaying && "animate-sway"
              )}
            >
              <Image
                src="/images/image_character.png"
                alt="Trần Thị Lương character portrait"
                fill
                priority
                className="object-cover rounded-[32px] filter transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div
          style={{
            opacity: indicatorOpacity,
            transform: `translateY(${scrollProgress * -50}px) translateX(-50%)`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
          }}
          className="absolute bottom-6 left-1/2 flex flex-col items-center gap-2 text-slate-350 text-sm font-medium pointer-events-none"
        >
          <span>Cuộn chuột để bắt đầu</span>
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
