import { useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import { getFileSizeGZIP, getFileSize } from '../services/fileSizeService'
import { getHumanReadableBytes } from '../services/byteService'
import { CloseIcon } from './elements/Icons'
import { Logo } from './elements/Logo'
import { FileSizePopup as FileSizePopupFunction } from './elements/FileSizePopup'

const FileSizePopup = styled(FileSizePopupFunction)`
  z-index: 1;
  display: none;
  margin-top: 2rem;
`

const MenubarWrapper = styled.nav`
  background: #181818;
  color: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 1.1rem;
`

const Title = styled.span`
  display: flex;
  padding: 0.42rem 1.5rem;
  cursor: pointer;
  align-items: center;

  > svg {
    width: 2.2rem;
    height: 2.2rem;
    transition: transform 0.2s;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);

    svg {
      transform: rotate(180deg);
    }
  }
`

const CloseButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.2rem;
  border: 0;
  opacity: 0.7;
  color: #fff;
  background: transparent;
  transition: opacity 0.1s, background 0.1s;

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
  transition: background 0.1s;
  border-width: 3px;
  border-bottom-style: solid;
  border-color: ${(p) => (p.active ? '#fff' : 'transparent')};

  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus,
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const FileInfo = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin-left: auto;
  width: calc(100% - 480px);
  justify-content: center;
  align-items: center;
`

const FileNameInputSizeCalculator = styled.pre`
  margin: 0;
  padding: 0.4rem;
  font-weight: bold;
  border: 0;
  font-family: inherit;
  visibility: hidden;
  position: absolute;
`

const FileNameInput = styled.input<{ width?: number }>`
  font-weight: bold;
  margin-right: 0.5rem;
  padding: 0.4rem;
  background: transparent;
  color: #fff;
  border: 0;
  text-align: center;
  width: ${(p) => (p.width ? p.width + 'px' : 'max-content')};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
  }
`

const FileDetails = styled.span`
  white-space: nowrap;
  position: relative;

  &:hover {
    ${FileSizePopup} {
      display: table;
    }
  }
`

const FileSize = styled.span`
  opacity: 0.7;
`

const Percentage = styled.span<{ improvement: boolean }>`
  margin-left: 0.5rem;
  color: ${(p) => (p.improvement ? '#63e163' : '#ff7171')};
`

function getDifferencePercentage(initialSize: number, optimizedSize: number | undefined) {
  if (!optimizedSize) {
    return undefined
  }

  return Math.round(((initialSize - optimizedSize) / initialSize) * 10000) / 100
}

interface IProps {
  view: string
  loading: boolean
  error?: Error
  fileName?: string
  initialSVG: string
  optimizedSVG?: string
  onChangeView: (view: 'svg' | 'code') => void
  onClose: () => void
  onUpdateFileName: (fileName: string) => void
  onRewriteFileName: () => void
}

export function Menubar({
  view,
  loading,
  error,
  fileName,
  initialSVG,
  optimizedSVG,
  onUpdateFileName,
  onRewriteFileName,
  onChangeView,
  onClose,
}: IProps) {
  const inputCalculatorRef = useRef<HTMLInputElement>(null)
  const [inputElementWidth, setInputElementWidth] = useState<number>()

  useEffect(() => {
    setInputElementWidth(inputCalculatorRef.current?.offsetWidth)
  }, [inputCalculatorRef, fileName])

  const [diskInitialSize, gzipInitialSize] = useMemo(
    () => [getFileSize(initialSVG), getFileSizeGZIP(initialSVG)],
    [initialSVG],
  )
  const [diskOptimizedSize, gzipOptimizedSize] = useMemo(
    () =>
      optimizedSVG
        ? [getFileSize(optimizedSVG), getFileSizeGZIP(optimizedSVG)]
        : [undefined, undefined],
    [optimizedSVG],
  )

  const gzipDifferencePercentage = getDifferencePercentage(gzipInitialSize, gzipOptimizedSize)
  const fileSizeImprovement =
    gzipDifferencePercentage !== undefined && gzipDifferencePercentage >= 0

  return (
    <MenubarWrapper>
      <Title title="Close the SVG and go to the home screen" onClick={onClose}>
        <Logo />
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
          <FileNameInputSizeCalculator ref={inputCalculatorRef}>
            {fileName}
          </FileNameInputSizeCalculator>
          <FileNameInput
            title="Change the filename"
            type="text"
            defaultValue={fileName}
            width={inputElementWidth}
            onChange={(event) => onUpdateFileName(event.target.value)}
            onBlur={onRewriteFileName}
            onKeyDown={(event) => {
              if (event.key === 'Escape' || event.key === 'Enter') {
                const target = event.target as HTMLInputElement
                target.blur()
              }
            }}
          />
          {!loading ? (
            <FileDetails>
              <FileSizePopup
                gzipInitialSize={gzipInitialSize}
                gzipOptimizedSize={gzipOptimizedSize}
                diskInitialSize={diskInitialSize}
                diskOptimizedSize={diskOptimizedSize}
              />
              {gzipOptimizedSize ? (
                <FileSize>{getHumanReadableBytes(gzipOptimizedSize)}</FileSize>
              ) : null}
              {gzipDifferencePercentage === undefined ? null : (
                <Percentage improvement={fileSizeImprovement}>
                  {fileSizeImprovement ? '-' : '+'}
                  {gzipDifferencePercentage.toString().replace('-', '')}%
                </Percentage>
              )}
            </FileDetails>
          ) : null}
        </FileInfo>
      )}
      <CloseButton title="Close the currently open SVG" onClick={onClose}>
        <CloseIcon />
      </CloseButton>
    </MenubarWrapper>
  )
}
