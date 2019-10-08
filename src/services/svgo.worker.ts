import SVGO from '../plugins/svgo/index'
import { Options } from '../plugins/svgo/types'
import { ISetting } from './svgoSettings'

export async function SVGOWorker(
  svg: string,
  settings: ISetting[],
  pretty = false,
  floatPrecision = 3,
) {
  const options: Options = {
    full: true,
    multipass: true,
    datauri: 'cheaty string so it doesnt encode anything',
    floatPrecision: floatPrecision,
    plugins: settings
      .filter(setting => setting.value)
      .map(setting => setting.getConfig(setting.value)),
    js2svg: {
      pretty,
    },
    svg2js: {},
  }

  const optimized = await new SVGO(options).optimize(svg)

  return optimized.data
}
