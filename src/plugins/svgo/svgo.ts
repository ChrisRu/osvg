import { plugins } from './svgoPlugins'

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

async function optimize(svg: string, plugins: ISVGOPlugin[][], pretty: boolean) {
  const [convertSVGToObject, convertObjectToSVG, applySVGOPlugins] = (
    await Promise.all([
      // @ts-ignore
      import('svgo/lib/svgo/svg2js'),
      // @ts-ignore
      import('svgo/lib/svgo/js2svg'),
      // @ts-ignore
      import('svgo/lib/svgo/plugins'),
    ])
  ).map((x) => x.default)

  const stringToSVGObj = (svg: string): Promise<object> =>
    new Promise((r) => convertSVGToObject(svg, r))
  const optimizeSVGObj = (svg: object) => applySVGOPlugins(svg, { input: 'string' }, plugins)
  const SVGObjToString = (svg: object, pretty: boolean): string =>
    convertObjectToSVG(svg, { pretty }).data

  return SVGObjToString(optimizeSVGObj(await stringToSVGObj(svg)), pretty)
}

export default async function optimizeSVG(svgInput: string, settings: ISettings) {
  const activePlugins = new Set(settings.plugins)
  const availablePlugins = Object.entries(plugins) as [string, ISVGOPlugin][]
  const optimizedPluginsData: ISVGOPlugin[][] = []
  for (const [name, plugin] of availablePlugins) {
    // activate/deactivate plugins
    plugin.active = activePlugins.has(name)

    // Set floatPrecision across all the plugins
    if (plugin.params && 'floatPrecision' in plugin.params) {
      if (plugin === plugins.cleanupNumericValues && settings.floatPrecision === 0) {
        // 0 almost always breaks images when used on this plugin.
        // Better to allow 0 for everything else, but switch to 1 for this plugin.
        plugin.params.floatPrecision = 1
      } else {
        plugin.params.floatPrecision = settings.floatPrecision
      }
    }

    // Organizing data structure for SVGO
    const previousPlugin = optimizedPluginsData[optimizedPluginsData.length - 1]
    if (previousPlugin && plugin.type === previousPlugin[0].type) {
      previousPlugin.push(plugin)
    } else {
      optimizedPluginsData.push([plugin])
    }
  }

  let i = 0
  let prevLength = Number.POSITIVE_INFINITY
  let svgStr = svgInput
  while (++i < (settings.maxMultipass || 10) && svgStr.length < prevLength) {
    prevLength = svgStr.length
    svgStr = await optimize(svgStr, optimizedPluginsData, settings.pretty)
  }

  return svgStr
}
