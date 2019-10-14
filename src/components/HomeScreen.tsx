import React, { useState } from 'react'
import styled from 'styled-components'
import { SVGOTextLogo } from './elements/SVGOTextLogo'
import { openFile } from '../services/fileService'
import { useSingleTime } from '../hooks/useSingleTime'
import { ErrorModal } from './elements/ErrorModal'

const Wrapper = styled.div<{ dragging?: boolean }>`
  position: relative;
  background: #212123;
  color: #fff;
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  transform: scale(${p => (p.dragging ? 0.9 : 1)});
  transition: transform 0.4s;
`

const Tip = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #282828;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
`

const Title = styled.div``

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

const Gradient = styled.div`
  position: absolute;
  left: 0;
  width: 25%;
  height: 100%;
  background: linear-gradient(120deg, #d55be4, #61379f);
`

interface IProps {
  loadingError?: Error
  onLoadSVG: (content: string, fileName?: string) => void
  hideError: () => void
}

export function HomeScreen({ loadingError, onLoadSVG, hideError }: IProps) {
  // Dragging is a number, because drag leave events are triggered
  // when hovering over a transitioning element.
  const [dragging, setDragging] = useState(0)

  const [tipShown, hideTip] = useSingleTime('tip:drag-drop')

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
      event.preventDefault()
      onLoadSVG((event.target as HTMLInputElement).value)
    }
  }

  async function onDemo() {
    const response = await fetch('/dog.svg')
    const contents = await response.text()

    onLoadSVG(contents, 'doggo.svg')
  }

  return (
    <Wrapper dragging={dragging > 0}>
      <Gradient />
      {loadingError ? (
        <ErrorModal
          title="oops!"
          description="Could not load the file. Please check if the file you uploaded is an SVG and whether it's valid by W3 standards."
          onClose={hideError}
        />
      ) : null}
      {tipShown ? null : (
        <Tip onClick={hideTip}>
          <strong>TIP: </strong>
          <span>You can also drop your files in here right from your file explorer</span>
        </Tip>
      )}
      <Title>
        <SVGOTextLogo />
        <p>Optimize SVGs right in your web browser</p>
      </Title>
    </Wrapper>
  )
}
