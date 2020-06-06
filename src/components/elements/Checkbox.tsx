import React from 'react'
import styled from 'styled-components/macro'
import { CheckMarkIcon } from './Icons'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? 'hsl(252, 62%, 66%)' : '#fff')};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px hsl(252, 20%, 42%);
  }

  svg {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`

interface IProps {
  checked?: boolean
  onChange(value: boolean): void
}

export function Checkbox({ checked = false, onChange }: IProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={() => onChange(!checked)} />
      <StyledCheckbox checked={checked}>
        <CheckMarkIcon />
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
