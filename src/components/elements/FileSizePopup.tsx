import React from 'react'
import styled from 'styled-components'
import { getHumanReadableBytes } from '../../services/byteService'

const Wrapper = styled.table`
  padding: 1rem;
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

  th,
  td {
    text-align: right;
    padding: 0.5rem;
    opacity: 0.6;
  }

  td:not(:first-child) {
    opacity: 1;
  }
`

interface IProps {
  className?: string
  gzipBefore: number
  gzipAfter?: number
  nonGzipBefore: number
  nonGzipAfter?: number
}

export function FileSizePopup({
  className,
  gzipBefore,
  gzipAfter,
  nonGzipBefore,
  nonGzipAfter,
}: IProps) {
  return (
    <Wrapper className={className}>
      <thead>
        <th></th>
        <th>Non GZIP</th>
        <th>GZIP</th>
      </thead>
      <tr>
        <td>original</td>
        <td>{getHumanReadableBytes(nonGzipBefore)}</td>
        <td>{nonGzipAfter ? getHumanReadableBytes(nonGzipAfter) : '-'}</td>
      </tr>
      <tr>
        <td>optimized</td>
        <td>{getHumanReadableBytes(gzipBefore)}</td>
        <td>{gzipAfter ? getHumanReadableBytes(gzipAfter) : '-'}</td>
      </tr>
    </Wrapper>
  )
}
