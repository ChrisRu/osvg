import React from 'react'
import styled from 'styled-components'

function createTransparentBackgroundImage(color: string) {
  return encodeURIComponent(`<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2">
    <path fill="${color}" d="M0 0h1v1H0zM1 1h1v1H1z"/>
  </svg>`)
}

const Wrapper = styled.div<{ gridSize: number; color: string }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: ${p => p.gridSize}px;
  background-repeat: repeat;
  background-image: url(data:image/svg+xml;utf8,${p => createTransparentBackgroundImage(p.color)});
`

const StyledImage = styled.img`
  max-height: 90vh;
  max-width: 100vw;
`

interface IProps {
  svgContent?: string
  onSvgLoadError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void
  gridSize?: number
  transparentColor?: string
}

export function SVGRenderer({
  svgContent,
  onSvgLoadError,
  gridSize = 40,
  transparentColor = '#efefef',
}: IProps) {
  return (
    <Wrapper gridSize={gridSize} color={transparentColor}>
      {svgContent ? (
        <StyledImage
          src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`}
          onError={onSvgLoadError}
          alt="edited SVG image"
        />
      ) : null}
    </Wrapper>
  )
}
