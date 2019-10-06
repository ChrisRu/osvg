import React from 'react'
import styled from 'styled-components'
import { saveSvg } from '../services/saveSvg'
import { IFileDetails } from '../services/openFile'
import { DownloadIcon } from './Icons'

const Wrapper = styled.div`
  position: absolute;
  padding: 1rem;
  bottom: 0;
  right: 0;
`

const DownloadButton = styled.button`
  background: #3a3a3a;
  padding: 0.5rem 1rem;
  color: #fff;
  border: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  outline: none;

  svg {
    margin-right: 0.5rem;
    width: 1.2rem;
  }

  span {
    font-size: 1.1rem;
  }

  &:focus {
    background-color: #464646;
  }

  &:hover {
    background-color: #464646;
  }
`

interface IProps {
  before?: IFileDetails
  after?: string
}

export function Overlay({ before, after }: IProps) {
  return (
    <Wrapper>
      {before && after ? (
        <DownloadButton onClick={() => saveSvg(after, before.name)}>
          <DownloadIcon />
          <span>Download</span>
        </DownloadButton>
      ) : null}
    </Wrapper>
  )
}
