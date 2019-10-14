import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import markup from 'refractor/lang/markup'
import darkTheme from '../../plugins/prism-themes/atom-dark'
import lightTheme from '../../plugins/prism-themes/atom-light'
import { IThemeContext } from '../../hooks/useTheme'
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
  initialSVG: string
  optimizedSVG?: string
  fileName: string
}

export function CodeView({ initialSVG, optimizedSVG, fileName }: IProps) {
  const [showOriginal, setShowOriginal] = useState(false)
  const { themeName } = useContext<IThemeContext>(ThemeContext)

  const SVG = showOriginal || !optimizedSVG ? initialSVG : optimizedSVG

  return (
    <Wrapper>
      <ViewOverlay
        optimizedSVG={optimizedSVG}
        fileName={fileName}
        original={showOriginal}
        onToggleOriginal={() => setShowOriginal(v => !v)}
      />
      <Code language="markup" style={themeName === 'light' ? lightTheme : darkTheme}>
        {SVG}
      </Code>
    </Wrapper>
  )
}
