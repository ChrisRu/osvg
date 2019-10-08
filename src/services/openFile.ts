export interface IFileDetails {
  contents: string
  name: string
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
