'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  maxSize: number
  color: string
  alpha: number
  decay: number
  sparkleSpeed: number
  sparkleVal: number
  type: 'trail' | 'ambient'
}

export function FairyDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const lastMousePos = useRef<{ x: number; y: number } | null>(null)
  const currentMousePos = useRef<{ x: number; y: number } | null>(null)
  const isMoving = useRef<boolean>(false)

  // Color palette for premium fairy dust (White, Light Yellow, Soft Gold, Warm Orange)
  const COLORS = [
    '#ffffff', // Pure white sparkle
    '#FFE699', // Light yellow sparkle
    '#ffd700', // Gold sparkle
    '#fcdbd3', // Soft brand peach
    '#ff8c69', // Soft orange
    '#e54218', // Brand orange
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Capture mouse coordinate helper
    const getMousePos = (e: MouseEvent) => {
      return {
        x: e.clientX,
        y: e.clientY,
      }
    }

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(e)
      currentMousePos.current = pos
      if (!lastMousePos.current) {
        lastMousePos.current = pos
      }
      isMoving.current = true
    }

    const handleMouseLeave = () => {
      lastMousePos.current = null
      currentMousePos.current = null
      isMoving.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Create a single particle
    const createParticle = (
      x: number,
      y: number,
      type: 'trail' | 'ambient'
    ): Particle => {
      const isTrail = type === 'trail'
      const size = isTrail
        ? Math.random() * 3 + 2.5 // Trail size: 2.5px to 5.5px (restored to original subtle size)
        : Math.random() * 2.2 + 1.2 // Ambient size: 1.2px to 3.4px

      return {
        x,
        y,
        vx: isTrail
          ? (Math.random() - 0.5) * 1.6 // Scatter horizontally (restored to original)
          : (Math.random() - 0.5) * 0.5, // Slow drift
        vy: isTrail
          ? Math.random() * 0.8 + 0.3 // Fall slowly downwards (restored to original)
          : -(Math.random() * 0.4 + 0.15), // Drift slowly upwards
        size,
        maxSize: size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: isTrail ? 1.0 : 0.0, // Ambient starts hidden to fade-in
        decay: isTrail
          ? Math.random() * 0.015 + 0.015 // Decay rate for trail (40-60 frames - restored to original)
          : Math.random() * 0.004 + 0.003, // Decay rate for ambient
        sparkleSpeed: Math.random() * 0.1 + 0.03,
        sparkleVal: Math.random() * Math.PI,
        type,
      }
    }

    // Star rendering path helper (Glow radial circle + 4-pointed star curved inwards)
    const drawSparkle = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      c.save()
      
      // 1. Render soft outer glow circle
      c.beginPath()
      c.arc(cx, cy, size * 2.4, 0, Math.PI * 2)
      c.fillStyle = color
      c.globalAlpha = alpha * 0.16 // Low opacity outer glow
      c.fill()

      // 2. Render crisp 4-point star
      c.globalAlpha = alpha
      c.fillStyle = color
      c.beginPath()
      // Top point
      c.moveTo(cx, cy - size)
      // Top-right curve
      c.quadraticCurveTo(cx, cy, cx + size, cy)
      // Bottom-right curve
      c.quadraticCurveTo(cx, cy, cx, cy + size)
      // Bottom-left curve
      c.quadraticCurveTo(cx, cy, cx - size, cy)
      // Top-left curve
      c.quadraticCurveTo(cx, cy, cx, cy - size)
      c.closePath()
      c.fill()
      c.restore()
    }

    let animationFrameId: number

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1. Process and spawn mouse trail particles along path (interpolated to prevent gaps)
      if (isMoving.current && currentMousePos.current && lastMousePos.current) {
        const dx = currentMousePos.current.x - lastMousePos.current.x
        const dy = currentMousePos.current.y - lastMousePos.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only spawn if mouse has moved a bit
        if (distance > 2) {
          // Restore original step size interpolation
          const steps = Math.min(Math.floor(distance / 4), 6) 
          for (let i = 0; i <= steps; i++) {
            const t = steps === 0 ? 0 : i / steps
            const x = lastMousePos.current.x + dx * t
            const y = lastMousePos.current.y + dy * t

            // Restore original sparse particle counts (1 to 2 particles)
            particlesRef.current.push(createParticle(x, y, 'trail'))
            if (Math.random() > 0.6) {
              particlesRef.current.push(createParticle(x, y, 'trail'))
            }
          }
        }
        lastMousePos.current = currentMousePos.current
        isMoving.current = false
      }

      // 2. Spawn ambient background sparkles if density is low
      const ambientCount = particlesRef.current.filter((p) => p.type === 'ambient').length
      // Increased ambient density target
      const targetAmbient = Math.min(75, Math.floor((canvas.width * canvas.height) / 16000))

      if (ambientCount < targetAmbient && Math.random() < 0.35) {
        const randX = Math.random() * canvas.width
        const randY = Math.random() * canvas.height
        particlesRef.current.push(createParticle(randX, randY, 'ambient'))
      }

      // 3. Update and draw all particles
      const activeParticles: Particle[] = []

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i]

        p.x += p.vx
        p.y += p.y >= canvas.height ? 0 : p.vy // Stop if hits bottom edge of screen space
        
        // Horizontal deceleration to create a drifting effect
        p.vx *= 0.98

        // Twinkle factor
        p.sparkleVal += p.sparkleSpeed
        const twinkle = Math.sin(p.sparkleVal) * 0.25 + 0.75 // values between 0.5 and 1.0

        if (p.type === 'trail') {
          // Trail particles fade out linearly and shrink
          p.alpha -= p.decay
          p.size = p.maxSize * p.alpha
        } else {
          // Ambient particles fade in to peak first, then fade out
          if (p.alpha < 0.75 && p.decay > 0) {
            // Fading in
            p.alpha += 0.025
          } else {
            // Fading out
            p.alpha -= p.decay
          }
        }

        // Draw particle if still alive
        if (p.alpha > 0 && p.size > 0.2) {
          drawSparkle(ctx, p.x, p.y, p.size * twinkle, p.color, Math.min(1.0, Math.max(0, p.alpha)))
          activeParticles.push(p)
        }
      }

      particlesRef.current = activeParticles
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
