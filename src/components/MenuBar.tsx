import React, { useRef } from 'react'
import styled from 'styled-components'
import { UploadIcon } from './Icons'
import { openFile, IFileDetails } from '../services/openFile'

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
`
const ViewButton = styled.button<{ active: boolean }>`
  padding: calc(0.7rem + 3px) 1.5rem 0.7rem;
  background: transparent;
  border: 0;
  color: #fff;
  box-sizing: border-box;
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

const OpenFileLabel = styled.label.attrs({ role: 'button', tabIndex: 0 })`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.15);
  transition: background-color 0.1s;
  outline: none;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    margin-right: 0.5rem;
    width: 1.2rem;
  }

  input {
    display: none;
  }
`

interface IProps {
  view: string
  error?: Error
  onChangeView: (view: 'svg' | 'code') => void
  before?: IFileDetails
  after?: string
  onLoadSVG: (svg: IFileDetails) => void
}

export function MenuBar({ view, error, before, after, onLoadSVG, onChangeView }: IProps) {
  const checkboxRef = useRef<HTMLInputElement>(null)

  const percentage =
    before && after
      ? Math.round(((before.contents.length - after.length) / before.contents.length) * 10000) / 100
      : undefined

  const improvement = percentage !== undefined && percentage > 0

  async function onOpenFile(event: React.ChangeEvent<HTMLInputElement>) {
    onLoadSVG(await openFile(event))
  }

  return (
    <MenuBarWrapper>
      <Title>SVGO Online</Title>
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
      <OpenFileLabel>
        <UploadIcon />
        <span>Open file</span>
        <input type="file" id="upload-file" onChange={onOpenFile} ref={checkboxRef} />
      </OpenFileLabel>
    </MenuBarWrapper>
  )
}
