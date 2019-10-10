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
    }
    document.body.appendChild(fileInput)
    fileInput.click()
  })

  return openFile(files)
}

export function openFile(files: FileList | null) {
  return new Promise<IFileDetails>(resolve => {
    const file = files ? files[0] : undefined
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = function(event) {
      let contents = event.target ? event.target.result : undefined
      if (!contents) {
        return
      }

      if (contents instanceof ArrayBuffer) {
        contents = new TextDecoder('utf-8').decode(contents)
      }

      resolve({ contents, name: file.name })
    }

    reader.readAsText(file)
  })
}
