import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #000;
  color: #fff;
`

interface IProps {
  SVGContent?: string
}

export function CodeRenderer({ SVGContent }: IProps) {
  return <Wrapper>{SVGContent ? <code>{SVGContent}</code> : <span>No SVG loaded</span>}</Wrapper>
}
