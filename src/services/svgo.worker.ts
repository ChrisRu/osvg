import SVGOPlugin from '../plugins/svgo/index'
import SVGO from '../plugins/svgo/types'

export async function SVGOWorker(
  svg: string,
  userConfig: SVGO.PluginConfig[],
  pretty = false,
  floatPrecision = 3,
) {
  const options: SVGO.Options = {
    full: true,
    multipass: true,
    // @ts-ignore
    datauri: 'cheaty string so it doesnt encode anything',
    floatPrecision: floatPrecision,
    plugins: userConfig,
    js2svg: {
      pretty,
    },
    svg2js: {},
  }

  // @ts-ignore
  const optimized = await new SVGOPlugin(options).optimize(svg)

  return optimized.data
}
