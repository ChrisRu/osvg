import { useState, useEffect } from 'react'

const savedThemeKey = 'svgo-online@theme'

export interface ITheme extends IColorTheme {
  themeName: string
  toggleTheme: () => void
}

interface IColorTheme {
  foreground: string
  background: string
  backgroundSecondary: string
  backgroundTertiary: string
}

type ThemeName = 'dark' | 'light'

const themes: { [key in ThemeName]: IColorTheme } = {
  dark: {
    foreground: '#fff',
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
