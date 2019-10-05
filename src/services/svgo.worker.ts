import SVGO from 'svgo'

export async function SVGOWorker(svg: string, userConfig: SVGO.PluginConfig[], floatPrecision = 3) {
  const options: SVGO.Options = {
    full: true,
    // @ts-ignore
    multipass: true,
    datauri: 'unenc',
    floatPrecision: floatPrecision,
    plugins: userConfig,
  }

  const optimized = await new SVGO(options).optimize(svg)

  return optimized.data.replace('data:image/svg+xml,', '')
}
