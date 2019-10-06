import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { svgToDataUri } from '../services/svgToDataUri'

function createTransparentBackgroundImage(color: string) {
  return svgToDataUri(`<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2">
    <path fill="${color}" d="M0 0h1v1H0zM1 1h1v1H1z"/>
  </svg>`)
}

const Wrapper = styled.div<{ gridSize: number; transparentColor: string }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: ${p => p.gridSize}px;
  background-repeat: repeat;
  background-image: url('${p => createTransparentBackgroundImage(p.transparentColor)}');
  overflow: hidden;
`

const StyledObject = styled.object<{ hasWidth: boolean; zoom: number }>`
  max-height: 100%;
  max-width: 100%;
  min-width: ${p => (p.hasWidth ? undefined : '100%')};
  min-height: ${p => (p.hasWidth ? undefined : '100%')};
  transform: scale(${p => p.zoom});
  transition: transform 0.1s;
  pointer-events: none;
`

interface IProps {
  SVGContent?: string
  gridSize?: number
  transparentColor?: string
}

export function SVGRenderer({ SVGContent, gridSize = 40, transparentColor = '#efefef' }: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    function scroll(event: any) {
      console.log(event)
      setZoom(zoom => zoom + (event.deltaY * -1) / 100)
      setZoom(zoom => (zoom < 0 ? 0 : zoom))
    }

    if (ref.current) {
      ref.current.addEventListener('wheel', scroll)
    }

    return function() {
      if (ref.current) {
        ref.current.removeEventListener('wheel', scroll)
      }
    }
  }, [])

  return (
    <Wrapper ref={ref} gridSize={gridSize} transparentColor={transparentColor}>
      {SVGContent ? (
        <StyledObject
          zoom={zoom}
          hasWidth={SVGContent !== undefined && /^<svg[^>]+width=/.test(SVGContent)}
          type="image/svg+xml"
          data={svgToDataUri(SVGContent)}
        />
      ) : null}
    </Wrapper>
  )
}
