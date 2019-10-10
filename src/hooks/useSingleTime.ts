import { useState, useEffect } from 'react'

export function useSingleTime(uniqueName: string): [boolean, () => void] {
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const item = localStorage.getItem('svgo-online@' + uniqueName)
    if (item !== 'YES') {
      setShown(false)
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
