export function copyToClipboard(content: string) {
  const textArea = document.createElement('textarea')
  textArea.value = content
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}
