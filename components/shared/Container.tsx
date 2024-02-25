import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const Container = (
  {
    className,
    showScroll,
    children,
  }: {
    className?: string,
    showScroll?: boolean,
    children: ReactNode,
  }) => {
  return (
    <div
      className={cn("h-full w-full pt-20 pb-5 px-5 max-w-[1400px] mx-auto", className, showScroll ? "showScroll" : "")}
    >
      {children}
    </div>
  )
}

export default Container