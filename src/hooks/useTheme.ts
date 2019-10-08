import { useState, useEffect } from 'react'

const savedThemeKey = 'svgo-online@theme'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const theme = localStorage.getItem(savedThemeKey)
    if (theme === 'dark' || theme === 'light') {
      setTheme(theme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(savedThemeKey, theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))
  }

  const themeDetails: {
    colorPattern: [string, string]
    iconColor: string
  } = {
    colorPattern: theme === 'dark' ? ['#222', '#282828'] : ['#efefef', '#fff'],
    iconColor: theme === 'dark' ? '#fff' : '#181818',
  }

  return { theme: themeDetails, toggleTheme }
}
