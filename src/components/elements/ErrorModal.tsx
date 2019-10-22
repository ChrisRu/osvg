import React from 'react'
import styled from 'styled-components'
import { WarningIcon } from './Icons'

const Overlay = styled.div`
  z-index: 4;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorMessage = styled.div`
  max-width: 30rem;
  background: #222;
  color: #fff;
  display: flex;
  flex-flow: column nowrap;

  p {
    font-size: 1.2rem;
    margin: 0;
    padding: 1rem;
  }
`

const ErrorTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: #282828;
  padding: 1rem;

  h1 {
    font-size: 1.8rem;
    margin: 0;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 1rem;
  }
`

const ErrorCloseButton = styled.button`
  background: transparent;
  border: 0;
  background: #fff;
  color: rgba(0, 0, 0, 0.7);
  padding: 0.4rem 1rem;
  align-self: flex-end;
  margin-bottom: 1rem;
  margin-right: 1rem;
  transition: background 0.1s;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.9);
  }
`

interface IProps {
  title: string
  children: React.ReactNode
  onClose: () => void
}

export function ErrorModal({ title, children, onClose }: IProps) {
  return (
    <Overlay>
      <ErrorMessage>
        <ErrorTitle>
          <WarningIcon />
          <h1>{title}</h1>
        </ErrorTitle>
        <p>{children}</p>
        <ErrorCloseButton title="Hide error message" onClick={onClose}>
          Ok
        </ErrorCloseButton>
      </ErrorMessage>
    </Overlay>
  )
}
