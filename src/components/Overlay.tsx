import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  padding: 1rem;
  top: 0;
  right: 0;
`

const Percentage = styled.div<{ improvement: boolean }>`
  background: #fff;
  padding: 0.5rem;
  font-size: 1.2rem;
  color: ${p => (p.improvement ? 'green' : 'red')};
`

interface IProps {
  before?: string
  after?: string
}

export function Overlay({ before, after }: IProps) {
  const percentage =
    before && after
      ? Math.round(((before.length - after.length) / before.length) * 10000) / 100
      : undefined

  console.log(after ? after.substr(0, 200) : '')

  const improvement = percentage !== undefined && percentage > 0

  function saveSvg(name: string) {
    if (after === undefined) {
      return
    }

    const svgBlob = new Blob([after], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = svgUrl
    downloadLink.download = name
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <Wrapper>
      {percentage === undefined ? null : (
        <Percentage improvement={improvement}>
          {improvement ? '-' : '+'}
          {percentage.toString().replace('-', '')}%
        </Percentage>
      )}
      {after ? <button onClick={() => saveSvg('whatever.svg')}>Download</button> : null}
    </Wrapper>
  )
}
