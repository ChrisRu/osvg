import styled from 'styled-components/macro'
import { IFileDetails, createOpenFile, onDemo, loadSVGWith } from '../../services/fileService'
import { UploadCloadIcon } from './Icons'

const Wrapper = styled.div<{ dragging: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 300px;
  width: 550px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transform: scale(${(p) => (p.dragging ? 1.1 : 1)});
  transition: transform 0.1s;

  @media (max-width: 700px) {
    min-height: calc(3 * 60px);
    min-width: calc(5.5 * 60px);
    width: 80vw;
    height: calc((3 / 5.5) * 80vw);
  }
`

const UploadRow = styled.div<{ reverse?: boolean }>`
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${(p) => (p.reverse ? 'flex-end' : 'flex-start')};

  svg {
    opacity: 0.7;
    width: 1.4rem;
    height: 1.4rem;
  }
`

const UploadText = styled.div`
  text-align: center;

  h1 {
    margin: 0;
    font-size: 1.4rem;
  }

  p {
    margin: 0;
    margin-top: 0.2rem;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
  }
`

const BrowseButton = styled.span.attrs({ role: 'button', tabIndex: 0 })`
  text-decoration: underline;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #fff;
  }
`

const DemoButton = styled.span.attrs({ role: 'button', tabIndex: 0 })`
  opacity: 0.7;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover,
  &:focus {
    text-decoration: underline;
    opacity: 1;
  }
`

interface IProps {
  dragging: boolean
  title?: string
  onLoadSVG: (file?: IFileDetails) => void
}

const demoLocation = '/dog.svg'

export function DragAndDrop({ onLoadSVG, dragging, title = 'Drag & Drop' }: IProps) {
  return (
    <Wrapper dragging={dragging}>
      <UploadRow>
        <UploadCloadIcon />
      </UploadRow>
      <UploadText>
        <h1>{title}</h1>
        <p>
          or{' '}
          <BrowseButton
            title="Open a file from your filesystem"
            onClick={loadSVGWith(onLoadSVG, createOpenFile)}
          >
            browse
          </BrowseButton>
        </p>
      </UploadText>
      <UploadRow reverse>
        <DemoButton
          title="Open a random SVG to try out this app"
          onClick={loadSVGWith(onLoadSVG, () => onDemo(demoLocation))}
        >
          demo
        </DemoButton>
      </UploadRow>
    </Wrapper>
  )
}
