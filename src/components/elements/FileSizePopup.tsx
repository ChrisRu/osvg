import React from 'react'
import styled from 'styled-components'
import { getHumanReadableBytes } from '../../services/byteService'
import { ArrowRightIcon } from './Icons'

const Wrapper = styled.table`
  padding: 0.5rem;
  border-radius: 1rem;
  font-size: 1.1rem;
  position: absolute;
  background: #181818;
  color: #fff;
  border: 0;
  border-spacing: 0;
  top: 100%;
  left: 0;
  right: 0;
`

const Cell = styled.td<{ faded?: boolean; alignRight?: boolean }>`
  padding: 0.5rem;
  opacity: ${p => (p.faded ? 0.6 : 1)};
  text-align: ${p => (p.alignRight ? 'right' : 'left')};
  font-size: ${p => (p.faded ? 0.9 : 1)}em;
  line-height: 1.2rem;

  svg {
    height: 1.2rem;
    width: 1.2rem;
    vertical-align: middle;
    display: inline-block;
  }
`

interface IProps {
  className?: string
  gzipInitialSize: number
  gzipOptimizedSize?: number
  diskInitialSize: number
  diskOptimizedSize?: number
}

export function FileSizePopup({
  className,
  gzipInitialSize,
  gzipOptimizedSize,
  diskInitialSize,
  diskOptimizedSize,
}: IProps) {
  return (
    <Wrapper className={className}>
      <thead>
        <Cell as="th" />
        <Cell as="th" faded alignRight>
          original
        </Cell>
        <Cell as="th" />
        <Cell as="th" faded>
          optimized
        </Cell>
      </thead>
      <tr>
        <Cell faded>disk</Cell>
        <Cell alignRight>{getHumanReadableBytes(diskInitialSize)}</Cell>
        <Cell faded>
          <ArrowRightIcon />
        </Cell>
        <Cell>{diskOptimizedSize ? getHumanReadableBytes(diskOptimizedSize) : '-'}</Cell>
      </tr>
      <tr>
        <Cell faded>GZIP</Cell>
        <Cell alignRight>{getHumanReadableBytes(gzipInitialSize)}</Cell>
        <Cell faded>
          <ArrowRightIcon />
        </Cell>
        <Cell>{gzipOptimizedSize ? getHumanReadableBytes(gzipOptimizedSize) : '-'}</Cell>
      </tr>
    </Wrapper>
  )
}
