import { useState, useEffect } from 'react'

const SAVED_THEME_KEY = 'osvg@theme'

export interface IThemeContext extends ITheme {
  themeName: string
  toggleTheme: () => void
}

interface ITheme {
  foreground: string
  background: string
  backgroundSecondary: string
  backgroundTertiary: string
}

type ThemeName = 'dark' | 'light'

const themes: { [key in ThemeName]: ITheme } = {
  dark: {
    foreground: '#ffffff',
    background: '#212123',
    backgroundSecondary: '#262629',
    backgroundTertiary: '#212123',
  },
  light: {
    foreground: '#181818',
    background: '#efefef',
    backgroundSecondary: '#fff',
    backgroundTertiary: '#f9f9fa',
  },
}

export function useTheme() {
  const [themeName, setThemeName] = useState<ThemeName>('dark')

  useEffect(() => {
    const storedThemeName = localStorage.getItem(SAVED_THEME_KEY)
    if (storedThemeName !== null && storedThemeName in themes) {
      setThemeName(storedThemeName as ThemeName)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(SAVED_THEME_KEY, themeName)
  }, [themeName])

  function toggleTheme() {
    setThemeName(theme => (theme === 'light' ? 'dark' : 'light'))
  }

  return { theme: themes[themeName], toggleTheme, themeName }
}
