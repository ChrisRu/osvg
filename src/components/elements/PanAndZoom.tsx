import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components/macro'

type Coordinates = [number, number]

function getXY(obj: MouseEvent | Touch): Coordinates {
  return [obj.pageX, obj.pageY]
}

function getMidpoint([x1, y1]: Coordinates, [x2, y2]: Coordinates): Coordinates {
  return [(x1 + x2) / 2, (y1 + y2) / 2]
}

function getPoints(event: MouseEvent | TouchEvent) {
  if ((event as TouchEvent).touches) {
    return Array.from((event as TouchEvent).touches).map(getXY)
  } else {
    return [getXY(event as MouseEvent)]
  }
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface IProps {
  children: React.ReactNode
}

export function PanAndZoom({ children }: IProps) {
  const lastPoints = useRef<Coordinates[]>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  const [dX, setDX] = useState(0)
  const [dY, setDY] = useState(0)
  const [dScale, setDScale] = useState(1)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    function wheel(event: WheelEvent) {
      if (event.ctrlKey) {
        return
      }

      event.preventDefault()

      const boundingRect = itemRef.current ? itemRef.current.getBoundingClientRect() : undefined

      const delta = Math.max(
        Math.min(event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY, 60),
        -60,
      )

      const scaleDiff = delta / 500 + 1

      setDScale((scale) => scale / scaleDiff)
      setDScale((scale) => (scale <= 0.1 ? 0.1 : scale))
      if (boundingRect) {
        const up = event.deltaY < 0
        const { pageX, pageY } = event
        const { left, top, right, bottom } = boundingRect

        const diff = scaleDiff - 1

        if (up) {
          setDX((dX) => dX - (pageX - left) * diff - ((left - right) / 2) * diff)
          setDY((dY) => dY - (pageY - top) * diff - ((top - bottom) / 2) * diff)
        } else {
          setDX((dX) => dX + (pageX - left) * diff + ((left - right) / 2) * diff)
          setDY((dY) => dY + (pageY - top) * diff + ((top - bottom) / 2) * diff)
        }
      }
    }

    function mousedown(event: MouseEvent) {
      if (event.button !== 0) {
        return
      }

      event.preventDefault()

      lastPoints.current = getPoints(event)
    }

    function mousemove(event: MouseEvent) {
      if (event.buttons !== 1) {
        return
      }

      event.preventDefault()

      const points = getPoints(event)
      const averagePoint = points.reduce(getMidpoint)
      const averageLastPoint =
        lastPoints.current === undefined
          ? [averagePoint[0] - dX, averagePoint[1] - dY]
          : lastPoints.current.reduce(getMidpoint)

      setDX((dX) => dX + averagePoint[0] - averageLastPoint[0])
      setDY((dY) => dY + averagePoint[1] - averageLastPoint[1])

      lastPoints.current = points
    }

    function doubleclick() {
      setDX(0)
      setDY(0)
      setDScale(1)
    }

    wrapper.addEventListener('dblclick', doubleclick)
    wrapper.addEventListener('wheel', wheel)
    wrapper.addEventListener('mousedown', mousedown)
    wrapper.addEventListener('mousemove', mousemove)

    return function () {
      wrapper.removeEventListener('dblclick', doubleclick)
      wrapper.removeEventListener('wheel', wheel)
      wrapper.removeEventListener('mousedown', mousedown)
      wrapper.removeEventListener('mousemove', mousemove)
    }
  }, [wrapperRef])

  return (
    <Wrapper ref={wrapperRef}>
      <div
        ref={itemRef}
        style={{
          pointerEvents: 'none',
          transform: `translate(${dX}px, ${dY}px) scale(${dScale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </Wrapper>
  )
}
