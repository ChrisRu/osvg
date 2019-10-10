import { gzip } from 'pako/dist/pako_deflate'

export function getFileSize(contents: string) {
  return new Blob([contents]).size
}

export function getFileSizeGZIP(contents: string) {
  return gzip(contents).byteLength
}
