import { useCallback, useContext, useReducer } from 'react'
import styled, { css, ThemeContext } from 'styled-components/macro'
import { saveSVG } from '../../services/fileService'
import {
  CheckMarkIcon,
  ClipboardIcon,
  DownloadIcon,
  LoadingIcon,
  ThemeIcon,
} from '../elements/Icons'
import type { IThemeContext } from '../../hooks/useTheme'
import { defaultFileName } from '../App'

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: block;
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
  transform: scaleX(${(p) => (p.theme.themeName === 'light' ? 1 : -1)});
  transition: opacity 0.1s, transform 0.1s;
  color: ${(p) => p.theme.text};
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 1;
  }
`

const ExportButtons = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`

const ExportButton = styled.button<{ success?: boolean }>`
  position: relative;
  background: #3a3a3a;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  height: 40px;
  color: #fff;
  border: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  outline: none;
  user-select: none;
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
    background-color: #565656;
  }

  &:before {
    opacity: 0;
    transition: opacity 0.1s;
    content: '';
    display: block;
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;
    border: 2px solid #51b851;
  }

  ${(props) =>
    props.success &&
    css`
      svg {
        color: #4dd14d;
      }

      &:before {
        opacity: 1;
      }
    `}
`

interface IProps {
  fileName?: string
  optimizedSVG?: string
}

function copyToClipboard(content: string) {
  const textArea = document.createElement('textarea')
  textArea.value = content
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

interface CopyingState {
  copying: boolean
  done: boolean
}

function copyReducer(state: CopyingState, action: 'copying' | 'done' | 'clear'): CopyingState {
  switch (action) {
    case 'copying':
      return {
        copying: true,
        done: false,
      }
    case 'done':
      if (state.copying && !state.done) {
        return {
          copying: false,
          done: true,
        }
      }
      break
    case 'clear':
      if (!state.copying) {
        return {
          copying: false,
          done: false,
        }
      }
  }

  return state
}

const getInitialCopyState = (): CopyingState => ({ copying: false, done: false })

export function ViewOverlay({ fileName, optimizedSVG }: IProps) {
  const { toggleTheme } = useContext<IThemeContext>(ThemeContext)
  const [copyingSVG, dispatchCopyingSVG] = useReducer(copyReducer, getInitialCopyState())
  const [copyingJSX, dispatchCopyingJSX] = useReducer(copyReducer, getInitialCopyState())

  const copyJSX = useCallback(async function (content: string) {
    try {
      dispatchCopyingJSX('copying')

      const service = await import('../../services/htmlToJSXService')
      const jsx = service.convertHtmlToJSX(content)
      copyToClipboard(jsx)

      dispatchCopyingJSX('done')

      setTimeout(() => {
        dispatchCopyingJSX('clear')
      }, 1500)
    } catch (error) {
      console.error('Failed copying JSX to clipboard', error)
      dispatchCopyingJSX('clear')
    }
  }, [])

  const copySVG = useCallback(async function (content: string) {
    try {
      dispatchCopyingSVG('copying')
      copyToClipboard(content)

      dispatchCopyingSVG('done')

      setTimeout(() => {
        dispatchCopyingSVG('clear')
      }, 1500)
    } catch (error) {
      console.error('Failed copying SVG to clipboard', error)
      dispatchCopyingSVG('clear')
    }
  }, [])

  return (
    <Wrapper>
      <ThemeButton title="Toggle theme" onClick={toggleTheme}>
        <ThemeIcon />
      </ThemeButton>
      {optimizedSVG ? (
        <ExportButtons>
          <ExportButton
            title="Copy content of the SVG to your clipboard"
            success={copyingSVG.done}
            onClick={() => copySVG(optimizedSVG)}
          >
            {copyingSVG.copying ? (
              <LoadingIcon />
            ) : copyingSVG.done ? (
              <CheckMarkIcon />
            ) : (
              <ClipboardIcon />
            )}
            <span>Copy SVG</span>
          </ExportButton>
          <ExportButton
            title="Copy content of the SVG as JSX to your clipboard"
            success={copyingJSX.done}
            onClick={() => copyJSX(optimizedSVG)}
          >
            {copyingJSX.copying ? (
              <LoadingIcon />
            ) : copyingJSX.done ? (
              <CheckMarkIcon />
            ) : (
              <ClipboardIcon />
            )}
            <span>Copy JSX</span>
          </ExportButton>
          <ExportButton
            title="Download the SVG to your local filesystem"
            onClick={() => saveSVG(optimizedSVG, fileName || defaultFileName)}
          >
            <DownloadIcon />
            <span>Download</span>
          </ExportButton>
        </ExportButtons>
      ) : null}
    </Wrapper>
  )
}
