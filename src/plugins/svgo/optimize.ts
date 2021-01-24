// @ts-ignore
import convertSVGToObject from 'svgo/lib/svgo/svg2js'
// @ts-ignore
import convertObjectToSVG from 'svgo/lib/svgo/js2svg'
// @ts-ignore
import applySVGOPlugins from 'svgo/lib/svgo/plugins'
import type { ISVGOPlugin } from './svgo'

export default async function optimize(svg: string, plugins: ISVGOPlugin[][], pretty: boolean) {
  const stringToSVGObj = (svg: string): Promise<object> =>
    new Promise((r) => convertSVGToObject(svg, r))
  const optimizeSVGObj = (svg: object) => applySVGOPlugins(svg, { input: 'string' }, plugins)
  const SVGObjToString = (svg: object, pretty: boolean): string =>
    convertObjectToSVG(svg, { pretty }).data

  return SVGObjToString(optimizeSVGObj(await stringToSVGObj(svg)), pretty)
}
