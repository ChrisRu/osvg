import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { MenuBar } from './MenuBar'
import { Sidebar } from './Sidebar'
import { HomeScreen } from './HomeScreen'
import { SVGRenderer } from './SVGRenderer'
import { CodeRenderer } from './CodeRenderer'
import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../hooks/useTheme'
/* eslint-disable */
// @ts-ignore
import * as workerFile from 'workerize-loader!../services/svgo.worker'
/* eslint-enable */
import { getSVGTitle } from '../services/svgService'
import { fixFileExtension } from '../services/stringTransformService'
import { createOpenFile } from '../services/openFile'
import { saveSvg } from '../services/saveSvg'
import { ISettings } from '../services/svgoSettings'
import { LoadingRenderer } from './LoadingRenderer'

const Main = styled.main`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  overflow: hidden;
`

const worker: {
  svgo: (svg: string, settings: ISettings) => Promise<string>
} = workerFile()

export const defaultFileName = 'file.svg'

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')
  const [loading, setLoading] = useState(false)
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
      let cancel = false
      ;(async () => {
        try {
          setLoading(true)

          const result = await worker.svgo(initialSVG, settings)

          if (!cancel) {
            setOptimizedSVGContent(result)
          }
        } catch (error) {
          if (!cancel) {
            console.error('Could not optimize SVG', error)
            setError(error)
          }
        } finally {
          if (!cancel) {
            setLoading(false)
          }
        }
      })()

      return () => {
        cancel = true
      }
    }
  }, [initialSVG, settings])

  function openFile(contents: string, fileName?: string) {
    setInitialSVG(contents)
    setOptimizedSVGContent(undefined)
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
          setFileName('')
          setOptimizedSVGContent(undefined)
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
          loading={loading}
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
          {loading ? (
            <LoadingRenderer />
          ) : view === 'svg' ? (
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
