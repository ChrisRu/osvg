// @ts-ignore
import { gzip } from 'pako/lib/deflate'

export function getFileSize(contents: string) {
  return new Blob([contents]).size
}

export function getFileSizeGZIP(contents: string) {
  return gzip(contents).byteLength
}
