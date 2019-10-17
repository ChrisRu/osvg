import React, { useState, useEffect, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Menubar } from './Menubar'
import { Sidebar } from './Sidebar'
import { HomeScreen } from './HomeScreen'
import { ImageView } from './views/ImageView'
import { CodeView } from './views/CodeView'
import { LoadingView } from './views/LoadingView'
import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../hooks/useTheme'
// I don't often write comments, but when I do;
/* eslint-disable */
// @ts-ignore
import * as workerFile from 'workerize-loader!../services/svgo.worker'
/* eslint-enable */
import { fixFileExtension } from '../services/stringTransformService'
import { IFileDetails } from '../services/fileService'
import { saveSvg } from '../services/fileService'
import { ISettings } from '../services/svgoSettings'

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
  const [optimizedSVG, setOptimizedSVG] = useState<string>()

  const { prettify, precision, plugins, updatePlugin, togglePrettify, setPrecision } = useSettings()
  const { theme, toggleTheme, themeName } = useTheme()

  const loadSVG = useCallback(
    async (file: IFileDetails | undefined) => {
      if (!file) {
        throw new Error('No file supplied')
      }

      return worker.svgo(file.contents, {
        prettify,
        precision,
        plugins,
      })
    },
    [plugins, precision, prettify],
  )

  useEffect(() => {
    if (initialSVG) {
      let cancelled = false
      ;(async () => {
        try {
          setLoading(true)

          const result = await worker.svgo(initialSVG, {
            prettify,
            precision,
            plugins,
          })
          if (!cancelled) {
            setOptimizedSVG(result)
          }
        } catch (error) {
          console.error('Could not optimize SVG', error)
          if (!cancelled) {
            setError(error)
          }
        } finally {
          if (!cancelled) {
            setLoading(false)
          }
        }
      })()

      return () => {
        cancelled = true
      }
    }
  }, [initialSVG, plugins, precision, prettify])

  useEffect(() => {
    if (!initialSVG || !fileName) {
      document.title = 'osvg | Optimize your SVGs'
    } else {
      document.title = `${fileName || defaultFileName} | osvg`
    }
  }, [initialSVG, fileName])

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 's') {
        if (optimizedSVG) {
          event.preventDefault()
          saveSvg(optimizedSVG, fileName || defaultFileName)
        }
      }
    }

    window.addEventListener('keydown', keydown)

    return function() {
      window.removeEventListener('keydown', keydown)
    }
  }, [optimizedSVG, fileName, loadSVG])

  return (
    <ThemeProvider theme={{ ...theme, themeName, toggleTheme }}>
      {!initialSVG || error ? (
        <HomeScreen
          onPreloadSVG={loadSVG}
          onLoadSVG={(initialSVG, optimizedSVG, fileName) => {
            setInitialSVG(initialSVG)
            setOptimizedSVG(optimizedSVG)
            setFileName(fileName || defaultFileName)
          }}
        />
      ) : (
        <>
          <Menubar
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
              plugins={plugins}
              prettify={prettify}
              precision={precision}
              onUpdatePlugin={updatePlugin}
              togglePrettify={togglePrettify}
              setPrecision={setPrecision}
            />
            {loading ? (
              <LoadingView />
            ) : view === 'svg' ? (
              <ImageView
                initialSVG={initialSVG}
                optimizedSVG={optimizedSVG}
                fileName={fileName || defaultFileName}
              />
            ) : (
              <CodeView
                initialSVG={initialSVG}
                optimizedSVG={optimizedSVG}
                fileName={fileName || defaultFileName}
              />
            )}
          </Main>
        </>
      )}
    </ThemeProvider>
  )
}
