import { useState, useEffect } from 'react'

const savedThemeKey = 'svgo-online@theme'

interface ITheme {
  foreground: string
  background: string
  backgroundSecondary: string
}

type ThemeName = 'dark' | 'light'

const themes: { [key in ThemeName]: ITheme } = {
  dark: {
    foreground: '#fff',
    background: '#222',
    backgroundSecondary: '#282828',
  },
  light: {
    foreground: '#181818',
    background: '#efefef',
    backgroundSecondary: '#fff',
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
