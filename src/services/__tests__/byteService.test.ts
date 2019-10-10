import { getHumanReadableBytes } from '../byteService'

describe('byte', () => {
  it('bytes', () => {
    expect(getHumanReadableBytes(100)).toEqual('100 B')
  })

  it('negative bytes', () => {
    expect(getHumanReadableBytes(-100)).toEqual('-100 B')
  })

  it('kilobytes', () => {
    expect(getHumanReadableBytes(80 * 1024)).toEqual('80 kB')
  })

  it('negative kilobytes', () => {
    expect(getHumanReadableBytes(-204 * 1021.5)).toEqual('-203.5 kB')
  })

  it('megabytes', () => {
    expect(getHumanReadableBytes(548405248)).toEqual('523 MB')
  })

  it('gigabytes', () => {
    expect(getHumanReadableBytes(1181116000)).toEqual('1.1 GB')
  })
})
