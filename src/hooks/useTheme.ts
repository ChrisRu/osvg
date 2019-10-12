import { useState, useEffect } from 'react'

const savedThemeKey = 'svgo-online@theme'

interface ITheme {
  foreground: string
  background: string
  backgroundSecondary: string
  backgroundTertiary: string
}

type ThemeName = 'dark' | 'light'

const themes: { [key in ThemeName]: ITheme } = {
  dark: {
    foreground: '#fff',
    background: '#212123',
    backgroundSecondary: '#262627',
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
    const storedThemeName = localStorage.getItem(savedThemeKey)
    if (storedThemeName && storedThemeName in themes) {
      setThemeName(storedThemeName as ThemeName)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(savedThemeKey, themeName)
  }, [themeName])

  function toggleTheme() {
    setThemeName(theme => (theme === 'light' ? 'dark' : 'light'))
  }

  return { theme: themes[themeName], toggleTheme, themeName }
}
