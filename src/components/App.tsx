import React, { useState } from 'react'
import { MenuBar } from './MenuBar'
import { SVGRenderer } from './SVGRenderer'
import { carSvg } from '../images/car'
import { Sidebar } from './Sidebar'
import styled from 'styled-components'
import { CodeRenderer } from './CodeRenderer'

const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
`

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')
  const [SVGContent, setSVGContent] = useState<string | undefined>(carSvg)

  function onError() {
    alert('Invalid image')
  }

  return (
    <>
      <MenuBar onLoadSVG={setSVGContent} onChangeView={setView} />
      <Main>
        <Sidebar />
        {view === 'svg' ? (
          <SVGRenderer svgContent={SVGContent} onSvgLoadError={onError} />
        ) : (
          <CodeRenderer svgContent={SVGContent} />
        )}
      </Main>
    </>
  )
}
