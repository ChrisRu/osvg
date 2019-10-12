import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { MenuBar } from './MenuBar'
import { Sidebar } from './Sidebar'
import { HomeScreen } from './HomeScreen'
import { SVGRenderer } from './SVGRenderer'
import { CodeRenderer } from './CodeRenderer'
import { SVGOWorker } from '../services/svgo.worker'
import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../hooks/useTheme'
import { getSVGTitle } from '../services/svgService'
import { fixFileExtension } from '../services/stringTransformService'
import { createOpenFile } from '../services/openFile'
import { saveSvg } from '../services/saveSvg'

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
  const [fileName, setFileName] = useState<string>()
  const [SVGContent, setSVGContent] = useState<string>()
  const [optimizedSVGContent, setOptimizedSVGContent] = useState<string>()
  const [error, setError] = useState<Error>()

  const { settings, updateSetting, togglePrettify, setPrecision } = useSettings()
  const { theme, toggleTheme, themeName } = useTheme()

  useEffect(() => {
    if (!SVGContent || !fileName) {
      document.title = 'oSVG | Optimize your SVGs'
    } else {
      document.title = `${fileName || defaultFileName} | oSVG`
    }
  }, [SVGContent, fileName])

  useEffect(() => {
    async function keydown(event: KeyboardEvent) {
      if (event.ctrlKey) {
        if (event.key === 'o') {
          event.preventDefault()
          const details = await createOpenFile()
          openFile(details.contents, details.name)
        }

        if (event.key === 's') {
          if (optimizedSVGContent) {
            event.preventDefault()
            saveSvg(optimizedSVGContent, fileName || defaultFileName)
          }
        }
      }
    }

    window.addEventListener('keydown', keydown)

    return function() {
      window.removeEventListener('keydown', keydown)
    }
  }, [optimizedSVGContent, fileName])

  useEffect(() => {
    if (SVGContent) {
      SVGOWorker(SVGContent, settings.plugins, settings.prettify, settings.precision)
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
      <HomeScreen
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
    <ThemeProvider theme={{ ...theme, themeName, toggleTheme }}>
      <>
        <MenuBar
          view={view}
          error={error}
          fileName={fileName}
          initialSVG={SVGContent}
          optimizedSVG={optimizedSVGContent}
          onUpdateFileName={setFileName}
          onRewriteFileName={() =>
            setFileName(fileName ? fixFileExtension(fileName, 'svg') : defaultFileName)
          }
          onChangeView={setView}
          onClose={() => setSVGContent(undefined)}
        />
        <Main>
          <Sidebar
            settings={settings}
            togglePrettify={togglePrettify}
            setPrecision={setPrecision}
            onSettingsUpdate={updateSetting}
          />
          {view === 'svg' ? (
            <SVGRenderer SVGContent={optimizedSVGContent} fileName={fileName || defaultFileName} />
          ) : (
            <CodeRenderer SVGContent={optimizedSVGContent} fileName={fileName || defaultFileName} />
          )}
        </Main>
      </>
    </ThemeProvider>
  )
}
