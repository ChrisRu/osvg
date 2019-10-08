import React from 'react'
import styled from 'styled-components'
import { IFileDetails } from '../services/openFile'

const MenuBarWrapper = styled.nav`
  background: #181818;
  color: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 1.1rem;
`

const Title = styled.span`
  font-weight: bold;
  margin-right: 2rem;
  margin-left: 2rem;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`

const ViewButton = styled.button<{ active: boolean }>`
  padding: calc(0.7rem + 3px) 1.5rem 0.7rem;
  background: transparent;
  border: 0;
  color: #fff;
  padding-top: calc(0.7rem + 3px);

  border-width: 3px;
  border-bottom-style: solid;
  border-color: ${p => (p.active ? '#fff' : 'transparent')};

  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const FileDetails = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin-left: auto;
  margin-right: auto;
`

const FileName = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`

const Percentage = styled.span<{ improvement: boolean }>`
  position: absolute;
  left: 100%;
  color: ${p => (p.improvement ? '#63e163' : '#ff7171')};
`

interface IProps {
  view: string
  error?: Error
  before: IFileDetails
  after?: string
  onChangeView: (view: 'svg' | 'code') => void
  onClose: () => void
}

export function MenuBar({ view, error, before, after, onChangeView, onClose }: IProps) {
  const percentage = after
    ? Math.round(((before.contents.length - after.length) / before.contents.length) * 10000) / 100
    : undefined

  const improvement = percentage !== undefined && percentage >= 0

  return (
    <MenuBarWrapper>
      <Title onClick={onClose}>SVGO Online</Title>
      <ViewButton onClick={() => onChangeView('svg')} active={view === 'svg'}>
        Image
      </ViewButton>
      <ViewButton onClick={() => onChangeView('code')} active={view === 'code'}>
        Code
      </ViewButton>
      {error ? (
        <FileDetails />
      ) : (
        <FileDetails>
          <FileName>{before ? before.name : ''}</FileName>
          {percentage === undefined ? null : (
            <Percentage improvement={improvement}>
              {improvement ? '-' : '+'}
              {percentage.toString().replace('-', '')}%
            </Percentage>
          )}
        </FileDetails>
      )}
    </MenuBarWrapper>
  )
}
