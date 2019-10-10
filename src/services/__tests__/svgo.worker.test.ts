import { SVGOWorker } from '../svgo.worker'
import fs from 'fs'
import { promisify } from 'util'

async function openFile(location: string) {
  const fileBuffer = await promisify(fs.readFile)(location)
  return fileBuffer.toString()
}

describe('svgo', () => {
  it('should be able to run svgo', async () => {
    expect(await SVGOWorker('', [], false, 3)).toEqual('')
  })

  it('should minify svgs', async () => {
    expect(
      await SVGOWorker('<svg><title id="test" id="what">test</title></svg>', [], false, 3),
    ).toEqual('<svg><title id="what">test</title></svg>')
  })

  it('should prettify', async () => {
    expect(await SVGOWorker('<svg><title id="what">test</title></svg>', [], true, 3)).toEqual(
      '<svg>\n    <title id="what">\n        test\n    </title>\n</svg>\n',
    )
  })

  it('should do precision', async () => {
    expect(
      await SVGOWorker(
        '<svg><path d="M0.00012, 124.24404, 1Z" /></svg>',
        [
          {
            getConfig: () => ({ convertPathData: true }),
            description: '',
            category: '',
            value: true,
          },
        ],
        false,
        3,
      ),
    ).toEqual('<svg><path d="M0 124.244l1z"/></svg>')
  })

  it('should do precision number', async () => {
    expect(
      await SVGOWorker(
        '<svg><path d="M0.00012, 124.24404, 1Z" /></svg>',
        [
          {
            getConfig: () => ({ convertPathData: true }),
            description: '',
            category: '',
            value: true,
          },
        ],
        false,
        2,
      ),
    ).toEqual('<svg><path d="M0 124.24l1z"/></svg>')
  })
})
