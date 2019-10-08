import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MenuBar } from './MenuBar'
import { Sidebar } from './Sidebar'
import { Overlay } from './Overlay'
import { SVGRenderer } from './SVGRenderer'
import { CodeRenderer } from './CodeRenderer'
import { SVGOWorker } from '../services/svgo.worker'
import { IFileDetails } from '../services/openFile'
import { useSettings } from '../hooks/useSettings'
import { WarningIcon } from './elements/Icons'
import { useTheme } from '../hooks/useTheme'
import { UploadScreen } from './UploadScreen'

const Main = styled.main`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  overflow: hidden;
`

const ErrorMessage = styled.div`
  background: #000;
  color: #fff;
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

  if (SVGContent === undefined) {
    return <UploadScreen onLoadSVG={openFile} />
  }

  if (error !== undefined) {
    return (
      <ErrorMessage>
        <ErrorTitle>
          <WarningIcon />
          <h1>Failed loading image</h1>
        </ErrorTitle>
        <p>
          Please check if the file you uploaded is an SVG and if it&apos;s valid by W3 standards.
        </p>
      </ErrorMessage>
    )
  }

  return (
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
        <Overlay
          before={SVGContent}
          after={optimizedSVGContent}
          iconColor={theme.iconColor}
          toggleTheme={toggleTheme}
        />
        {view === 'svg' ? (
          <SVGRenderer SVGContent={optimizedSVGContent} colorPattern={theme.colorPattern} />
        ) : (
          <CodeRenderer SVGContent={optimizedSVGContent} />
        )}
      </Main>
    </>
  )
}
