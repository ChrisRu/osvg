import SVG2JS from 'svgo/lib/svgo/svg2js'
import JS2SVG from 'svgo/lib/svgo/js2svg'
import PLUGINS from 'svgo/lib/svgo/plugins'
import { plugins as pluginData } from './svgoPlugins'

function optimizePluginsArray(plugins) {
  return plugins
    .map(item => [item])
    .reduce((arr, item) => {
      const last = arr[arr.length - 1]

      if (last && item[0].type === last[0].type) {
        last.push(item[0])
      } else {
        arr.push(item)
      }
      return arr
    }, [])
}

export default async function svgo(svgstr, settings) {
  // activate/deactivate plugins
  for (const pluginInfo of Object.values(settings.plugins)) {
    pluginData[pluginInfo.id].active = pluginInfo.value
  }

  // Set floatPrecision across all the plugins
  const floatPrecision = Number(settings.floatPrecision) || 3
  for (const plugin of Object.values(pluginData)) {
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

  const optimisedPluginsData = optimizePluginsArray(Object.values(pluginData))

  let i = 0
  let prevLength = Number.POSITIVE_INFINITY
  while (++i < (settings.maxMultipass || 10) && svgstr.length < prevLength) {
    prevLength = svgstr.length

    const svgObj = await new Promise(resolve => SVG2JS(svgstr, resolve))

    const transformedSVG = PLUGINS(svgObj, { input: 'string' }, optimisedPluginsData)

    svgstr = JS2SVG(transformedSVG, { pretty: settings.pretty }).data
  }

  return svgstr
}
