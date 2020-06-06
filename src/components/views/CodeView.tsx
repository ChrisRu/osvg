import React, { useContext, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import markup from 'refractor/lang/markup'
import darkTheme from '../../plugins/prism-themes/atom-dark'
import lightTheme from '../../plugins/prism-themes/atom-light'
import { IThemeContext } from '../../hooks/useTheme'
import { ViewOverlay } from './ViewOverlay'

const Wrapper = styled.div`
  position: relative;
  overflow: auto;
  flex: 1;
  display: flex;
  background: ${(p) => p.theme.backgroundTertiary};
  color: ${(p) => p.theme.text};
`

const Code = styled(SyntaxHighlighter)`
  padding: 2rem !important;
  margin: 0 !important;
  flex: 1;
`

SyntaxHighlighter.registerLanguage('markup', markup)

interface IProps {
  optimizedSVG?: string
  fileName?: string
}

export function CodeView({ optimizedSVG, fileName }: IProps) {
  const codeRef = useRef<any>()
  const { themeName } = useContext<IThemeContext>(ThemeContext)

  return (
    <Wrapper
      ref={codeRef}
      onClick={(event) => {
        if (((event as unknown) as MouseEvent).detail === 3 && codeRef.current) {
          const range = document.createRange()
          range.selectNodeContents(codeRef.current)

          const selection = window.getSelection()
          if (selection) {
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
      }}
    >
      <ViewOverlay optimizedSVG={optimizedSVG} fileName={fileName} />
      <Code language="markup" style={themeName === 'light' ? lightTheme : darkTheme}>
        {optimizedSVG || ''}
      </Code>
    </Wrapper>
  )
}
