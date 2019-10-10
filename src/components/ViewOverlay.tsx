import React from 'react'
import styled from 'styled-components'
import { saveSvg } from '../services/saveSvg'
import { DownloadIcon, ThemeIcon } from './elements/Icons'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  margin: 1rem;
`

const ThemeButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  opacity: 0.7;
  height: 24px;
  transform: rotate(${p => (p.theme.foreground === '#fff' ? 180 : 0)}deg);
  transition: opacity 0.1s;
  color: ${p => p.theme.foreground};
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 1;
  }
`

const DownloadButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #3a3a3a;
  padding: 0.5rem 1rem;
  color: #fff;
  border: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  outline: none;

  svg {
    margin-right: 0.5rem;
    width: 1.2rem;
  }

  span {
    font-size: 1.1rem;
  }

  &:focus {
    background-color: #464646;
  }

  &:hover {
    background-color: #464646;
  }
`

interface IProps {
  fileName: string
  after?: string
  toggleTheme: () => void
}

export function ViewOverlay({ fileName, after, toggleTheme }: IProps) {
  return (
    <Wrapper>
      <ThemeButton onClick={toggleTheme}>
        <ThemeIcon />
      </ThemeButton>
      {after ? (
        <DownloadButton onClick={() => saveSvg(after, fileName)}>
          <DownloadIcon />
          <span>Download</span>
        </DownloadButton>
      ) : null}
    </Wrapper>
  )
}
