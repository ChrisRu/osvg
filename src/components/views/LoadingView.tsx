import styled from 'styled-components/macro'
import { LoadingIcon } from '../elements/Icons'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  color: ${(props) => props.theme.text}30;
  z-index: 1;

  > svg {
    width: 3rem;
  }
`

export function LoadingView() {
  return (
    <Wrapper>
      <LoadingIcon />
    </Wrapper>
  )
}
