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
