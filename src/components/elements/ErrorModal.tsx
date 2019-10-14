import React from 'react'
import styled from 'styled-components'
import { WarningIcon } from './Icons'

const Overlay = styled.div`
  z-index: 2;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 30rem;
  background: #222;
  color: #fff;

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

interface IProps {
  title: string
  description: string
  onClose: () => void
}

export function ErrorModal({ title, description, onClose }: IProps) {
  return (
    <Overlay onClick={onClose}>
      <ErrorMessage>
        <ErrorTitle>
          <WarningIcon />
          <h1>{title}</h1>
        </ErrorTitle>
        <p>{description}</p>
      </ErrorMessage>
    </Overlay>
  )
}
