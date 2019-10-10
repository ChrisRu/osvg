import { getSVGTitle, svgToDataUri, dataUriToSvg } from '../svgService'

describe('SVG', () => {
  it('should get the title', () => {
    expect(getSVGTitle('<svg><title>Test</title></svg>')).toEqual('Test.svg')
  })

  it('should not throw if it has no title', () => {
    expect(getSVGTitle('<svg><desc>hello</desc></svg>')).not.toBeDefined()
  })

  it('should undefined if can not parse xml', () => {
    expect(getSVGTitle('u><asdf<>')).not.toBeDefined()
  })

  it('should be able to transform svg to data uri', () => {
    expect(svgToDataUri('<svg></svg>')).toEqual('data:image/svg+xml,%3Csvg%3E%3C%2Fsvg%3E')
  })

  it('should be able to transform svg to data uri with different data type', () => {
    expect(svgToDataUri('<svg></svg>', 'data:bullshit')).toEqual(
      'data:bullshit,%3Csvg%3E%3C%2Fsvg%3E',
    )
  })

  it('should be able to transform data uri to svg', () => {
    expect(dataUriToSvg('data:image/svg+xml,%3Csvg%3E%3C%2Fsvg%3E')).toEqual('<svg></svg>')
  })

  it('should be able to transform data uri with different data type to svg', () => {
    expect(dataUriToSvg('data:bullshit,%3Csvg%3E%3C%2Fsvg%3E', 'data:bullshit')).toEqual(
      '<svg></svg>',
    )
  })
})
