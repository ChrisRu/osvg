import React, { useState } from 'react'
import { MenuBar } from './MenuBar'
import { SVGRenderer } from './SVGRenderer'
import { carSvg } from '../images/car'

export function App() {
  const [SVGContent, setSVGContent] = useState<string | undefined>(carSvg)

  function onError() {
    alert('Invalid image')
  }

  return (
    <>
      <MenuBar onLoadSVG={setSVGContent} />
      <SVGRenderer svgContent={SVGContent} onSvgLoadError={onError} />
    </>
  )
}
