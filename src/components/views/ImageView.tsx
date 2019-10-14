import React, { useState } from 'react'
import styled from 'styled-components'
import { SVGToDataUri } from '../../services/svgService'
import { PanAndZoom } from '../elements/PanAndZoom'
import { ViewOverlay } from './ViewOverlay'

function createBackground(color: string, size: number) {
  return SVGToDataUri(`<svg fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 2 2">
    <path fill="${color}" d="M0 0h1v1H0zM1 1h1v1H1z"/>
  </svg>`)
}

const Wrapper = styled.div<{ gridSize: number }>`
  position: relative;
  flex: 1;
  display: flex;
  overflow: hidden;
  background-repeat: repeat;
  background: ${p => p.theme.background};
  background-image: url('${p => createBackground(p.theme.backgroundSecondary, p.gridSize)}');
`

const StyledObject = styled.object<{ hasWidth?: boolean }>`
  flex: 1;
  min-width: ${p => (p.hasWidth ? undefined : '100%')};
  min-height: ${p => (p.hasWidth ? undefined : '100%')};
  max-width: 100%;
  max-height: 100%;
`

interface IProps {
  initialSVG: string
  optimizedSVG?: string
  gridSize?: number
  fileName: string
}

export function ImageView({ initialSVG, optimizedSVG, fileName, gridSize = 50 }: IProps) {
  const [showOriginal, setShowOriginal] = useState(false)

  const SVG = showOriginal || !optimizedSVG ? initialSVG : optimizedSVG

  return (
    <Wrapper gridSize={gridSize}>
      <ViewOverlay
        optimizedSVG={optimizedSVG}
        fileName={fileName}
        original={showOriginal}
        onToggleOriginal={() => setShowOriginal(v => !v)}
      />
      <PanAndZoom>
        <StyledObject
          hasWidth={SVG !== undefined && /^<svg[^>]+width=/.test(SVG)}
          type="image/svg+xml"
          data={SVGToDataUri(SVG)}
        />
      </PanAndZoom>
    </Wrapper>
  )
}
