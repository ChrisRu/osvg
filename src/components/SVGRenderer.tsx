import React from 'react'
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
`

const StyledObject = styled.object`
  max-height: 90vh;
  max-width: 100vw;
  min-height: 50vh;
  min-width: 50vw;
`

interface IProps {
  SVGContent?: string
  gridSize?: number
  transparentColor?: string
}

export function SVGRenderer({ SVGContent, gridSize = 40, transparentColor = '#efefef' }: IProps) {
  return (
    <Wrapper gridSize={gridSize} transparentColor={transparentColor}>
      {SVGContent ? <StyledObject type="image/svg+xml" data={svgToDataUri(SVGContent)} /> : null}
    </Wrapper>
  )
}
