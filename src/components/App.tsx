import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MenuBar } from './MenuBar'
import { Sidebar } from './Sidebar'
import { Overlay } from './Overlay'
import { SVGRenderer } from './SVGRenderer'
import { CodeRenderer } from './CodeRenderer'
import { SVGOWorker } from '../services/svgo.worker'
import { IFileDetails } from '../services/openFile'
import { dogSvg } from '../images/dog'
import { useSettings } from '../hooks/settingsHook'
import { WarningIcon } from './Icons'

const Main = styled.main`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  overflow: hidden;
`

const ErrorMessage = styled.div`
  background: #000;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.1rem;
    max-width: 25rem;
    opacity: 0.9;
    color: #fff;
  }
`

const ErrorTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 2.4rem;
    margin-right: 1rem;
    stroke: #fff;
  }

  h1 {
    font-size: 1.4rem;
    color: #fff;
    margin: 0;
  }
`

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')
  const [SVGContent, setSVGContent] = useState<IFileDetails>()
  const [optimizedSVGContent, setOptimizedSVGContent] = useState<string>()
  const { settings, updateSetting } = useSettings()
  const [error, setError] = useState<Error>()

  function openFile(svgFile: IFileDetails) {
    setSVGContent(svgFile)
    setError(undefined)
  }

  useEffect(() => {
    openFile({ contents: dogSvg, name: 'doggo.svg' })
  }, [])

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

  return (
    <>
      <MenuBar
        view={view}
        error={error}
        before={SVGContent}
        after={optimizedSVGContent}
        onChangeView={setView}
        onLoadSVG={openFile}
      />
      <Main>
        {SVGContent === undefined ? (
          <ErrorMessage>
            <span>Please upload an SVG</span>
          </ErrorMessage>
        ) : error !== undefined ? (
          <ErrorMessage>
            <ErrorTitle>
              <WarningIcon />
              <h1>Failed loading image</h1>
            </ErrorTitle>
            <p>
              Please check if the file you uploaded is an SVG and if it&apos;s valid by W3
              standards.
            </p>
          </ErrorMessage>
        ) : (
          <>
            <Sidebar settings={settings} onSettingsUpdate={updateSetting} />
            <Overlay before={SVGContent} after={optimizedSVGContent} />
            {view === 'svg' ? (
              <SVGRenderer SVGContent={optimizedSVGContent} />
            ) : (
              <CodeRenderer SVGContent={optimizedSVGContent} />
            )}
          </>
        )}
      </Main>
    </>
  )
}
