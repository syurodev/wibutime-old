import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const Container = (
  {
    className,
    showScroll,
    reading,
    backgroundReading,
    children,
  }: {
    className?: string,
    showScroll?: boolean,
    reading?: boolean,
    backgroundReading?: "bg-[#FFF0E6]" | "bg-[#FFFAF0]" | "bg-[#E6F0FF]",
    children: ReactNode,
  }) => {
  return (
    <>
      <div
        className={cn("h-full w-full pt-20 pb-5 px-5 max-w-[1400px] mx-auto", className, showScroll ? "showScroll" : "")}
      >
        {children}
      </div>

      {
        reading && (
          <div className={`absolute top-0 left-0 right-0 bottom-0 -z-10 ${backgroundReading ? backgroundReading : "bg-background"} dark:bg-background`}></div>
        )
      }
    </>
  )
}

export default Container