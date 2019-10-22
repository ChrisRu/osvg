import React, { useState, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { SVGOTextLogo } from './elements/SVGOTextLogo'
import { useSingleTime } from '../hooks/useSingleTime'
import { ErrorModal } from './elements/ErrorModal'
import { DragAndDrop } from './elements/DragAndDrop'
import {
  IFileDetails,
  onDragOver,
  onPaste,
  loadSVGWith,
  onDrop,
  createOpenFile,
} from '../services/fileService'
import { ChevronDownIcon, LoadingIcon } from './elements/Icons'
import { sleep } from '../util/sleep'
import { getSVGTitle } from '../services/svgService'

const HomeWrapper = styled.div<{ fade: boolean }>`
  color: #fff;
  opacity: ${p => (p.fade ? 0 : 1)};
  transition: opacity 0.4s;
`

const TopPageWrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
`

const BottomPageArrow = styled.div`
  justify-content: center;
  display: flex;
  padding-bottom: 1rem;

  svg {
    opacity: 0.7;
    z-index: 3;
    width: 2rem;
    height: 2rem;
  }
`

const BottomPageWrapper = styled.div`
  padding: 2rem;
  z-index: 2;
  margin-left: 20%;
  font-size: 1.4rem;

  div {
    max-width: 750px;
    margin: 0 auto;
  }

  h2 {
    margin-bottom: 1rem;
  }

  a {
    color: rgba(255, 255, 255, 0.7);

    &:hover {
      color: #fff;
    }
  }

  footer {
    margin-top: 5rem;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7) !important;
    text-align: right;
  }
`

const Tip = styled.div`
  position: absolute;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  font-size: 1.2rem;

  &:before {
    content: 'TIP: ';
    color: rgba(255, 255, 255, 0.7);
    font-weight: bold;
  }
`

const WaveSVG = styled.svg`
  opacity: 0.05;
  color: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60%;
  pointer-events: none;
`

const Title = styled.h1`
  max-width: 20rem;
  margin-left: 5rem;
  font-weight: normal;

  svg {
    width: 14rem;
  }

  p {
    opacity: 0.7;
    margin: 0;
    margin-top: -0.2rem;
    font-size: 1.8rem;
  }
`

const ContentWrapper = styled.div`
  justify-self: flex-start;
  margin-left: 15vw;
  padding-bottom: 5%;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const GradientAnimation = keyframes`
0% {
  width: 20%;
}

70% {
  width: 100%;
  opacity: 1;
}

100% {
  width: 100%;
  opacity: 0;
}
`

const Gradient = styled.div<{ fullWidth: boolean }>`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 20%;
  height: 100%;
  background: linear-gradient(120deg, #d55be4, #61379f);
  animation-name: ${p => (p.fullWidth ? GradientAnimation : undefined)};
  animation-duration: 700ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
`

const Loading = styled.div<{ show: boolean; transition: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s;
  transition-delay: 1s;
  display: ${p => (p.transition ? 'flex' : 'none')};
  opacity: ${p => (p.show ? 1 : 0)};
  pointer-events: none;

  svg {
    color: #fff;
    width: 80px;
    height: 80px;
  }
`

interface IProps {
  onPreloadSVG: (file: IFileDetails | undefined) => Promise<string>
  onLoadSVG: (initialSVG: string, optimizedSVG: string, fileName?: string) => void
}

export function HomeScreen({ onPreloadSVG, onLoadSVG }: IProps) {
  // Dragging is a number, because drag leave events are triggered
  // when hovering over a transitioning element.
  const [dragging, setDragging] = useState(0)
  const [loadingError, setLoadingError] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const [tipShown, hideTip] = useSingleTime('tip:drag-drop')

  const loadSVGWithAnimation = useCallback(
    async (file: IFileDetails | undefined) => {
      if (!file || loading) {
        return
      }

      try {
        setLoading(true)

        const [result] = await Promise.all([onPreloadSVG(file), sleep(700)])

        const fileName = file.name || getSVGTitle(file.contents)
        onLoadSVG(file.contents, result, fileName)
      } catch (error) {
        setLoadingError(error)
      }
    },
    [onPreloadSVG, onLoadSVG, loading],
  )

  useEffect(() => {
    async function keydown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 'o') {
        event.preventDefault()
        loadSVGWith(loadSVGWithAnimation, createOpenFile)
      }
    }

    window.addEventListener('keydown', keydown)

    return function() {
      window.removeEventListener('keydown', keydown)
    }
  }, [loadSVGWithAnimation])

  return (
    <>
      <Gradient fullWidth={loading} />
      <Loading show={loading} transition={!loadingError}>
        <LoadingIcon />
      </Loading>
      {loadingError ? (
        <ErrorModal
          title="oops!"
          onClose={() => {
            setLoadingError(undefined)
            setLoading(false)
          }}
        >
          Could not load the file. Please check if the file you uploaded is an SVG and whether
          it&apos;s valid by W3 standards.
        </ErrorModal>
      ) : null}
      <HomeWrapper
        fade={loading}
        onDragOver={onDragOver}
        onDragEnter={() => setDragging(d => d + 1)}
        onDragLeave={() => setDragging(d => d - 1)}
        onPaste={loadSVGWith(loadSVGWithAnimation, onPaste)}
        onDrop={loadSVGWith(loadSVGWithAnimation, onDrop)}
      >
        <TopPageWrapper>
          {tipShown ? null : (
            <Tip onClick={hideTip}>
              You can also paste the content of your SVG right in this page.
            </Tip>
          )}
          <ContentWrapper>
            <DragAndDrop dragging={dragging > 0} onLoadSVG={loadSVGWithAnimation} />
            <Title>
              <SVGOTextLogo />
              <p>optimize SVGs right in your web browser.</p>
            </Title>
          </ContentWrapper>
          <BottomPageArrow>
            <ChevronDownIcon />
          </BottomPageArrow>
        </TopPageWrapper>
        <BottomPageWrapper>
          <div>
            <h2>About</h2>
            <p>
              This web app uses (a slightly modified version) of the CLI tool{' '}
              <a href="https://github.com/svg/svgo" rel="noopener noreferrer">
                SVGO
              </a>{' '}
              to optimize SVGs. It processes the images on your own computer without hitting any
              servers. You don&apos;t have to be connected to the internet at all!
            </p>
            <p>
              If there are any issues with this app or you would like to request new features, feel
              free to contribute on{' '}
              <a href="https://github.com/ChrisRu/osvg" rel="noopener noreferrer">
                GitHub
              </a>
              .
            </p>
          </div>
          <footer>
            Created by{' '}
            <a href="https://ruigrok.info" rel="noopener noreferrer">
              Christian Ruigrok
            </a>
          </footer>
        </BottomPageWrapper>
      </HomeWrapper>
      <WaveSVG viewBox="0 0 797 379" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M462 169C332 185 58 242 0 379H797V0C726 99 592 153 462 169Z" fill="currentColor" />
      </WaveSVG>
    </>
  )
}
