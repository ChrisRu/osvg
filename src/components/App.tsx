import { useState, useEffect, useCallback, useReducer } from 'react'
import styled, { ThemeProvider } from 'styled-components/macro'
import { Menubar } from './Menubar'
import { Sidebar } from './Sidebar'
import { HomeScreen } from './HomeScreen'
import { ImageView } from './views/ImageView'
import { CodeView } from './views/CodeView'
import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../hooks/useTheme'
// I don't often write comments, but when I do;
/* eslint-disable */
// @ts-ignore
import * as svgoWorkerFile from 'workerize-loader!../services/svgo.worker'
/* eslint-enable */
import { IFileDetails, loadSVGWith, createOpenFile } from '../services/fileService'
import { saveSVG } from '../services/fileService'
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

interface AppState {
  optimizedOnce: boolean
  optimizing: boolean
  error: Error | undefined
  fileName: string | undefined
  initialSVG: string | undefined
  optimizedSVG: string | undefined
}

type AppStateAction =
  | { type: 'initial' }
  | { type: 'optimizing' }
  | { type: 'optimized'; payload: string }
  | { type: 'optimize-error'; payload: Error }
  | { type: 'load-file'; payload: { fileName: string; initialSVG: string } }
  | { type: 'update-file'; payload: { fileName: string } }

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')

  const [state, dispatch] = useReducer(
    (state: AppState, action: AppStateAction): AppState => {
      switch (action.type) {
        case 'initial':
          return {
            optimizedOnce: false,
            optimizing: false,
            error: undefined,
            fileName: undefined,
            initialSVG: undefined,
            optimizedSVG: undefined,
          }
        case 'load-file':
          return {
            ...state,
            optimizedOnce: false,
            optimizing: false,
            error: undefined,
            fileName: action.payload.fileName,
            initialSVG: action.payload.initialSVG,
            optimizedSVG: undefined,
          }
        case 'update-file':
          return {
            ...state,
            fileName: action.payload.fileName,
          }
        case 'optimizing':
          return {
            ...state,
            error: undefined,
            optimizing: true,
          }
        case 'optimized':
          return {
            ...state,
            optimizedOnce: true,
            optimizing: false,
            optimizedSVG: action.payload,
          }
        case 'optimize-error':
          return {
            error: action.payload,
            optimizedOnce: false,
            optimizing: false,
            fileName: undefined,
            initialSVG: undefined,
            optimizedSVG: undefined,
          }
      }
    },
    {
      optimizedOnce: false,
      optimizing: false,
      error: undefined,
      fileName: undefined,
      initialSVG: undefined,
      optimizedSVG: undefined,
    },
  )

  const { prettify, precision, plugins, updatePlugin, togglePrettify, setPrecision } = useSettings()
  const theme = useTheme()

  useEffect(() => {
    let cancelled = false

    async function compressSVG() {
      try {
        if (!state.initialSVG) {
          return
        }

        dispatch({ type: 'optimizing' })

        const result = await svgoWorker.svgo(state.initialSVG, {
          prettify,
          precision,
          plugins,
        })

        if (!cancelled) {
          dispatch({ type: 'optimized', payload: result })
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Could not optimize SVG', error)
          dispatch({ type: 'optimize-error', payload: error })
        }
      }
    }

    compressSVG()

    return () => {
      cancelled = true
    }
  }, [state.initialSVG, plugins, precision, prettify])

  useEffect(() => {
    if (!state.initialSVG || !state.fileName) {
      document.title = 'osvg | Optimize your SVGs'
    } else {
      document.title = `${state.fileName} | osvg`
    }
  }, [state.initialSVG, state.fileName])

  useEffect(() => {
    let cancel = false

    function keydown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 's') {
        if (state.optimizedSVG) {
          event.preventDefault()
          saveSVG(state.optimizedSVG, state.fileName || defaultFileName)
        }

        return
      }

      if (event.ctrlKey && event.key === 'o') {
        event.preventDefault()
        loadSVGWith(async (file) => {
          if (!file) {
            return
          }

          if (!cancel) {
            const fileName = file.name || getSVGTitle(file.contents) || defaultFileName
            dispatch({
              type: 'load-file',
              payload: { fileName, initialSVG: file.contents },
            })
          }
        }, createOpenFile)(undefined)
      }
    }

    window.addEventListener('keydown', keydown)

    return function () {
      cancel = true
      window.removeEventListener('keydown', keydown)
    }
  }, [state.fileName, state.optimizedSVG])

  const preloadSVG = useCallback((fileDetails: IFileDetails | undefined) => {
    if (fileDetails) {
      dispatch({
        type: 'load-file',
        payload: {
          fileName: fileDetails.name || defaultFileName,
          initialSVG: fileDetails.contents,
        },
      })
    }
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'initial' })
  }, [])

  const updateFileName = useCallback((fileName: string) => {
    dispatch({
      type: 'update-file',
      payload: {
        fileName: fileName || defaultFileName,
      },
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {!state.optimizedOnce || !state.initialSVG || state.error ? (
        <HomeScreen
          loading={state.optimizing}
          error={state.error}
          onPreloadSVG={preloadSVG}
          onReset={reset}
        />
      ) : (
        <>
          <Menubar
            view={view}
            loading={state.optimizing}
            error={state.error}
            fileName={state.fileName}
            initialSVG={state.initialSVG}
            optimizedSVG={state.optimizedSVG}
            onUpdateFileName={updateFileName}
            onChangeView={setView}
            onClose={reset}
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
            {view === 'svg' ? (
              <ImageView
                optimizing={state.optimizing}
                optimizedSVG={state.optimizedSVG}
                fileName={state.fileName}
              />
            ) : (
              <CodeView
                optimizing={state.optimizing}
                optimizedSVG={state.optimizedSVG}
                fileName={state.fileName}
              />
            )}
          </Main>
        </>
      )}
    </ThemeProvider>
  )
}
