import { lazy, Suspense, useContext, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import darkTheme from '../../plugins/prism-themes/atom-dark'
import lightTheme from '../../plugins/prism-themes/atom-light'
import type { IThemeContext } from '../../hooks/useTheme'
import { ViewOverlay } from './ViewOverlay'
import { LoadingIcon } from '../elements/Icons'

const Wrapper = styled.div`
  position: relative;
  overflow: auto;
  flex: 1;
  display: flex;
  background: ${(p) => p.theme.backgroundTertiary};
  color: ${(p) => p.theme.text};
`

interface IProps {
  optimizing: boolean
  optimizedSVG?: string
  fileName?: string
  pretty?: boolean
}

const MarkupHighlighter = styled(lazy(() => import('../elements/MarkupHighlighter')))`
  padding: 2rem !important;
  margin: 0 !important;
  flex: 1;
`

const LoadingSyntaxHighlighter = styled.div`
  padding: 2rem;
  font-family: monospace;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 60px;
    height: 60px;
  }
`

export function CodeView({ optimizedSVG, pretty, fileName }: IProps) {
  const codeRef = useRef<HTMLDivElement>(null)
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
      <Suspense
        fallback={
          <LoadingSyntaxHighlighter>
            <LoadingIcon />
          </LoadingSyntaxHighlighter>
        }
      >
        <MarkupHighlighter style={themeName === 'light' ? lightTheme : darkTheme} pretty={pretty}>
          {optimizedSVG || ''}
        </MarkupHighlighter>
      </Suspense>
    </Wrapper>
  )
}
