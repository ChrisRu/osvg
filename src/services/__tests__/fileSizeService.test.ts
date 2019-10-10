import { getFileSize, getFileSizeGZIP } from '../fileSizeService'

describe('file size', () => {
  it('regular size', () => {
    expect(getFileSize('some')).toEqual(4)
  })

  it('regular size long', () => {
    expect(getFileSize('some some some')).toEqual(14)
  })

  it('regular size empty', () => {
    expect(getFileSize('')).toEqual(0)
  })

  it('GZIP size', () => {
    expect(getFileSizeGZIP('some')).toEqual(24)
  })

  it('GZIP size long', () => {
    expect(getFileSizeGZIP('some some some')).toEqual(27)
  })

  it('GZIP size empty', () => {
    expect(getFileSizeGZIP('')).toEqual(20)
  })
})
