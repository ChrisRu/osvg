import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { saveSvg } from '../../services/fileService'
import { ClipboardIcon, DownloadIcon, ThemeIcon } from '../elements/Icons'
import { IThemeContext } from '../../hooks/useTheme'
import { defaultFileName } from '../App'
import { convertHtmlToJSX } from '../../services/htmlToJSXService'

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

const ExportButton = styled.button`
  background: #3a3a3a;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
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

async function copySvg(content: string, jsx = false) {
  if (jsx) {
    copyToClipboard(await convertHtmlToJSX(content))
  } else {
    copyToClipboard(content)
  }

  alert(`Copied ${jsx ? 'JSX' : 'SVG'} to clipboard`)
}

export function ViewOverlay({ fileName, optimizedSVG }: IProps) {
  const { toggleTheme } = useContext<IThemeContext>(ThemeContext)

  return (
    <Wrapper>
      <ThemeButton title="Toggle theme" onClick={toggleTheme}>
        <ThemeIcon />
      </ThemeButton>
      {optimizedSVG ? (
        <ExportButtons>
          <ExportButton
            title="Copy content of the SVG to your clipboard"
            onClick={() => copySvg(optimizedSVG)}
          >
            <ClipboardIcon />
            <span>Copy SVG</span>
          </ExportButton>
          <ExportButton
            title="Copy content of the SVG as JSX to your clipboard"
            onClick={() => copySvg(optimizedSVG, true)}
          >
            <ClipboardIcon />
            <span>Copy JSX</span>
          </ExportButton>
          <ExportButton
            title="Download the SVG to your local filesystem"
            onClick={() => saveSvg(optimizedSVG, fileName || defaultFileName)}
          >
            <DownloadIcon />
            <span>Download</span>
          </ExportButton>
        </ExportButtons>
      ) : null}
    </Wrapper>
  )
}
