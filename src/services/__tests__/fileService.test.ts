import { openFile } from '../fileService'

describe('file', () => {
  it('should read a file list', async () => {
    const file = new Blob(['wow'], { type: 'text/image+xml' }) as any
    file.lastModifiedDate = ''
    file.name = 'filename.svg'
    const fileList = ({
      0: file,
      length: 1,
      item: () => file,
    } as unknown) as FileList

    expect(await openFile(fileList)).toEqual({
      contents: 'wow',
      name: 'filename.svg',
    })
  })
})
