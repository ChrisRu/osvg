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
  color: ${p => (p.improvement ? 'lime' : 'red')};
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

  console.log('=========================TEST')
  console.log(before)
  console.log(after)

  const improvement = percentage !== undefined && percentage > 0

  return (
    <Wrapper>
      {percentage === undefined ? null : (
        <Percentage improvement={improvement}>
          {improvement ? '-' : '+'}
          {percentage.toString().replace('-', '')}%
        </Percentage>
      )}
    </Wrapper>
  )
}
