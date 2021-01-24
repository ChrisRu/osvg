// @ts-ignore
import HTMLToJSX from 'htmltojsx'

export function convertHtmlToJSX(html: string) {
  return new HTMLToJSX({
    createClass: false,
  }).convert(html)
}
