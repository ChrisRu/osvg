import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import darkTheme from '../plugins/prism-themes/atom-dark'
import lightTheme from '../plugins/prism-themes/atom-light'
import markup from 'refractor/lang/markup'
import { ITheme } from '../hooks/useTheme'
import { ViewOverlay } from './ViewOverlay'

SyntaxHighlighter.registerLanguage('markup', markup)

const Wrapper = styled.div`
  position: relative;
  overflow: auto;
  flex: 1;
  display: flex;
  background: ${p => p.theme.backgroundTertiary};
  color: ${p => p.theme.foreground};
`

const Code = styled(SyntaxHighlighter)`
  padding: 2rem !important;
  margin: 0 !important;
  flex: 1;
`

interface IProps {
  SVGContent?: string
  fileName: string
}

export function CodeRenderer({ SVGContent, fileName }: IProps) {
  const { themeName } = useContext<ITheme>(ThemeContext)

  return (
    <Wrapper>
      <ViewOverlay optimizedSVG={SVGContent} fileName={fileName} />
      {SVGContent ? (
        <Code language="markup" style={themeName === 'light' ? lightTheme : darkTheme}>
          {SVGContent}
        </Code>
      ) : (
        <span>No SVG loaded</span>
      )}
    </Wrapper>
  )
}
