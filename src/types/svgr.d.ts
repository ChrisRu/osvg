/* eslint-disable @typescript-eslint/ban-ts-comment */

declare module '@svgr/core' {
  interface IConfig {
    // @ts-ignore
    h2xConfig?: object
    dimensions?: boolean
    expandProps?: string
    icon?: boolean
    native?: boolean
    prettier?: boolean
    // @ts-ignore
    prettierConfig?: object
    memo?: boolean
    ref?: boolean
    // @ts-ignore
    replaceAttrValues?: object
    // @ts-ignore
    svgProps?: object
    svgo?: boolean
    // @ts-ignore
    svgoConfig?: object
    // @ts-ignore
    template?: object
    titleProp?: boolean
    runtimeConfig?: boolean
    // @ts-ignore
    plugins?: object
  }

  interface IState {
    componentName?: string
  }

  function svgr(code: string, config: IConfig, state: IState): Promise<string>

  export = svgr
}
