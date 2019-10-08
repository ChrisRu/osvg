import { useState, useEffect } from 'react'

export function useSingleTime(uniqueName: string): [boolean, () => void] {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const item = localStorage.getItem('svgo-online@' + uniqueName)
    if (item === 'YES') {
      setShown(true)
    }
  }, [uniqueName])

  useEffect(() => {
    localStorage.setItem('svgo-online@' + uniqueName, shown ? 'YES' : 'NO')
  }, [uniqueName, shown])

  function hide() {
    setShown(true)
  }

  return [shown, hide]
}
