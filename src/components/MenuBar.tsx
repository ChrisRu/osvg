import React from 'react'
import styled from 'styled-components'
import { UploadIcon } from './Icons'

const MenuBarWrapper = styled.nav`
  background: #000;
  color: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 1.1rem;
  padding: 0.6rem 2rem;
`

const Title = styled.span`
  font-weight: bold;
  margin-right: auto;
`

const OpenFileButton = styled.label`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.2rem 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  transition: background-color 0.1s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  svg {
    margin-right: 0.5rem;
    width: 1.2rem;
  }

  input {
    display: none;
  }
`

interface IProps {
  onLoadSVG: (svgContent: string) => void
}

export function MenuBar({ onLoadSVG }: IProps) {
  function openFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : undefined
    if (file === undefined) {
      return
    }

    const reader = new FileReader()
    reader.onload = function(event) {
      const contents = event.target ? event.target.result : undefined
      if (contents) {
        if (contents instanceof ArrayBuffer) {
          onLoadSVG(new TextDecoder('utf-8').decode(contents))
        } else {
          onLoadSVG(contents)
        }
      }
    }
    reader.readAsText(file)
  }

  return (
    <MenuBarWrapper>
      <Title>SVGO Online</Title>
      <OpenFileButton>
        <UploadIcon />
        <span>Open file</span>
        <input type="file" onChange={openFile} />
      </OpenFileButton>
    </MenuBarWrapper>
  )
}
