import svgo from '../plugins/svgo/svgo'
import { ISetting } from './svgoSettings'

export function SVGOWorker(svg: string, plugins: ISetting[], pretty = false, floatPrecision = 3) {
  return svgo(svg, {
    floatPrecision,
    plugins: plugins.map(setting => setting.id),
    pretty,
  })
}
