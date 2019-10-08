import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { MenuBar } from './MenuBar'
import { Sidebar } from './Sidebar'
import { ViewOverlay } from './ViewOverlay'
import { UploadScreen } from './UploadScreen'
import { SVGRenderer } from './SVGRenderer'
import { CodeRenderer } from './CodeRenderer'
import { SVGOWorker } from '../services/svgo.worker'
import { IFileDetails } from '../services/openFile'
import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../hooks/useTheme'

const Main = styled.main`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  overflow: hidden;
`

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')
  const [SVGContent, setSVGContent] = useState<IFileDetails>()
  const [optimizedSVGContent, setOptimizedSVGContent] = useState<string>()
  const [error, setError] = useState<Error>()

  const { settings, updateSetting } = useSettings()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (SVGContent) {
      SVGOWorker(SVGContent.contents, settings, true, 3)
        .then(setOptimizedSVGContent)
        .catch(error => {
          console.error(error)
          setError(error)
        })
    }
  }, [SVGContent, settings])

  function openFile(svgFile: IFileDetails) {
    setSVGContent(svgFile)
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
          before={SVGContent}
          after={optimizedSVGContent}
          onChangeView={setView}
          onClose={() => setSVGContent(undefined)}
        />
        <Main>
          <Sidebar settings={settings} onSettingsUpdate={updateSetting} />
          <ViewOverlay before={SVGContent} after={optimizedSVGContent} toggleTheme={toggleTheme} />
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
