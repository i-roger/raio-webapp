"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Home, Calculator, ArrowLeftRight, Settings } from "lucide-react"
import GlassContainer from "./GlassContainer"

const links = [
  { href: "/", icon: Home },
  { href: "/calculadoras", icon: Calculator },
  { href: "/conversoes", icon: ArrowLeftRight },
  { href: "/mais", icon: Settings },
]

const moreRoutes = ["/mais", "/apoiar", "/sobre"]

export default function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScaling, setIsScaling] = useState(false)
  const [pressedIndex, setPressedIndex] = useState<number | null>(null)
  const [indicatorOffset, setIndicatorOffset] = useState<number | null>(null)
  const [transitionStyle, setTransitionStyle] = useState('all 150ms ease-out')
  const pressedIndexRef = useRef<number | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const navigateToRef = useRef<number | null>(null)
  const touchMovedRef = useRef(false)

  const getActiveIndex = () => {
    for (let i = 0; i < links.length; i++) {
      const { href } = links[i]
      if (href === "/mais" && moreRoutes.includes(pathname)) return i
      if (pathname === href) return i
    }
    return -1
  }
  const activeIndex = getActiveIndex()
  const displayIndex = pressedIndex ?? activeIndex

  const getTabIndexFromX = (clientX: number) => {
    if (!navRef.current) return -1
    const rect = navRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const tabWidth = rect.width / links.length
    const index = Math.floor(x / tabWidth)
    return Math.max(0, Math.min(index, links.length - 1))
  }

  const getIndicatorOffset = (clientX: number): number => {
    if (!navRef.current) return 0
    const rect = navRef.current.getBoundingClientRect()
    return ((clientX - rect.left) / rect.width) * 100
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsScaling(true)
    touchMovedRef.current = false
    const clientX = e.touches[0].clientX
    const index = getTabIndexFromX(clientX)
    pressedIndexRef.current = index
    setPressedIndex(index)
    setIndicatorOffset(getIndicatorOffset(clientX))
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchMovedRef.current) {
      touchMovedRef.current = true
      setTransitionStyle('none')
    }
    const clientX = e.touches[0].clientX
    const index = getTabIndexFromX(clientX)
    pressedIndexRef.current = index
    setIndicatorOffset(getIndicatorOffset(clientX))
    if (pressedIndex !== index) setPressedIndex(index)
  }

  const handleTouchEnd = () => {
    setTransitionStyle('all 150ms ease-out')
    setIsScaling(false)
    const targetIndex = pressedIndexRef.current
    if (targetIndex !== null && targetIndex >= 0) {
      navigateToRef.current = targetIndex
      router.push(links[targetIndex].href)
      pressedIndexRef.current = null
      return
    }
    setPressedIndex(null)
    pressedIndexRef.current = null
    setIndicatorOffset(null)
  }

  const handleTouchCancel = () => {
    setTransitionStyle('all 150ms ease-out')
    setIsScaling(false)
    setPressedIndex(null)
    pressedIndexRef.current = null
    setIndicatorOffset(null)
    navigateToRef.current = null
  }

  useEffect(() => {
    if (navigateToRef.current !== null) {
      setPressedIndex(null)
      setIndicatorOffset(null)
      setTransitionStyle('all 150ms ease-out')
      navigateToRef.current = null
    }
  }, [pathname])

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    const index = getTabIndexFromX(e.clientX)
    if (index >= 0) router.push(links[index].href)
  }

  return (
    <nav
      ref={navRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onPointerUp={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
      className={`fixed scale-[.8] w-full bottom-[max(20px,var(--safe-area-bottom))] z-50 select-none touch-none transition-transform duration-200 md:hidden ${
        isScaling ? "scale-[.9]" : ""
      }`}
      style={{ WebkitTouchCallout: 'none' } as React.CSSProperties}
    >
      <GlassContainer>
        <div className="relative flex mx-2 my-1">
          {displayIndex >= 0 && (
            <div
              className="absolute top-1/2 h-15 w-24 rounded-4xl bg-muted-foreground/15"
              style={{
                left: indicatorOffset !== null
                  ? `${Math.max(0, Math.min(100, indicatorOffset))}%`
                  : `${displayIndex * 25 + 12.5}%`,
                transition: transitionStyle,
                transform: 'translate(-50%, -50%)'
              } as React.CSSProperties}
            />
          )}
          {links.map(({ href, icon: Icon }, i) => {
            const isActive = pressedIndex !== null
              ? pressedIndex === i
              : href === "/mais"
                ? moreRoutes.includes(pathname)
                : pathname === href
            return (
              <div
                key={href}
                className="flex flex-1 cursor-pointer items-center justify-center py-3 transition-colors"
              >
                <div className="flex size-10 items-center justify-center">
                  <Icon className={`size-8 ${isActive ? "scale-110 text-primary" : "text-muted-foreground"}`} />
                </div>
              </div>
            )
          })}
        </div>
      </GlassContainer>
    </nav>
  )
}
