import { capitalize, fixFileExtension } from '../stringTransformService'

describe('string transform', () => {
  it('capitalize simple', () => {
    expect(capitalize('some string')).toEqual('Some string')
  })

  it('capitalize empty', () => {
    expect(capitalize('')).toEqual('')
  })

  it('capitalize capitalized', () => {
    expect(capitalize('Some string')).toEqual('Some string')
  })

  it('fix file extension', () => {
    expect(fixFileExtension('test.html', 'svg')).toEqual('test.svg')
  })

  it('fix file extension long', () => {
    expect(fixFileExtension('test.htmls', 'svg')).toEqual('test.htmls.svg')
  })

  it('fix file extension missing', () => {
    expect(fixFileExtension('test', 'svg')).toEqual('test.svg')
  })

  it('fix file extension double', () => {
    expect(fixFileExtension('test.html.png', 'svg')).toEqual('test.html.svg')
  })
})
