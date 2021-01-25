import markup from 'refractor/lang/markup'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter'

SyntaxHighlighter.registerLanguage('markup', markup)

export default function MarkupHighlighter({
  children,
  pretty,
  ...props
}: SyntaxHighlighterProps & { pretty?: boolean }) {
  return (
    <SyntaxHighlighter language="markup" wrapLongLines={!pretty} {...props}>
      {children}
    </SyntaxHighlighter>
  )
}
