import { useEffect, useState } from 'react'
import { useAppStore } from '../store/useAppStore'

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMouseOnly, setIsMouseOnly] = useState(() => {
    if (typeof window === 'undefined') return false
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const hasHover = window.matchMedia('(hover: hover)').matches
    const isCoarse = window.matchMedia('(pointer: coarse), (hover: none)').matches
    return hasFinePointer && hasHover && !isCoarse
  })
  const cursorVariant = useAppStore((s) => s.cursorVariant)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Immediately disable on ANY touch interaction (phones, tablets, touch screens, TV remotes)
    const onTouch = () => {
      setIsMouseOnly(false)
      setIsVisible(false)
    }

    const checkPointers = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches
      const hasHover = window.matchMedia('(hover: hover)').matches
      const isCoarse = window.matchMedia('(pointer: coarse), (hover: none)').matches
      setIsMouseOnly(hasFinePointer && hasHover && !isCoarse)
    }

    const fineMql = window.matchMedia('(pointer: fine)')
    const hoverMql = window.matchMedia('(hover: hover)')
    const coarseMql = window.matchMedia('(pointer: coarse)')

    fineMql.addEventListener('change', checkPointers)
    hoverMql.addEventListener('change', checkPointers)
    coarseMql.addEventListener('change', checkPointers)
    window.addEventListener('touchstart', onTouch, { passive: true, capture: true })

    return () => {
      fineMql.removeEventListener('change', checkPointers)
      hoverMql.removeEventListener('change', checkPointers)
      coarseMql.removeEventListener('change', checkPointers)
      window.removeEventListener('touchstart', onTouch, { capture: true })
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !isMouseOnly) return

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isVisible, isMouseOnly])

  useEffect(() => {
    const handleMouseOver = () => setIsHovered(true)
    const handleMouseOut = () => setIsHovered(false)

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  if (!isMouseOnly || !isVisible) return null

  const cursorSize = cursorVariant === 'button' ? 40 : cursorVariant === 'text' ? 20 : cursorVariant === 'hover' ? 32 : 16
  const borderWidth = isClicking ? 0 : 1.5
  const opacity = isClicking ? 0.4 : 0.7
  const borderColor = 'rgba(96, 165, 250, 0.6)'

  return (
    <div
      className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference"
      style={{
        width: cursorSize,
        height: cursorSize,
        transform: `translate(${pos.x - cursorSize / 2}px, ${pos.y - cursorSize / 2}px)`,
        borderWidth,
        border: `${borderWidth}px solid ${borderColor}`,
        opacity,
        transition: 'width 0.15s ease-out, height 0.15s ease-out, border-width 0.15s ease-out, opacity 0.15s ease-out',
        backgroundColor: cursorVariant === 'button' ? 'rgba(255,255,255,0.1)' : 'transparent',
      }}
    >
      {isHovered && cursorVariant === 'hover' && (
        <div className="absolute inset-0 rounded-full bg-primary-light opacity-20 blur" />
      )}
    </div>
  )
}
