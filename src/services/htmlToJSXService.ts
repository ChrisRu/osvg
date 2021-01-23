export async function convertHtmlToJSX(html: string) {
  // @ts-ignore
  const { default: HTMLToJSX } = await import('htmltojsx')

  return new HTMLToJSX({
    createClass: false,
  }).convert(html)
}
