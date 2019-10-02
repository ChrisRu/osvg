import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #000;
  color: #fff;
`

interface IProps {
  svgContent?: string
}

export function CodeRenderer({ svgContent }: IProps) {
  return <Wrapper>{svgContent ? <code>{svgContent}</code> : <span>No SVG loaded</span>}</Wrapper>
}
