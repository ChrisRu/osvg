import { useState, useEffect } from 'react'

const PREFIX = 'osvg@'

export function useSingleTime(uniqueName: string): [boolean, () => void] {
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const item = localStorage.getItem(PREFIX + uniqueName)
    if (item !== 'y') {
      setShown(false)
    }
  }, [uniqueName])

  useEffect(() => {
    localStorage.setItem(PREFIX + uniqueName, shown ? 'y' : 'n')
  }, [uniqueName, shown])

  function hide() {
    setShown(true)
  }

  return [shown, hide]
}
