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
  const [error, setError] = useState<Error>()
  const [fileName, setFileName] = useState<string>('')
  const [initialSVG, setInitialSVG] = useState<string>()
  const [optimizedSVG, setOptimizedSVGContent] = useState<string>()

  const { settings, updateSetting, togglePrettify, setPrecision } = useSettings()
  const { theme, toggleTheme, themeName } = useTheme()

  useEffect(() => {
    if (!initialSVG || !fileName) {
      document.title = 'oSVG | Optimize your SVGs'
    } else {
      document.title = `${fileName || defaultFileName} | oSVG`
    }
  }, [initialSVG, fileName])

  useEffect(() => {
    async function keydown(event: KeyboardEvent) {
      if (event.ctrlKey) {
        if (event.key === 'o') {
          event.preventDefault()
          const details = await createOpenFile()
          openFile(details.contents, details.name)
        }

        if (event.key === 's') {
          if (optimizedSVG) {
            event.preventDefault()
            saveSvg(optimizedSVG, fileName || defaultFileName)
          }
        }
      }
    }

    window.addEventListener('keydown', keydown)

    return function() {
      window.removeEventListener('keydown', keydown)
    }
  }, [optimizedSVG, fileName])

  useEffect(() => {
    if (initialSVG) {
      SVGOWorker(initialSVG, settings.plugins, settings.prettify, settings.precision)
        .then(setOptimizedSVGContent)
        .catch(error => {
          console.error(error)
          setError(error)
        })
    }
  }, [initialSVG, settings])

  function openFile(contents: string, fileName?: string) {
    setInitialSVG(contents)
    setFileName(fileName ? fileName : getSVGTitle(contents) || defaultFileName)
    setError(undefined)
  }

  if (!initialSVG || error) {
    return (
      <HomeScreen
        loadingError={error}
        onLoadSVG={openFile}
        hideError={() => {
          setInitialSVG(undefined)
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
          initialSVG={initialSVG}
          optimizedSVG={optimizedSVG}
          onUpdateFileName={setFileName}
          onRewriteFileName={() =>
            setFileName(fileName ? fixFileExtension(fileName, 'svg') : defaultFileName)
          }
          onChangeView={setView}
          onClose={() => setInitialSVG(undefined)}
        />
        <Main>
          <Sidebar
            settings={settings}
            onSettingsUpdate={updateSetting}
            togglePrettify={togglePrettify}
            setPrecision={setPrecision}
          />
          {view === 'svg' ? (
            <SVGRenderer
              initialSVG={initialSVG}
              optimizedSVG={optimizedSVG}
              fileName={fileName || defaultFileName}
            />
          ) : (
            <CodeRenderer
              initialSVG={initialSVG}
              optimizedSVG={optimizedSVG}
              fileName={fileName || defaultFileName}
            />
          )}
        </Main>
      </>
    </ThemeProvider>
  )
}
