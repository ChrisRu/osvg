export function getHumanReadableBytes(bytes: number) {
  const thresh = 1024
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = ['kB', 'MB', 'GB', 'TB', 'PB']

  let unitIndex = -1
  do {
    bytes /= thresh
    unitIndex++
  } while (Math.abs(bytes) >= thresh && unitIndex < units.length - 1)

  return Number(bytes.toFixed(2)) + ' ' + units[unitIndex]
}
