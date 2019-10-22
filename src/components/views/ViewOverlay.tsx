import React, { useContext } from 'react'
import styled, { ThemeContext, css } from 'styled-components'
import { saveSvg } from '../../services/fileService'
import { DownloadIcon, ThemeIcon } from '../elements/Icons'
import { IThemeContext } from '../../hooks/useTheme'
import { defaultFileName } from '../App'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  margin: 1rem;
  pointer-events: none;

  > * {
    pointer-events: all;
  }
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
  transform: scaleX(${p => (p.theme.themeName === 'light' ? 1 : -1)});
  transition: opacity 0.1s, transform 0.1s;
  color: ${p => p.theme.foreground};
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 1;
  }
`

const OriginalButton = styled.button`
  ${p =>
    p.theme.themeName === 'light'
      ? css`
          background: rgba(255, 255, 255, 0.6);
          color: rgba(0, 0, 0, 1);
          opacity: 0.7;
        `
      : css`
          background: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.8);
          opacity: 0.7;
        `}
  border: 0;
  padding: 0.3rem 0.8rem;
  margin: 0;
  text-transform: uppercase;
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: bold;
  border-radius: 2rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: opacity 0.1s;

  &:hover {
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
  transition: background-color 0.1s;

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
  fileName?: string
  optimizedSVG?: string
  original: boolean
  onToggleOriginal?: () => void
}

export function ViewOverlay({ fileName, original, optimizedSVG, onToggleOriginal }: IProps) {
  const { toggleTheme } = useContext<IThemeContext>(ThemeContext)

  return (
    <Wrapper>
      {onToggleOriginal ? (
        <OriginalButton onClick={onToggleOriginal}>
          Show {original ? 'optimized' : 'original'}
        </OriginalButton>
      ) : null}
      <ThemeButton title="Toggle theme" onClick={toggleTheme}>
        <ThemeIcon />
      </ThemeButton>
      {optimizedSVG ? (
        <DownloadButton
          title="Download the SVG to your local filesystem"
          onClick={() => saveSvg(optimizedSVG, fileName || defaultFileName)}
        >
          <DownloadIcon />
          <span>Download</span>
        </DownloadButton>
      ) : null}
    </Wrapper>
  )
}
