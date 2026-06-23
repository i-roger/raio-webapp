"use client"

import { useEffect, useRef, useState } from "react"
import { SunMoon, ChevronDown, Check } from "lucide-react"

const themes = [
  { value: false, label: "Claro" },
  { value: true, label: "Escuro" },
]

export default function ThemeSelect() {
  const [dark, setDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const setTheme = (next: boolean) => {
    setDark(next)
    setIsOpen(false)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  const currentLabel = themes.find((t) => t.value === dark)?.label

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="flex items-center gap-3 text-sm font-medium">
        <SunMoon className="size-5 text-muted-foreground" />
        Tema
      </span>
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 rounded-lg border bg-muted px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
        >
          {currentLabel}
          <ChevronDown className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-lg border bg-popover shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
            {themes.map(({ value, label }) => (
              <button
                key={label}
                onClick={() => setTheme(value)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-muted"
              >
                {label}
                {dark === value && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
