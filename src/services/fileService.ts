export interface IFileDetails {
  contents: string
  name?: string
}

export async function createOpenFile() {
  const files = await new Promise<FileList | null>((resolve) => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.svg'
    fileInput.style.display = 'none'
    fileInput.onchange = (data) => {
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
    reader.onload = (event) => {
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

export function onDragOver(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault()

  event.dataTransfer.dropEffect = 'copy'
}

export async function onOpenFile(
  event: React.ChangeEvent<HTMLInputElement>,
): Promise<IFileDetails | undefined> {
  event.preventDefault()

  if (event.target.files?.[0]) {
    return openFile(event.target.files)
  }
}

export async function onDrop(
  event: React.DragEvent<HTMLDivElement>,
): Promise<IFileDetails | undefined> {
  event.preventDefault()

  if (event.dataTransfer.files?.[0]) {
    return openFile(event.dataTransfer.files)
  }
}

export async function onPaste(
  event: React.ClipboardEvent<HTMLInputElement>,
): Promise<IFileDetails | undefined> {
  event.preventDefault()

  if (event.clipboardData.files?.[0]) {
    return openFile(event.clipboardData.files)
  } else {
    const text = event.clipboardData.getData('text')
    if (text) {
      return {
        contents: text,
      }
    }
  }
}

export function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): IFileDetails | undefined {
  if (event.key === 'Enter') {
    event.preventDefault()

    return {
      contents: (event.target as HTMLInputElement).value,
    }
  }
}

export async function onDemo(location: string): Promise<IFileDetails> {
  const response = await fetch(location)
  const contents = await response.text()

  return {
    contents,
    name: 'doggo.svg',
  }
}

export function loadSVGWith<T>(
  onLoadSVG: (file: IFileDetails | undefined) => void,
  fn: (_: T) => Promise<IFileDetails | undefined>,
) {
  return async (event: T) => onLoadSVG(await fn(event))
}
