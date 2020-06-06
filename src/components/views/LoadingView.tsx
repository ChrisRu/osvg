import React from 'react'
import styled from 'styled-components/macro'
import { ViewOverlay } from './ViewOverlay'
import { LoadingIcon } from '../elements/Icons'

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundTertiary};
  color: ${(props) => props.theme.text}30;

  > svg {
    width: 3rem;
  }
`

export function LoadingView() {
  return (
    <Wrapper>
      <ViewOverlay />
      <LoadingIcon />
    </Wrapper>
  )
}
