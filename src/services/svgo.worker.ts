import svgo from '../plugins/svgo/svgo'
import { ISetting } from './svgoSettings'

export function SVGOWorker(svg: string, plugins: ISetting[], pretty = false, floatPrecision = 3) {
  const options = {
    floatPrecision,
    plugins: plugins,
    pretty,
  }

  return svgo(svg, options)
}
