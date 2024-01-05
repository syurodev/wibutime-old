"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
      className="flex items-center justify-start gap-2 p-0 cursor-pointer select-none"
    >
      {
        theme === "dark" ? (
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 right-0" />
        ) : (
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        )
      }

      <p>{theme === "dark" ? "DARK MODE" : "LIGHT MODE"}</p>
    </div>
  )
}
