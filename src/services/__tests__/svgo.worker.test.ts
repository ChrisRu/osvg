import { svgo } from '../svgo.worker'

describe('svgo', () => {
  it('should be able to run svgo', async () => {
    expect(await svgo('', { plugins: [], prettify: false, precision: 3 })).toEqual('')
  })

  it('should minify svgs', async () => {
    expect(
      await svgo('<svg><title id="test" id="what">test</title></svg>', {
        plugins: [],
        prettify: false,
        precision: 3,
      }),
    ).toEqual('<svg><title id="what">test</title></svg>')
  })

  it('should prettify', async () => {
    expect(
      await svgo('<svg><title id="what">test</title></svg>', {
        plugins: [],
        prettify: true,
        precision: 3,
      }),
    ).toEqual('<svg>\n    <title id="what">\n        test\n    </title>\n</svg>\n')
  })

  it('should do precision', async () => {
    expect(
      await svgo('<svg><path d="M0.00012, 124.24404, 1Z" /></svg>', {
        plugins: [
          {
            id: 'convertPathData',
            description: '',
            category: '',
            value: true,
          },
        ],
        prettify: false,
        precision: 3,
      }),
    ).toEqual('<svg><path d="M0 124.244l1z"/></svg>')
  })

  it('should do precision number', async () => {
    expect(
      await svgo('<svg><path d="M0.00012, 124.24404, 1Z" /></svg>', {
        plugins: [
          {
            id: 'convertPathData',
            description: '',
            category: '',
            value: true,
          },
        ],
        prettify: false,
        precision: 2,
      }),
    ).toEqual('<svg><path d="M0 124.24l1z"/></svg>')
  })
})
