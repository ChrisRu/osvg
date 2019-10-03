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
  optimized.data = optimized.data.replace('data:image/svg+xml,', '')

  console.log(Math.round(((svg.length - optimized.data.length) / svg.length) * 10000) / 100 + '%')

  return optimized.data
}
