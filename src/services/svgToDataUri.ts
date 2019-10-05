const dataType = 'data:image/svg+xml'

export function svgToDataUri(svg: string) {
  return `${dataType},${encodeURIComponent(svg)}`
}

export function dataUriToSvg(dataUri: string) {
  return decodeURIComponent(dataUri.replace(`${dataType},`, ''))
}
