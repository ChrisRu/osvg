import { useState, useEffect, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components/macro'
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
import * as svgoWorkerFile from 'workerize-loader!../services/svgo.worker'
/* eslint-enable */
import { fixFileExtension } from '../services/stringTransformService'
import { IFileDetails, loadSVGWith, createOpenFile } from '../services/fileService'
import { saveSvg } from '../services/fileService'
import { ISettings } from '../services/svgoSettings'
import { getSVGTitle } from '../services/svgService'

const Main = styled.main`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  overflow: hidden;
`

export const defaultFileName = 'file.svg'

const svgoWorker: {
  svgo: (svg: string, settings: ISettings) => Promise<string>
} = svgoWorkerFile()

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()
  const [fileName, setFileName] = useState<string>()
  const [initialSVG, setInitialSVG] = useState<string>()
  const [optimizedSVG, setOptimizedSVG] = useState<string>()
  const { prettify, precision, plugins, updatePlugin, togglePrettify, setPrecision } = useSettings()
  const { theme, toggleTheme, themeName } = useTheme()

  const loadSVG = useCallback(
    async (file?: IFileDetails) => {
      if (!file) {
        throw new Error('No file supplied')
      }

      return svgoWorker.svgo(file.contents, {
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

          const result = await svgoWorker.svgo(initialSVG, {
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
      document.title = `${fileName} | osvg`
    }
  }, [initialSVG, fileName])

  useEffect(() => {
    let cancel = false

    function keydown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 's') {
        if (optimizedSVG) {
          event.preventDefault()
          saveSvg(optimizedSVG, fileName || defaultFileName)
        }

        return
      }

      if (event.ctrlKey && event.key === 'o') {
        event.preventDefault()
        loadSVGWith(async (file) => {
          if (!file) {
            return
          }

          const result = await loadSVG(file)

          if (!cancel) {
            const fileName = file.name || getSVGTitle(file.contents)
            setInitialSVG(file?.contents)
            setOptimizedSVG(result)
            setFileName(fileName)
          }
        }, createOpenFile)(undefined)
      }
    }

    window.addEventListener('keydown', keydown)

    return function () {
      cancel = true
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
            setFileName(fileName)
          }}
        />
      ) : (
        <>
          <Menubar
            view={view}
            loading={loading}
            error={error}
            fileName={fileName}
            initialSVG={initialSVG || ''}
            optimizedSVG={optimizedSVG}
            onUpdateFileName={setFileName}
            onRewriteFileName={() =>
              setFileName(fileName ? fixFileExtension(fileName, 'svg') : defaultFileName)
            }
            onChangeView={setView}
            onClose={() => {
              setInitialSVG(undefined)
              setFileName(undefined)
              setOptimizedSVG(undefined)
            }}
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
              <ImageView optimizedSVG={optimizedSVG} fileName={fileName} />
            ) : (
              <CodeView optimizedSVG={optimizedSVG} fileName={fileName} />
            )}
          </Main>
        </>
      )}
    </ThemeProvider>
  )
}
