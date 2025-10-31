export const themeColors = {
  primary: "[var(--color-primary)]",
  secondary: "[var(--color-secondary)]",
  accent: "[var(--color-accent)]",
  light: "[var(--color-light)]",
  dark: "[var(--color-dark)]",
}
 
export const tc = {
  textPrimary: `text-${themeColors.primary}`,
  textSecondary: `text-${themeColors.secondary}`,
  textAccent: `text-${themeColors.accent}`,
  textLight: `text-${themeColors.light}`,
  textDark: `text-${themeColors.dark}`,
  
  bgPrimary: `bg-${themeColors.primary}`,
  bgSecondary: `bg-${themeColors.secondary}`,
  bgAccent: `bg-${themeColors.accent}`,
  bgLight: `bg-${themeColors.light}`,
  bgDark: `bg-${themeColors.dark}`,
  
  borderPrimary: `border-${themeColors.primary}`,
  borderSecondary: `border-${themeColors.secondary}`,
  borderAccent: `border-${themeColors.accent}`,
  borderLight: `border-${themeColors.light}`,
  borderDark: `border-${themeColors.dark}`,
}

export const getThemeColor = (color: keyof typeof themeColors) => {
  return `var(--color-${color})`
}