import React, { useState } from 'react'
import styled from 'styled-components'
import { IFileDetails } from '../services/openFile'
import { getFileSizeGZIP, getFileSize } from '../services/gzip.worker'
import { getHumanReadableBytes } from '../services/byteService'

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

const FileInfo = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin-left: auto;
  width: calc(100% - 400px);
  justify-content: center;
`

const FileName = styled.span`
  font-weight: bold;
  margin-right: 1.5rem;
`

const FileDetails = styled.span`
  white-space: nowrap;
`

const FileSize = styled.span`
  opacity: 0.7;
`

const Percentage = styled.span<{ improvement: boolean }>`
  margin-left: 0.5rem;
  color: ${p => (p.improvement ? '#63e163' : '#ff7171')};
`

interface IProps {
  view: string
  error?: Error
  initialFile: IFileDetails
  compressedFile?: string
  onChangeView: (view: 'svg' | 'code') => void
  onClose: () => void
}

function getSize(contents: string, gzip: boolean) {
  return gzip ? getFileSizeGZIP(contents) : getFileSize(contents)
}

function getPercentage(initialSize: number, newSize: number) {
  return Math.round(((initialSize - newSize) / initialSize) * 10000) / 100
}

export function MenuBar({
  view,
  error,
  initialFile,
  compressedFile,
  onChangeView,
  onClose,
}: IProps) {
  const [gzip] = useState(true)

  const initialSize = getSize(initialFile.contents, gzip)
  const compressedSize = getSize(compressedFile || initialFile.contents, gzip)

  const percentage = getPercentage(initialSize, compressedSize)
  const improvement = compressedFile !== undefined && percentage >= 0

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
        <FileInfo />
      ) : (
        <FileInfo>
          <FileName>{initialFile.name}</FileName>
          <FileDetails>
            <FileSize>{getHumanReadableBytes(compressedSize)}</FileSize>
            {percentage === undefined ? null : (
              <Percentage improvement={improvement}>
                {improvement ? '-' : '+'}
                {percentage.toString().replace('-', '')}%
              </Percentage>
            )}
          </FileDetails>
        </FileInfo>
      )}
    </MenuBarWrapper>
  )
}
