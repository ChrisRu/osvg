/**
 * Replace a value at a specified place in the array
 * Heavily inspired by Ramda
 * @param index Index where to replace the value
 * @param value Value to replace at index
 * @param array Array to replace value in
 */
export function update<T>(index: number, value: T, array: T[]) {
  if (index === -1) {
    return array
  }

  return [...array.slice(0, index), value, ...array.slice(index + 1)]
}
