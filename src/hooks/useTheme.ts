import { useState, useEffect, useCallback, useMemo } from 'react'

const SAVED_THEME_KEY = 'osvg@theme'

export interface IThemeContext extends ITheme {
  themeName: string
  toggleTheme: () => void
}

interface ITheme {
  text: string
  background: string
  backgroundOffset: string
  backgroundTertiary: string
}

type ThemeName = 'dark' | 'light'

const themes: { [key in ThemeName]: ITheme } = {
  dark: {
    text: '#efefef',
    background: '#212123',
    backgroundOffset: '#262629',
    backgroundTertiary: '#212123',
  },
  light: {
    text: '#181818',
    background: '#efefef',
    backgroundOffset: '#ffffff',
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

  const content = useMemo(
    () => ({
      ...themes[themeName],
      toggleTheme: () => setThemeName((theme) => (theme === 'light' ? 'dark' : 'light')),
      themeName,
    }),
    [themeName],
  )

  return content
}
