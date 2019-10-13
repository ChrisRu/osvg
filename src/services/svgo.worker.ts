import optimizeSVG from '../plugins/svgo/svgo'
import { ISettings } from './svgoSettings'

export function svgo(svg: string, settings: ISettings) {
  return optimizeSVG(svg, {
    floatPrecision: settings.precision,
    plugins: settings.plugins.filter(plugin => plugin.value).map(setting => setting.id),
    pretty: settings.prettify,
  })
}
