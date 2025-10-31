"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type Theme = "mediterranean" | "nyc" | "hyderabad" | "amsterdam" | "toronto" | "london"
export type ColorMode = "light" | "dark"

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

const themes: Record<Theme, Record<ColorMode, ThemeColors>> = {
  mediterranean: {
    light: {
      primary: "#6B5B95",   
      secondary: "#87CEEB",  
      accent: "#F4A460",
      light: "#E6E6FA",
      dark: "#4682B4",
      background: "#FAFAFA",
      backgroundLight: "#F8F9FA",
      foreground: "#2C3E50",
      muted: "#7F8C8D",
      border: "#D5DBDB",
    },
    dark: {
      primary: "#9B7EDE",      // Lighter periwinkle
      secondary: "#5DADE2",    // Lighter sky blue
      accent: "#F7DC6F",       // Soft gold
      light: "#4A4A4A",        // Dark gray
      dark: "#2E86AB",         // Darker blue
      background: "#1A1A1A",
      backgroundLight: "#2D2D2D",
      foreground: "#ECF0F1",
      muted: "#BDC3C7",
      border: "#34495E",
    }
  },
  nyc: {
    light: {
      primary: "#2C3E50",      // NYC midnight blue
      secondary: "#E67E22",    // NYC sunset orange
      accent: "#E74C3C",       // NYC taxi red
      light: "#F39C12",        // NYC gold
      dark: "#34495E",         // NYC steel
      background: "#FDF2E9",
      backgroundLight: "#FEF9F3",
      foreground: "#2C3E50",
      muted: "#7F8C8D",
      border: "#D5DBDB",
    },
    dark: {
      primary: "#3498DB",      // NYC sky blue
      secondary: "#F39C12",    // NYC gold
      accent: "#E74C3C",       // NYC red
      light: "#34495E",        // Dark steel
      dark: "#2C3E50",         // Midnight
      background: "#1A1A1A",
      backgroundLight: "#2D2D2D",
      foreground: "#ECF0F1",
      muted: "#BDC3C7",
      border: "#34495E",
    }
  },
  hyderabad: {
    light: {
      primary: "#C0392B",      // Hyderabad terracotta
      secondary: "#E67E22",    // Spice orange
      accent: "#F1C40F",       // Saffron gold
      light: "#F8C471",        // Warm yellow
      dark: "#8B4513",         // Rich brown
      background: "#FEF9E7",
      backgroundLight: "#FFFBF0",
      foreground: "#2C3E50",
      muted: "#7F8C8D",
      border: "#D5DBDB",
    },
    dark: {
      primary: "#E74C3C",      // Lighter terracotta
      secondary: "#F39C12",    // Lighter orange
      accent: "#F7DC6F",       // Soft gold
      light: "#4A4A4A",        // Dark gray
      dark: "#A0522D",         // Saddle brown
      background: "#1A1A1A",
      backgroundLight: "#2D2D2D",
      foreground: "#ECF0F1",
      muted: "#BDC3C7",
      border: "#34495E",
    }
  },
  amsterdam: {
    light: {
      primary: "#16A085",      // Canal teal
      secondary: "#E74C3C",    // Tulip red
      accent: "#F1C40F",       // Tulip yellow
      light: "#A8E6CF",        // Light mint
      dark: "#2C3E50",         // Dutch blue
      background: "#E8F8F5",
      backgroundLight: "#F0FDFA",
      foreground: "#2C3E50",
      muted: "#7F8C8D",
      border: "#D5DBDB",
    },
    dark: {
      primary: "#1ABC9C",      // Lighter teal
      secondary: "#E67E22",    // Warm orange
      accent: "#F7DC6F",       // Soft gold
      light: "#4A4A4A",        // Dark gray
      dark: "#16A085",         // Darker teal
      background: "#1A1A1A",
      backgroundLight: "#2D2D2D",
      foreground: "#ECF0F1",
      muted: "#BDC3C7",
      border: "#34495E",
    }
  },
  toronto: {
    light: {
      primary: "#2980B9",      // Toronto blue
      secondary: "#E74C3C",    // Maple red
      accent: "#F39C12",       // Autumn gold
      light: "#AED6F1",        // Light blue
      dark: "#1F618D",         // Deep blue
      background: "#EBF3FD",
      backgroundLight: "#F4F8FF",
      foreground: "#2C3E50",
      muted: "#7F8C8D",
      border: "#D5DBDB",
    },
    dark: {
      primary: "#5DADE2",      // Lighter blue
      secondary: "#F39C12",    // Gold
      accent: "#F7DC6F",       // Soft gold
      light: "#4A4A4A",        // Dark gray
      dark: "#2980B9",         // Toronto blue
      background: "#1A1A1A",
      backgroundLight: "#2D2D2D",
      foreground: "#ECF0F1",
      muted: "#BDC3C7",
      border: "#34495E",
    }
  },
  london: {
    light: {
      primary: "#34495E",      // London fog
      secondary: "#C0392B",    // Brick red
      accent: "#F39C12",       // Royal gold
      light: "#D5DBDB",        // Light gray
      dark: "#2C3E50",         // Charcoal
      background: "#F8F9FA",
      backgroundLight: "#FBFCFD",
      foreground: "#2C3E50",
      muted: "#7F8C8D",
      border: "#D5DBDB",
    },
    dark: {
      primary: "#BDC3C7",      // Light gray
      secondary: "#E74C3C",    // Red
      accent: "#F7DC6F",       // Gold
      light: "#4A4A4A",        // Dark gray
      dark: "#34495E",         // Fog
      background: "#1A1A1A",
      backgroundLight: "#2D2D2D",
      foreground: "#ECF0F1",
      muted: "#BDC3C7",
      border: "#34495E",
    }
  },
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme
      return saved && themes[saved] ? saved : "mediterranean"
    }
    return "mediterranean"
  })

          const [colorMode, setColorModeState] = useState<ColorMode>(() => "light")

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

          const setColorMode = (_newMode: ColorMode) => {
            setColorModeState("light")
            if (typeof window !== "undefined") {
              localStorage.setItem("colorMode", "light")
            }
          }

          const colors = themes[theme]["light"]

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
    <ThemeContext.Provider value={{ theme, setTheme, colorMode, setColorMode, colors }}>
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

