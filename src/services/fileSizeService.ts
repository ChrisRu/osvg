import { gzip } from 'pako'

export function getFileSize(contents: string) {
  return new Blob([contents]).size
}

export function getFileSizeGZIP(contents: string) {
  return gzip(contents).byteLength
}
