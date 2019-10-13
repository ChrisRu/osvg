// @ts-ignore
import SVG2JS from 'svgo/lib/svgo/svg2js'
// @ts-ignore
import JS2SVG from 'svgo/lib/svgo/js2svg'
// @ts-ignore
import PLUGINS from 'svgo/lib/svgo/plugins'
import { plugins as pluginData } from './svgoPlugins'

interface ISettings {
  plugins: string[]
  floatPrecision: number
  pretty: boolean
  maxMultipass?: number
}

interface ISVGOPlugin {
  type: string
  active: boolean
  description: string
  params: any
  fn: (...any: any[]) => any
}

function optimizePluginsArray(plugins: ISVGOPlugin[]) {
  return plugins.reduce<ISVGOPlugin[][]>((total, nextPlugin) => {
    const last = total[total.length - 1]

    if (last && nextPlugin.type === last[0].type) {
      last.push(nextPlugin)
    } else {
      total.push([nextPlugin])
    }

    return total
  }, [])
}

export default async function svgo(svgstr: string, settings: ISettings) {
  const availablePlugins = Object.entries(pluginData) as [string, ISVGOPlugin][]

  // activate/deactivate plugins
  for (const [name, plugin] of availablePlugins) {
    plugin.active = settings.plugins.includes(name)
  }

  // Set floatPrecision across all the plugins
  const floatPrecision = Number(settings.floatPrecision) || 3
  for (const plugin of Object.values(pluginData) as ISVGOPlugin[]) {
    if (plugin.params && 'floatPrecision' in plugin.params) {
      if (plugin === pluginData.cleanupNumericValues && floatPrecision === 0) {
        // 0 almost always breaks images when used on this plugin.
        // Better to allow 0 for everything else, but switch to 1 for this plugin.
        plugin.params.floatPrecision = 1
      } else {
        plugin.params.floatPrecision = floatPrecision
      }
    }
  }

  const optimizedPluginsData = optimizePluginsArray(availablePlugins.map(([_, x]) => x))

  let i = 0
  let prevLength = Number.POSITIVE_INFINITY
  while (++i < (settings.maxMultipass || 10) && svgstr.length < prevLength) {
    prevLength = svgstr.length

    const svgObj = await transformSvgToObj(svgstr)

    const transformedSVG = PLUGINS(svgObj, { input: 'string' }, optimizedPluginsData)

    svgstr = JS2SVG(transformedSVG, { pretty: settings.pretty }).data
  }

  return svgstr
}

function transformSvgToObj(svgstr: string) {
  return new Promise(resolve => SVG2JS(svgstr, resolve))
}
