import styled from 'styled-components/macro'
import { useEffect, useState } from 'react'
import { InfoIcon } from './elements/Icons'

export function makeToast(message: string) {
  window.dispatchEvent(
    new CustomEvent('toast', {
      detail: { message },
    }),
  )
}

const ToastieWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
  margin-left: 1rem;
  color: white;
  background: #444;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;

  display: flex;
  justify-content: center;

  svg {
    opacity: 0.5;
    margin-right: 0.75rem;
  }
`

export function Toastie() {
  const [toast, setToast] = useState<string | undefined>()

  useEffect(() => {
    function onToast(eggs: CustomEvent<{ message: string }>) {
      setToast(eggs.detail.message)
    }

    window.addEventListener('toast', onToast as EventListener)

    return () => window.removeEventListener('toast', onToast as EventListener)
  }, [])

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => {
        setToast(undefined)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [toast])

  return toast ? (
    <ToastieWrapper onClick={() => setToast(undefined)}>
      <InfoIcon />
      <span>{toast}</span>
    </ToastieWrapper>
  ) : null
}
