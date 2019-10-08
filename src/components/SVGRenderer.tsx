import React from 'react'
import styled from 'styled-components'
import { svgToDataUri } from '../services/svgToDataUri'
import { PanAndZoom } from './elements/PanAndZoom'

function createTransparentBackgroundImage(color: string, size: number) {
  return svgToDataUri(`<svg fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 2 2">
    <path fill="${color}" d="M0 0h1v1H0zM1 1h1v1H1z"/>
  </svg>`)
}

const Wrapper = styled.div<{ gridSize: number; colorPattern: [string, string] }>`
  flex: 1;
  display: flex;
  overflow: hidden;
  background-repeat: repeat;
  background: ${p => p.colorPattern[0]};
  background-image: url('${p => createTransparentBackgroundImage(p.colorPattern[1], p.gridSize)}');
`

const StyledObject = styled.object<{ hasWidth?: boolean }>`
  flex: 1;
  min-width: ${p => (p.hasWidth ? undefined : '100%')};
  min-height: ${p => (p.hasWidth ? undefined : '100%')};
  max-width: 100%;
  max-height: 100%;
`

interface IProps {
  SVGContent?: string
  gridSize?: number
  colorPattern?: [string, string]
}

export function SVGRenderer({
  SVGContent,
  gridSize = 50,
  colorPattern = ['#222', '#282828'],
}: IProps) {
  return (
    <Wrapper gridSize={gridSize} colorPattern={colorPattern}>
      {SVGContent ? (
        <PanAndZoom>
          <StyledObject
            hasWidth={SVGContent !== undefined && /^<svg[^>]+width=/.test(SVGContent)}
            type="image/svg+xml"
            data={svgToDataUri(SVGContent)}
          />
        </PanAndZoom>
      ) : null}
    </Wrapper>
  )
}
