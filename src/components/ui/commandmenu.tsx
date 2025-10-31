"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Briefcase,
  BookOpen,
  Rabbit,
  Palette,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command"
import { useTheme, type Theme } from "../../utils/theme-context"

const themeConfig: Record<Theme, { label: string; emoji: string; bgColor: string }> = {
  mediterranean: { label: "Mediterranean", emoji: "🌊", bgColor: "#E8E3F0" },
  nyc: { label: "NYC", emoji: "🏙️", bgColor: "#F5E8D8" },
  hyderabad: { label: "Hyderabad", emoji: "🕌", bgColor: "#FFE5D0" },
  amsterdam: { label: "Amsterdam", emoji: "🌷", bgColor: "#E0F5F2" },
  toronto: { label: "Toronto", emoji: "🍁", bgColor: "#DBE8F5" },
  london: { label: "London", emoji: "🇬🇧", bgColor: "#F1F3F4" },
}

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    command()
    // Don't close the menu automatically
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/portfolio"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Portfolio</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/bookshelf"))}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Bookshelf</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/rabbit-holes"))}>
              <Rabbit className="mr-2 h-4 w-4" />
              <span>Rabbit Holes</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            {(Object.keys(themeConfig) as Theme[]).map((themeKey) => {
              const config = themeConfig[themeKey]
              const isActive = theme === themeKey
              return (
                <CommandItem
                  key={themeKey}
                  onSelect={() => runCommand(() => setTheme(themeKey))}
                  className={`relative ${isActive ? "font-medium" : ""}`}
                  style={{
                    backgroundColor: isActive ? config.bgColor : "transparent",
                  }}
                >
                  <span className="mr-2">{config.emoji}</span>
                  <span>{config.label}</span>
                  {isActive && (
                    <span className="ml-auto text-xs opacity-70">Current</span>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="External Links">
            <CommandItem onSelect={() => runCommand(() => window.open("https://linkedin.com/in/anushkapunukollu", "_blank"))}>
              <span>LinkedIn</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/anushka16", "_blank"))}>
              <span>GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("/resume.pdf", "_blank"))}>
              <span>Resume</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
