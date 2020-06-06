import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components/macro'
import { SVGOTextLogo } from './elements/SVGOTextLogo'
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
import { LoadingIcon } from './elements/Icons'
import { getSVGTitle } from '../services/svgService'
import { getRandomTip } from '../util/tips'

const HomeWrapper = styled.div<{ fade: boolean }>`
  position: relative;
  margin-left: 420px;
  color: #fff;
  opacity: ${(p) => (p.fade ? 0 : 1)};
  transition: opacity 0.4s;

  @media (max-width: 1200px) {
    margin-left: 180px;
  }

  @media (max-width: 900px) {
    margin-left: 40px;
  }
`

const TopFoldWrapper = styled.div`
  padding: 20vh 0 10vh;
  margin-left: -120px;
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  @media (max-width: 900px) {
    flex-flow: column-reverse;
    align-items: center;
    margin-left: 0;
  }
`

const Link = styled.a`
  color: #fff;

  &:hover {
    color: #ffffffbb;
  }
`

const AboutWrapper = styled.div`
  padding: 0 4rem;
  font-size: 1.4rem;
  max-width: 750px;
  color: #ffffffbb;
`

const Footer = styled.footer`
  font-size: 1.2rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
`

const LoadingWrapper = styled.div<{ show: boolean; transition: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s;
  transition-delay: 0.5s;
  display: ${(p) => (p.transition ? 'flex' : 'none')};
  opacity: ${(p) => (p.show ? 1 : 0)};
  pointer-events: none;

  svg {
    color: #fff;
    width: 80px;
    height: 80px;
  }
`

const Tip = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin-left: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  font-size: 1.2rem;

  &:before {
    content: 'TIP: ';
    color: rgba(255, 255, 255, 0.7);
    font-weight: bold;
  }
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

  @media (max-width: 700px) {
    svg {
      width: 12rem;
    }

    p {
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }
  }
`

const GradientBackground = styled.div<{ fade: boolean }>`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 420px;
  height: 100%;
  background: linear-gradient(120deg, #d55be4, #61379f);
  transform: translateX(${(p) => (p.fade ? '-100%' : '0')});
  transition: transform 500ms;

  @media (max-width: 1200px) {
    width: 180px;
  }

  @media (max-width: 900px) {
    width: 40px;
  }
`

const WaveSVGBackground = styled.svg<{ fade?: boolean }>`
  opacity: 0.05;
  color: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60%;
  pointer-events: none;
  transform: translateX(${(p) => (p.fade ? '100%' : '0')});
  transition: transform 500ms;
`

interface IProps {
  onPreloadSVG: (file?: IFileDetails) => Promise<string>
  onLoadSVG: (initialSVG: string, optimizedSVG: string, fileName?: string) => void
}

export function HomeScreen({ onPreloadSVG, onLoadSVG }: IProps) {
  // Dragging is a number, because drag leave events are triggered
  // when hovering over a transitioning element.
  const [dragging, setDragging] = useState(0)
  const [loadingError, setLoadingError] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const tip = useMemo(() => getRandomTip(), [])

  const loadSVGWithAnimation = useCallback(
    async (file?: IFileDetails) => {
      if (!file || loading) {
        return
      }

      try {
        setLoading(true)

        const result = await onPreloadSVG(file)

        const fileName = file.name || getSVGTitle(file.contents)
        onLoadSVG(file.contents, result, fileName)
      } catch (error) {
        console.error('Could not load file', error)
        setLoadingError(error)
      }
    },
    [onPreloadSVG, onLoadSVG, loading],
  )

  useEffect(() => {
    async function keydown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 'o') {
        event.preventDefault()
        loadSVGWith(loadSVGWithAnimation, createOpenFile)(undefined)
      }
    }

    window.addEventListener('keydown', keydown)

    return function () {
      window.removeEventListener('keydown', keydown)
    }
  }, [loadSVGWithAnimation])

  return (
    <>
      <GradientBackground fade={loading} />
      <LoadingWrapper show={loading} transition={!loadingError}>
        <LoadingIcon />
      </LoadingWrapper>
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
        onDragEnter={() => setDragging((d) => d + 1)}
        onDragLeave={() => setDragging((d) => d - 1)}
        onPaste={loadSVGWith(loadSVGWithAnimation, onPaste)}
        onDrop={loadSVGWith(loadSVGWithAnimation, onDrop)}
      >
        <Tip>{tip}</Tip>
        <TopFoldWrapper>
          <DragAndDrop dragging={dragging > 0} onLoadSVG={loadSVGWithAnimation} />
          <Title>
            <SVGOTextLogo />
            <p>optimize SVGs right in your web browser.</p>
          </Title>
        </TopFoldWrapper>
        <AboutWrapper>
          <p>
            This web app uses (a slightly modified version) of the CLI tool{' '}
            <Link href="https://github.com/svg/svgo" rel="noopener noreferrer">
              SVGO
            </Link>{' '}
            to optimize SVGs. It processes the images on your own computer without hitting any
            servers. You don&apos;t have to be connected to the internet at all!
          </p>
          <p>
            If there are any issues with this app or you would like to request new features, feel
            free to contribute on{' '}
            <Link href="https://github.com/ChrisRu/osvg" rel="noopener noreferrer">
              GitHub
            </Link>
            .
          </p>
          <Footer>
            Created by{' '}
            <Link href="https://ruigrok.info" rel="noopener noreferrer">
              Christian Ruigrok
            </Link>
          </Footer>
        </AboutWrapper>
      </HomeWrapper>
      <WaveSVGBackground
        fade={loading}
        viewBox="0 0 797 379"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M462 169C332 185 58 242 0 379H797V0C726 99 592 153 462 169Z" fill="currentColor" />
      </WaveSVGBackground>
    </>
  )
}
