import React from 'react'
import styled from 'styled-components'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import darkTheme from '../plugins/prism-themes/atom-dark'
import lightTheme from '../plugins/prism-themes/atom-light'
import markup from 'refractor/lang/markup'

SyntaxHighlighter.registerLanguage('markup', markup)

const Wrapper = styled.div`
  background: ${p => p.theme.backgroundTertiary};
  color: ${p => p.theme.foreground};
  flex: 1;
  overflow: auto;
  display: flex;
`

const Code = styled(SyntaxHighlighter)`
  padding: 2rem !important;
  margin: 0 !important;
  flex: 1;
`

interface IProps {
  SVGContent?: string
  theme: 'light' | 'dark'
}

export function CodeRenderer({ SVGContent, theme }: IProps) {
  return (
    <Wrapper>
      {SVGContent ? (
        <Code language="markup" style={theme === 'light' ? lightTheme : darkTheme}>
          {SVGContent}
        </Code>
      ) : (
        <span>No SVG loaded</span>
      )}
    </Wrapper>
  )
}
