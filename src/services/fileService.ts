export interface IFileDetails {
  contents: string
  name: string
}

export async function createOpenFile() {
  const files = await new Promise<FileList | null>(resolve => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.svg'
    fileInput.style.display = 'none'
    fileInput.onchange = data => {
      resolve(data.target ? (data.target as HTMLInputElement).files : null)
      document.body.removeChild(fileInput)
    }
    document.body.appendChild(fileInput)

    fileInput.click()
  })

  return openFile(files)
}

export function openFile(files: FileList | null) {
  return new Promise<IFileDetails>((resolve, reject) => {
    const file = files ? files[0] : undefined
    if (!file) {
      return reject('No files given')
    }

    const reader = new FileReader()
    reader.onload = event => {
      const { name } = file

      const contents = event.target ? event.target.result : undefined
      if (!contents) {
        reject('File has not content')
      }

      if (contents instanceof ArrayBuffer) {
        return resolve({ contents: new TextDecoder('utf-8').decode(contents), name })
      } else if (typeof contents === 'string') {
        return resolve({ contents, name })
      }

      reject('Unknown file contents')
    }

    reader.readAsText(file)
  })
}

export function saveSvg(image: string, imageName: string) {
  const svgBlob = new Blob([image], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)

  const downloadLink = document.createElement('a')
  downloadLink.style.visibility = 'hidden'
  downloadLink.href = svgUrl
  downloadLink.download = imageName || 'svgo.svg'
  document.body.appendChild(downloadLink)

  downloadLink.click()

  document.body.removeChild(downloadLink)
}
