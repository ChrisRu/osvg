import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { UploadIcon, ClipboardIcon, PawIcon, WarningIcon } from './elements/Icons'
import { SVGOTextLogo } from './elements/SVGOTextLogo'
import { openFile } from '../services/openFile'
import { useSingleTime } from '../hooks/useSingleTime'

const MegaWrapper = styled.div`
  flex: 1;
  display: flex;
  background: #111;
`

const Wrapper = styled.div<{ dragging?: boolean }>`
  position: relative;
  background: #181818;
  color: #fff;
  flex: 1;
  display: flex;
  justify-content: center;
  transform: scale(${p => (p.dragging ? 0.9 : 1)});
  transition: transform 0.4s;
`

const ContentWrapper = styled.div`
  max-width: 1400px;
  flex: 1;
  flex-basis: 1400px;
  padding: 20px;
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`

const BackgroundText = styled.div<{ shrink?: boolean }>`
  position: absolute;
  right: 0;
  top: 15vh;
  width: 80vw;
  pointer-events: none;
  transform-origin: center right;
  transition: transform 0.8s;
  transform: scale(${p => (p.shrink ? 0.9 : 1)});

  svg {
    width: 100%;
  }
`

const Title = styled.div`
  margin-top: 14rem;
  margin-bottom: 4rem;

  h1 {
    font-size: 5rem;
    margin: 0;
    margin-bottom: 0.75rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    opacity: 0.8;
  }

  @media (max-width: 1500px) {
    text-align: center;
  }
`

const OpenFileButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.6rem 1.2rem;
  margin: 0 0.5rem;
  background-color: #fff;
  color: #000;
  border: 0;
  transition: background-color 0.1s;
  outline: none;
  font-size: 1.2rem;

  &:hover,
  &:focus {
    background-color: #ccc;
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  svg {
    margin-right: 0.8rem;
    width: 1.6rem;
  }
`

const OpenFileLabel = styled(OpenFileButton).attrs({ role: 'button', tabIndex: 0 })`
  input {
    display: none;
  }
`

const MarkupInputWrapper = styled.div`
  position: relative;
  margin: 0 0.5rem;

  svg {
    color: #888;
    position: absolute;
    top: 0.6rem;
    left: 1.2rem;
    pointer-events: none;
  }
`

const MarkupInput = styled.input`
  padding: 0.6rem 1.2rem 0.6rem 3.8rem;
  font-size: 1.2rem;
  border: 0;
  line-height: initial;
`

const Upload = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  @media (max-width: 1500px) {
    justify-content: center;
  }
`

const Tip = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #282828;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
`

const Overlay = styled.div`
  z-index: 2;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 30rem;
  background: #222;
  color: #fff;

  p {
    font-size: 1.2rem;
    margin: 0;
    padding: 1rem;
  }
`

const ErrorTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: #282828;
  padding: 1rem;

  h1 {
    font-size: 1.8rem;
    margin: 0;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 1rem;
  }
`

interface IProps {
  loadingError?: Error
  onLoadSVG: (content: string, fileName?: string) => void
  hideError: () => void
}

export function UploadScreen({ loadingError, onLoadSVG, hideError }: IProps) {
  // Dragging is a number, because drag leave events are triggered
  // when hovering over a transitioning element.
  const [dragging, setDragging] = useState(0)
  const [tipShown, hideTip] = useSingleTime('tip:drag-drop')
  const inputFileRef = useRef<HTMLInputElement>(null)

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()

    event.dataTransfer.dropEffect = 'copy'
  }

  async function onOpenFile(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (event.target.files && event.target.files[0]) {
      const fileDetails = await openFile(event.target.files)
      onLoadSVG(fileDetails.contents, fileDetails.name)
    }
  }

  async function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const fileDetails = await openFile(event.dataTransfer.files)
      onLoadSVG(fileDetails.contents, fileDetails.name)
      hideTip()
    }
  }

  async function onPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()

    if (event.clipboardData.files && event.clipboardData.files[0]) {
      const fileDetails = await openFile(event.clipboardData.files)
      onLoadSVG(fileDetails.contents, fileDetails.name)
    } else {
      const text = event.clipboardData.getData('text')
      if (text) {
        onLoadSVG(text)
      }
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onLoadSVG((event.target as HTMLInputElement).value)
    }
  }

  async function onDemo() {
    const response = await fetch('/dog.svg')
    const contents = await response.text()

    onLoadSVG(contents, 'doggo.svg')
  }

  return (
    <MegaWrapper
      onDragEnter={() => setDragging(d => d + 1)}
      onDragLeave={() => setDragging(d => d - 1)}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onPaste={onPaste}
    >
      <Wrapper dragging={dragging > 0}>
        <BackgroundText shrink={dragging > 0}>
          <SVGOTextLogo />
        </BackgroundText>
        {loadingError ? (
          <Overlay onClick={hideError}>
            <ErrorMessage>
              <ErrorTitle>
                <WarningIcon />
                <h1>oops!</h1>
              </ErrorTitle>
              <p>
                Could not load the file. Please check if the file you uploaded is an SVG and whether
                it&apos;s valid by W3 standards.
              </p>
            </ErrorMessage>
          </Overlay>
        ) : null}
        <ContentWrapper>
          {tipShown ? null : (
            <Tip onClick={hideTip}>
              <strong>TIP: </strong>
              <span>You can also drop your files in here right from your file explorer</span>
            </Tip>
          )}
          <Title>
            <h1>iSVG</h1>
            <p>Optimize SVGs right in your web browser</p>
          </Title>
          <Upload>
            <OpenFileLabel title="Open an SVG from your filesystem" as="label">
              <UploadIcon />
              <span>Open file</span>
              <input
                type="file"
                id="upload-file"
                accept=".svg"
                onChange={onOpenFile}
                ref={inputFileRef}
              />
            </OpenFileLabel>
            <MarkupInputWrapper>
              <ClipboardIcon />
              <MarkupInput
                title="Paste your SVG's markup in here"
                placeholder="Paste markup"
                onPaste={onPaste}
                onKeyDown={onKeyDown}
              />
            </MarkupInputWrapper>
            <OpenFileButton title="Open an example file" onClick={onDemo}>
              <PawIcon />
              <span>Demo</span>
            </OpenFileButton>
          </Upload>
        </ContentWrapper>
      </Wrapper>
    </MegaWrapper>
  )
}
