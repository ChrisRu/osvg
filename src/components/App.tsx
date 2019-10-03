import React, { useState, useEffect } from 'react'
import { MenuBar } from './MenuBar'
import { SVGRenderer } from './SVGRenderer'
import { carSvg } from '../images/car'
import { Sidebar } from './Sidebar'
import styled from 'styled-components'
import { CodeRenderer } from './CodeRenderer'
import * as worker from '../services/svgo.worker'
import { plugins } from '../services/svgoOptions'

const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
`

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')
  const [SVGContent, setSVGContent] = useState<string | undefined>()
  const [optimizedSVGContent, setOptimizedSVGContent] = useState<string | undefined>()

  useEffect(() => {
    setSVGContent(carSvg)
    setOptimizedSVGContent(carSvg)
  }, [])

  useEffect(() => {
    if (SVGContent) {
      ;(async function() {
        const options = plugins.map(plugin => ({ [plugin.id]: true }))
        const result = await worker.SVGOWorker(SVGContent, options as any, 3)
        setOptimizedSVGContent(result)
      })()
    }
  }, [SVGContent])

  function onError(error: any) {
    console.error(error)
  }

  return (
    <>
      <MenuBar onLoadSVG={setSVGContent} onChangeView={setView} />
      <Main>
        <Sidebar />
        {view === 'svg' ? (
          <SVGRenderer SVGContent={optimizedSVGContent} onLoadError={onError} />
        ) : (
          <CodeRenderer SVGContent={optimizedSVGContent} />
        )}
      </Main>
    </>
  )
}
