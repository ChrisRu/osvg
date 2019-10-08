import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { UploadIcon, ClipboardIcon, PawIcon, WarningIcon } from './elements/Icons'
import { openFile, IFileDetails } from '../services/openFile'
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
  onLoadSVG: (content: IFileDetails) => void
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
      onLoadSVG(await openFile(event.target.files))
    }
  }

  async function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      hideTip()
      onLoadSVG(await openFile(event.dataTransfer.files))
    }
  }

  async function onPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()

    if (event.clipboardData.files && event.clipboardData.files[0]) {
      onLoadSVG(await openFile(event.clipboardData.files))
    } else {
      const text = event.clipboardData.getData('text')
      if (text) {
        onLoadSVG({ contents: text, name: 'file.svg' })
      }
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onLoadSVG({ contents: (event.target as any).value, name: 'file.svg' })
    }
  }

  async function onDemo() {
    const response = await fetch('/dog.svg')
    const contents = await response.text()

    onLoadSVG({ contents, name: 'doggo.svg' })
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
          <svg
            width="1656"
            height="504"
            viewBox="0 0 1656 504"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M211.7 504C167.367 504 129.333 497.467 97.6 484.4C65.8667 471.333 41.8333 454.3 25.5 433.3C9.63334 411.833 1.23333 388.5 0.300001 363.3C0.300001 359.567 1.7 356.3 4.5 353.5C7.76667 350.233 11.5 348.6 15.7 348.6H103.9C109.5 348.6 113.933 349.767 117.2 352.1C120.933 353.967 124.667 357 128.4 361.2C134.467 373.333 144.267 383.367 157.8 391.3C171.333 399.233 189.3 403.2 211.7 403.2C238.3 403.2 258.6 399 272.6 390.6C286.6 382.2 293.6 370.767 293.6 356.3C293.6 346.033 289.867 337.633 282.4 331.1C275.4 324.567 264.2 318.733 248.8 313.6C233.4 308.467 210.533 302.633 180.2 296.1C124.2 284.433 82.2 267.4 54.2 245C26.6667 222.133 12.9 189.7 12.9 147.7C12.9 119.233 20.8333 93.8 36.7 71.4C52.5667 49 75.2 31.5 104.6 18.9C134 6.29998 168.3 -2.67029e-05 207.5 -2.67029e-05C248.1 -2.67029e-05 283.333 6.99998 313.2 21C343.067 35 365.7 52.7333 381.1 74.2C396.967 95.2 405.367 115.967 406.3 136.5C406.3 140.7 404.9 144.2 402.1 147C399.3 149.8 395.8 151.2 391.6 151.2H299.2C293.6 151.2 288.933 150.267 285.2 148.4C281.933 146.533 278.9 143.5 276.1 139.3C273.3 128.567 265.6 119.467 253 112C240.867 104.533 225.7 100.8 207.5 100.8C186.5 100.8 170.4 104.533 159.2 112C148 119.467 142.4 130.433 142.4 144.9C142.4 154.7 145.433 162.867 151.5 169.4C158.033 175.933 168.3 182 182.3 187.6C196.767 192.733 217.3 198.1 243.9 203.7C287.3 211.633 321.833 221.667 347.5 233.8C373.633 245.467 392.767 260.867 404.9 280C417.033 298.667 423.1 322.233 423.1 350.7C423.1 381.967 414 409.267 395.8 432.6C378.067 455.467 353.1 473.2 320.9 485.8C289.167 497.933 252.767 504 211.7 504ZM616.07 497C601.137 497 591.57 490 587.37 476L444.57 28L443.17 21.7C443.17 17.9666 444.57 14.7 447.37 11.9C450.637 8.63331 454.37 6.99997 458.57 6.99997H545.37C551.904 6.99997 557.27 8.86664 561.47 12.6C566.137 16.3333 569.17 20.5333 570.57 25.2L669.97 348.6L768.67 25.2C770.07 20.5333 772.87 16.3333 777.07 12.6C781.737 8.86664 787.337 6.99997 793.87 6.99997H881.37C885.104 6.99997 888.37 8.63331 891.17 11.9C894.437 14.7 896.07 17.9666 896.07 21.7L894.67 28L751.87 476C747.67 490 738.104 497 723.17 497H616.07ZM1148 504C1080.8 504 1028.3 487.667 990.499 455C952.699 421.867 932.633 374.967 930.299 314.3C929.833 300.767 929.599 279.3 929.599 249.9C929.599 220.5 929.833 199.033 930.299 185.5C932.633 126.233 952.933 80.5 991.199 48.3C1029.93 16.1 1082.2 -2.67029e-05 1148 -2.67029e-05C1192.33 -2.67029e-05 1230.83 7.23331 1263.5 21.7C1296.63 36.1667 1321.83 54.6 1339.1 77C1356.83 99.4 1366.17 122.5 1367.1 146.3C1367.1 150.5 1365.47 154 1362.2 156.8C1359.4 159.6 1355.9 161 1351.7 161H1249.5C1244.83 161 1241.1 160.3 1238.3 158.9C1235.5 157.5 1233.17 154.933 1231.3 151.2C1225.23 137.667 1215.67 126 1202.6 116.2C1189.53 105.933 1171.33 100.8 1148 100.8C1092.47 100.8 1063.3 130.2 1060.5 189C1060.03 202.067 1059.8 222.367 1059.8 249.9C1059.8 276.967 1060.03 297.267 1060.5 310.8C1063.3 372.4 1093.17 403.2 1150.1 403.2C1177.63 403.2 1199.57 396.2 1215.9 382.2C1232.7 367.733 1241.1 345.8 1241.1 316.4V303.1H1175.3C1170.17 303.1 1165.97 301.467 1162.7 298.2C1159.43 294.467 1157.8 290.033 1157.8 284.9V233.1C1157.8 227.967 1159.43 223.767 1162.7 220.5C1165.97 216.767 1170.17 214.9 1175.3 214.9H1351.7C1356.83 214.9 1361.03 216.767 1364.3 220.5C1367.57 223.767 1369.2 227.967 1369.2 233.1V312.9C1369.2 352.567 1360.1 386.867 1341.9 415.8C1323.7 444.267 1297.8 466.2 1264.2 481.6C1231.07 496.533 1192.33 504 1148 504ZM1649.71 504C1583.91 504 1532.11 487.9 1494.31 455.7C1456.51 423.5 1436.44 376.133 1434.11 313.6C1433.64 300.067 1433.41 280 1433.41 253.4C1433.41 226.333 1433.64 206.033 1434.11 192.5C1436.44 130.9 1456.74 83.5333 1495.01 50.4C1533.74 16.8 1585.31 -2.67029e-05 1649.71 -2.67029e-05C1714.11 -2.67029e-05 1765.67 16.8 1804.41 50.4C1843.14 83.5333 1863.44 130.9 1865.31 192.5C1866.24 219.567 1866.71 239.867 1866.71 253.4C1866.71 266.467 1866.24 286.533 1865.31 313.6C1862.97 376.133 1842.91 423.5 1805.11 455.7C1767.31 487.9 1715.51 504 1649.71 504ZM1649.71 403.2C1675.37 403.2 1695.67 395.5 1710.61 380.1C1726.01 364.7 1734.17 341.133 1735.11 309.4C1736.04 282.333 1736.51 263.2 1736.51 252C1736.51 239.867 1736.04 220.733 1735.11 194.6C1734.17 162.867 1726.01 139.3 1710.61 123.9C1695.21 108.5 1674.91 100.8 1649.71 100.8C1624.51 100.8 1604.21 108.5 1588.81 123.9C1573.87 139.3 1565.71 162.867 1564.31 194.6C1563.84 207.667 1563.61 226.8 1563.61 252C1563.61 276.733 1563.84 295.867 1564.31 309.4C1565.71 341.133 1573.87 364.7 1588.81 380.1C1603.74 395.5 1624.04 403.2 1649.71 403.2Z"
              fill="#242424"
            />
          </svg>
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
            <h1>SVGO Online</h1>
            <p>Optimize your SVGs right in your browser</p>
          </Title>
          <Upload>
            <OpenFileLabel as="label">
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
              <MarkupInput placeholder="Paste markup" onPaste={onPaste} onKeyDown={onKeyDown} />
            </MarkupInputWrapper>
            <OpenFileButton onClick={onDemo}>
              <PawIcon />
              <span>Demo</span>
            </OpenFileButton>
          </Upload>
        </ContentWrapper>
      </Wrapper>
    </MegaWrapper>
  )
}
