import type { ReactNode } from "react"

interface GlassContainerProps {
  children: ReactNode
  cornerRadius?: number
  baseStrength?: number
  extraBlur?: number
  softness?: number
  invert?: number
}

export default function GlassContainer({
  children,
  cornerRadius = 48,
  baseStrength = 14,
  extraBlur = .2,
  softness = 7,
  invert = 10,
}: GlassContainerProps) {
  const totalStrength = baseStrength + extraBlur
  const edgeWidth = 0.3 + softness * 0.1
  const embossWidth = softness * 0.38
  const refractionWidth = softness * 0.3

  return (
    <div
      className="glass-container"
      style={
        {
          "--corner-radius": `${cornerRadius}px`,
          "--base-strength": `${baseStrength}px`,
          "--extra-blur": `${extraBlur}px`,
          "--softness": `${softness}px`,
          "--total-strength": `${totalStrength}px`,
          "--edge-width": `${edgeWidth}px`,
          "--emboss-width": `${embossWidth}px`,
          "--refraction-width": `${refractionWidth}px`,
          "--invert": `${invert}%`,
        } as React.CSSProperties
      }
    >
      <div className="glass-material">
        <div className="glass-edge-reflection" />
        <div className="glass-emboss-reflection" />
        <div className="glass-refraction" />
        <div className="glass-blur" />
        <div className="blend-layers" />
        <div className="blend-edge" />
        <div className="glass-highlight" />
      </div>
      <div className="glass-content">{children}</div>
    </div>
  )
}
