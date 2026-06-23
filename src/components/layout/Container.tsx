import type { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-4xl px-4 py-6 md:px-6 ${className}`}>
      {children}
    </div>
  )
}
