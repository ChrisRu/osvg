import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    const id = setInterval(() => {
      savedCallback.current?.()
    }, delay)

    return () => clearInterval(id)
  }, [delay])
}
