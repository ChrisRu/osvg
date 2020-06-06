export function getSVGTitle(contents: string) {
  try {
    const parser = new DOMParser()
    const document = parser.parseFromString(contents, 'text/xml')
    const titles = document.getElementsByTagName('title')

    if (titles[0]) {
      return titles[0].textContent + '.svg'
    }
  } catch (error) {
    console.warn('Could not get title from SVG', error)
  }
}

const svgDataType = 'data:image/svg+xml'

export function SVGToDataUri(svg: string, dataType = svgDataType) {
  return `${dataType},${encodeURIComponent(svg)}`
}

export function dataUriToSVG(dataUri: string, dataType = svgDataType) {
  return decodeURIComponent(dataUri.replace(`${dataType},`, ''))
}
