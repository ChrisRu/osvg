export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function fixFileExtension(fileName: string, extension: string) {
  const value = fileName.trim()
  if (!value.includes('.')) {
    return value + '.' + extension
  }

  const lastDotIndex =
    value.length -
    value
      .split('')
      .reverse()
      .indexOf('.')
  const lastPart = value.slice(lastDotIndex)
  if (lastPart.length > 4) {
    return value + '.' + extension
  }

  if (lastPart !== extension) {
    return value.slice(0, lastDotIndex - 1) + '.' + extension
  }

  return value
}
