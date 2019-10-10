import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { MenuBar } from './MenuBar'
import { Sidebar } from './Sidebar'
import { ViewOverlay } from './ViewOverlay'
import { UploadScreen } from './UploadScreen'
import { SVGRenderer } from './SVGRenderer'
import { CodeRenderer } from './CodeRenderer'
import { SVGOWorker } from '../services/svgo.worker'
import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../hooks/useTheme'
import { getSVGTitle } from '../services/svgService'
import { fixFileExtension } from '../services/stringTransformService'

const Main = styled.main`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  overflow: hidden;
`

const defaultFileName = 'file.svg'

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')
  const [fileName, setFileName] = useState<string>(defaultFileName)
  const [SVGContent, setSVGContent] = useState<string>()
  const [optimizedSVGContent, setOptimizedSVGContent] = useState<string>()
  const [error, setError] = useState<Error>()

  const { settings, updateSetting } = useSettings()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (SVGContent) {
      SVGOWorker(SVGContent, settings, true, 3)
        .then(setOptimizedSVGContent)
        .catch(error => {
          console.error(error)
          setError(error)
        })
    }
  }, [SVGContent, settings])

  function openFile(contents: string, fileName?: string) {
    setSVGContent(contents)
    setFileName(fileName ? fileName : getSVGTitle(contents) || defaultFileName)
    setError(undefined)
  }

  if (!SVGContent || error) {
    return (
      <UploadScreen
        loadingError={error}
        onLoadSVG={openFile}
        hideError={() => {
          setSVGContent(undefined)
          setError(undefined)
        }}
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <MenuBar
          view={view}
          error={error}
          fileName={fileName}
          initialFile={SVGContent}
          compressedFile={optimizedSVGContent}
          onUpdateFileName={setFileName}
          onRewriteFileName={() => {
            setFileName(fixFileExtension(fileName, 'svg'))
          }}
          onChangeView={setView}
          onClose={() => setSVGContent(undefined)}
        />
        <Main>
          <Sidebar settings={settings} onSettingsUpdate={updateSetting} />
          <ViewOverlay fileName={fileName} after={optimizedSVGContent} toggleTheme={toggleTheme} />
          {view === 'svg' ? (
            <SVGRenderer SVGContent={optimizedSVGContent} />
          ) : (
            <CodeRenderer SVGContent={optimizedSVGContent} />
          )}
        </Main>
      </>
    </ThemeProvider>
  )
}
