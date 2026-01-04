"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type Theme = "mediterranean" | "nyc" | "hyderabad" | "amsterdam" | "toronto" | "london"

interface ThemeColors {
  primary: string     
  secondary: string  
  accent: string   
  light: string      
  dark: string       
  background: string
  backgroundLight: string  
  foreground: string
  muted: string   
  border: string   
}

const themes: Record<Theme, ThemeColors> = {
  mediterranean: {
    primary: " #851c4bff",
    secondary: " #daa131ff",
    accent: " #8dad8dff",
    light: " #E8E9F6",
    dark: " #284e7dff",
    background: " #fefefeff",
    backgroundLight: " #FFFFFF",
    foreground: " #2C5282",
    muted: " #D97BA6",
    border: " #E8DFD0",
  },
  nyc: {
    primary: " #3D4D65",
    secondary: " #94A3B8",
    accent: " #F59E0B",
    light: " #E2E8F0",
    dark: " #20315A",
    background: " #F8FAFC",
    backgroundLight: " #FFFFFF",
    foreground: " #0F172A",
    muted: " #64748B",
    border: " #CBD5E1",
  },
  hyderabad: {
    primary: "rgb(230, 122, 77)", 
    secondary: " #C67D1F",
    accent: "rgb(99, 43, 43)",
    light: " #F4E8D8",
    dark: " #6B3410",
    background: " #FDF7ED",
    backgroundLight: " #FEFCF7",
    foreground: "rgb(118, 57, 17)",
    muted: " #8D5020",
    border: " #C9A882",
  },
  amsterdam: {
    primary: " #C04E75",
    secondary: " #7E9F8D",
    accent: " #F3C5D3",
    light: " #F3C5D3",
    dark: " #7E9F8D",
    background: " #FAF9F6",
    backgroundLight: " #FEFEFE",
    foreground: " #374151",
    muted: " #6B7280",
    border: " #E5E7EB",
  },
  toronto: {
    primary: " #B83B28",
    secondary: " #5C8096",
    accent: " #BFD7EA",
    light: " #BFD7EA",
    dark: " #0A2239",
    background: " #F0F4F8",
    backgroundLight: " #FAFBFC",
    foreground: " #0A2239",
    muted: " #5C8096",
    border: " #D0DDE6",
  },
  london: {
    primary: " #34495E",
    secondary: " #C0392B",
    accent: " #F39C12",
    light: " #D5DBDB",
    dark: " #2C3E50",
    background: " #F8F9FA",
    backgroundLight: " #FBFCFD",
    foreground: " #2C3E50",
    muted: " #7F8C8D",
    border: " #D5DBDB",
  },
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("mediterranean")
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme
      if (saved && themes[saved]) {
        setThemeState(saved)
      }
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

  const colors = themes[theme]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement
      root.style.setProperty("--color-primary", colors.primary)
      root.style.setProperty("--color-secondary", colors.secondary)
      root.style.setProperty("--color-accent", colors.accent)
      root.style.setProperty("--color-light", colors.light)
      root.style.setProperty("--color-dark", colors.dark)
      root.style.setProperty("--color-background", colors.background)
      root.style.setProperty("--color-background-light", colors.backgroundLight)
      root.style.setProperty("--color-foreground", colors.foreground)
      root.style.setProperty("--color-muted", colors.muted)
      root.style.setProperty("--color-border", colors.border)
      
      root.style.setProperty("--purple-periwinkle", colors.primary)
      root.style.setProperty("--sea-blue", colors.secondary)
      root.style.setProperty("--yellow-honey", colors.accent)
      root.style.setProperty("--blue-columbia", colors.light)
      root.style.setProperty("--green", colors.dark)
      
      root.style.setProperty("--recog1-g1", colors.light + "60")
      root.style.setProperty("--recog1-g2", colors.secondary + "60")
      root.style.setProperty("--recog2-g1", colors.accent + "60")
      root.style.setProperty("--recog2-g2", colors.light + "60")
      root.style.setProperty("--recog3-g1", colors.secondary + "60")
      root.style.setProperty("--recog3-g2", colors.light + "60")
      root.style.setProperty("--recog4-g1", colors.light + "60")
      root.style.setProperty("--recog4-g2", colors.accent + "60")
      root.style.setProperty("--recog-border", colors.primary)
      
      document.body.style.backgroundColor = colors.background
      document.body.style.color = colors.foreground
    }
  }, [colors, theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
