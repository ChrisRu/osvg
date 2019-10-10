import React, { useState } from 'react'
import styled from 'styled-components'
import { getFileSizeGZIP, getFileSize } from '../services/fileSizeService'
import { getHumanReadableBytes } from '../services/byteService'
import { CloseIcon } from './elements/Icons'

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
  font-size: 1.4rem;
  margin-right: 2rem;
  margin-left: 2rem;
  opacity: 0.8;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: #ccc;
  }
`

const CloseButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.2rem;
  border: 0;
  opacity: 0.7;
  color: #fff;
  background: transparent;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    vertical-align: middle;
  }
`

const MenuButton = styled.button<{ active: boolean }>`
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
  align-items: center;
`

const FileNameInput = styled.input`
  font-weight: bold;
  margin-right: 0.5rem;
  padding: 0.4rem;
  background: transparent;
  color: #fff;
  text-align: center;
  border: 0;
  width: max-content;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
  }
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

function getSize(contents: string, gzip: boolean) {
  return gzip ? getFileSizeGZIP(contents) : getFileSize(contents)
}

function getPercentage(initialSize: number, newSize: number) {
  return Math.round(((initialSize - newSize) / initialSize) * 10000) / 100
}

interface IProps {
  view: string
  error?: Error
  fileName: string
  initialFile: string
  compressedFile?: string
  onChangeView: (view: 'svg' | 'code') => void
  onClose: () => void
  onUpdateFileName: (fileName: string) => void
  onRewriteFileName: () => void
}

export function MenuBar({
  view,
  error,
  fileName,
  initialFile,
  compressedFile,
  onUpdateFileName,
  onRewriteFileName,
  onChangeView,
  onClose,
}: IProps) {
  const [gzip] = useState(true)

  const initialSize = getSize(initialFile, gzip)
  const compressedSize = getSize(compressedFile || initialFile, gzip)

  const percentage = getPercentage(initialSize, compressedSize)
  const improvement = compressedFile !== undefined && percentage >= 0

  return (
    <MenuBarWrapper>
      <Title title="Close the SVG and go to the home screen" onClick={onClose}>
        iSVG
      </Title>
      <MenuButton
        title="View SVG Image"
        onClick={() => onChangeView('svg')}
        active={view === 'svg'}
      >
        Image
      </MenuButton>
      <MenuButton
        title="View SVG Code"
        onClick={() => onChangeView('code')}
        active={view === 'code'}
      >
        Code
      </MenuButton>
      {error ? (
        <FileInfo />
      ) : (
        <FileInfo>
          <FileNameInput
            title="Change the filename"
            type="text"
            value={fileName}
            onChange={event => onUpdateFileName(event.target.value)}
            onBlur={onRewriteFileName}
            onKeyDown={event => {
              if (event.key === 'Escape' || event.key === 'Enter') {
                ;(event.target as HTMLInputElement).blur()
              }
            }}
          />
          <FileDetails title={gzip ? 'gzipped size' : 'stored size'}>
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
      <CloseButton title="Close the currently open SVG" onClick={onClose}>
        <CloseIcon />
      </CloseButton>
    </MenuBarWrapper>
  )
}
