import optimizeSVG from '../plugins/svgo/svgo'
import { ISettings } from './svgoSettings'

const cache = new Map<string, string>()

export async function svgo(svg: string, settings: ISettings) {
  const pluginIds = settings.plugins.filter(plugin => plugin.value).map(setting => setting.id)
  const key = `${svg}:${settings.prettify}:${settings.precision}:${pluginIds.join(',')}`

  if (cache.has(key)) {
    return cache.get(key)
  }

  const result = await optimizeSVG(svg, {
    floatPrecision: settings.precision,
    plugins: pluginIds,
    pretty: settings.prettify,
  })

  cache.set(key, result)

  return result
}
