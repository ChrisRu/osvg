import React from 'react'
import styled from 'styled-components'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml'
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-light'
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark'

SyntaxHighlighter.registerLanguage('javascript', xml)

const Wrapper = styled.div`
  background: ${p => p.theme.background};
  color: ${p => p.theme.foreground};
  flex: 1;
  overflow: auto;
`

const Code = styled(SyntaxHighlighter)`
  padding: 2rem !important;
  margin: 0;
  flex: 1;
  word-wrap: anywhere;
  white-space: pre-wrap;

  > pre {
    padding: 2rem;
  }
`

interface IProps {
  SVGContent?: string
  theme: 'light' | 'dark'
}

export function CodeRenderer({ SVGContent, theme }: IProps) {
  return (
    <Wrapper>
      {SVGContent ? (
        <Code language="xml" style={theme === 'light' ? lightTheme : darkTheme}>
          {SVGContent}
        </Code>
      ) : (
        <span>No SVG loaded</span>
      )}
    </Wrapper>
  )
}
