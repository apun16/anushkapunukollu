"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Briefcase,
  BookOpen,
  Rabbit,
  Linkedin,
  Github,
  FileText,
  Mail,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"
import { useTheme, type Theme } from "../contexts/theme-context"

const themeConfig: Record<Theme, { label: string; emoji: string; bgColor: string; number: string }> = {
  mediterranean: { label: "Mediterranean", emoji: "🌊", bgColor: "#E8E3F0", number: "1" },
  nyc: { label: "NYC", emoji: "🏙️", bgColor: "#F5E8D8", number: "2" },
  hyderabad: { label: "Hyderabad", emoji: "🕌", bgColor: "#FFE5D0", number: "3" },
  amsterdam: { label: "Amsterdam", emoji: "🌷", bgColor: "#E0F5F2", number: "4" },
  toronto: { label: "Toronto", emoji: "🍁", bgColor: "#DBE8F5", number: "5" },
  london: { label: "London", emoji: "🇬🇧", bgColor: "#F1F3F4", number: "6" },
}

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const [shiftPressed, setShiftPressed] = React.useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShiftPressed(true)
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
        return
      }
      if (e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        switch (e.key.toUpperCase()) {
          case "H":
            e.preventDefault()
            router.push("/")
            setOpen(false)
            break
          case "P":
            e.preventDefault()
            router.push("/portfolio")
            setOpen(false)
            break
          case "B":
            e.preventDefault()
            router.push("/bookshelf")
            setOpen(false)
            break
          case "R":
            e.preventDefault()
            router.push("/rabbit-holes")
            setOpen(false)
            break
          case "!": 
            e.preventDefault()
            setTheme("mediterranean")
            break
          case "@": 
            e.preventDefault()
            setTheme("nyc")
            break
          case "#":
            e.preventDefault()
            setTheme("hyderabad")
            break
          case "$": 
            e.preventDefault()
            setTheme("amsterdam")
            break
          case "%": 
            e.preventDefault()
            setTheme("toronto")
            break
          case "^":
            e.preventDefault()
            setTheme("london")
            break
        }
      }
    }    
    const up = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShiftPressed(false)
      }
    }

    document.addEventListener("keydown", down)
    document.addEventListener("keyup", up)
    return () => {
      document.removeEventListener("keydown", down)
      document.removeEventListener("keyup", up)
    }
  }, [router, setTheme])

  const runCommand = React.useCallback((command: () => unknown) => {
    command()
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b py-3 pl-4 pr-3">
          <div className="relative mr-2.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden" aria-hidden>
            <img
              src="/profile.jpg"
              alt="Profile"
              className="h-5 w-5 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
                const fallback = e.currentTarget.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = "block"
              }}
            />
            <User
              className="h-5 w-5 hidden"
              style={{ color: "var(--color-dark)" }}
              strokeWidth={2.25}
            />
          </div>
          <span className="text-base font-normal" style={{ color: "var(--color-primary)" }}>
            All about me!
          </span>
        </div>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => { router.push("/"); setOpen(false); })}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
              <CommandShortcut>{shiftPressed ? 'H' : 'Shift+H'}</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => { router.push("/portfolio"); setOpen(false); })}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Portfolio</span>
              <CommandShortcut>{shiftPressed ? 'P' : 'Shift+P'}</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => { router.push("/bookshelf"); setOpen(false); })}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Bookshelf</span>
              <CommandShortcut>{shiftPressed ? 'B' : 'Shift+B'}</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => { router.push("/rabbit-holes"); setOpen(false); })}>
              <Rabbit className="mr-2 h-4 w-4" />
              <span>Rabbit Holes</span>
              <CommandShortcut>{shiftPressed ? 'R' : 'Shift+R'}</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Links">
            <CommandItem onSelect={() => runCommand(() => { window.open("https://linkedin.com/in/anushkapunukollu", "_blank"); setOpen(false); })}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => { window.open("https://github.com/apun16", "_blank"); setOpen(false); })}>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => { window.open("/resume.pdf", "_blank"); setOpen(false); })}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Resume</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => { window.location.href = "mailto:anushka.punukollu@uwaterloo.ca"; setOpen(false); })}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Send email</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
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
                  <div className="ml-auto flex items-center gap-2">
                    {isActive && (
                      <span className="text-xs opacity-70">Current</span>
                    )}
                    <CommandShortcut>{shiftPressed ? config.number : `Shift+${config.number}`}</CommandShortcut>
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
