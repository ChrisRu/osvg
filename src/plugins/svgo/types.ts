// Type definitions for svgo 1.3
// Project: https://github.com/svg/svgo
// Definitions by: Bradley Ayers <https://github.com/bradleyayers>
//                 Gilad Gray <https://github.com/giladgray>
//                 Aankhen <https://github.com/Aankhen>
//                 Jan Karres <https://github.com/jankarres>
//                 Gavin Gregory <https://github.com/gavingregory>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

export interface PluginCleanupAttrs {
  cleanupAttrs: boolean | object
}

export interface PluginInlineStyles {
  cleanupAttrs: boolean | object
}

export interface PluginRemoveDoctype {
  removeDoctype: boolean | object
}

export interface PluginRemoveXMLProcInst {
  removeXMLProcInst: boolean | object
}

export interface PluginRemoveComments {
  removeComments: boolean | object
}

export interface PluginRemoveMetadata {
  removeMetadata: boolean | object
}

export interface PluginRemoveTitle {
  removeTitle: boolean | object
}

export interface PluginRemoveDesc {
  removeDesc: boolean | object
}

export interface PluginRemoveUselessDefs {
  removeUselessDefs: boolean | object
}

export interface PluginRemoveXMLNS {
  removeXMLNS: boolean | object
}

export interface PluginRemoveEditorsNSData {
  removeEditorsNSData: boolean | object
}

export interface PluginRemoveEmptyAttrs {
  removeEmptyAttrs: boolean | object
}

export interface PluginRemoveHiddenElems {
  removeHiddenElems: boolean | object
}

export interface PluginRemoveEmptyText {
  removeEmptyText: boolean | object
}

export interface PluginRemoveEmptyContainers {
  removeEmptyContainers: boolean | object
}

export interface PluginRemoveViewBox {
  removeViewBox: boolean | object
}

export interface PluginCleanupEnableBackground {
  cleanupEnableBackground: boolean | object
}

export interface PluginMinifyStyles {
  minifyStyles: boolean | object
}

export interface PluginConvertStyleToAttrs {
  convertStyleToAttrs: boolean | object
}

export interface PluginConvertColors {
  convertColors: boolean | object
}

export interface PluginConvertPathData {
  convertPathData: boolean | object
}

export interface PluginConvertTransform {
  convertTransform: boolean | object
}

export interface PluginRemoveUnknownsAndDefaults {
  removeUnknownsAndDefaults: boolean | object
}

export interface PluginRemoveNonInheritableGroupAttrs {
  removeNonInheritableGroupAttrs: boolean | object
}

export interface PluginRemoveUselessStrokeAndFill {
  removeUselessStrokeAndFill: boolean | object
}

export interface PluginRemoveUnusedNS {
  removeUnusedNS: boolean | object
}

export interface PluginPrefixIds {
  removeUnusedNS: boolean | object
}

export interface PluginCleanupIDs {
  cleanupIDs: boolean | object
}

export interface PluginCleanupNumericValues {
  cleanupNumericValues: boolean | object
}

export interface PluginCleanupListOfValues {
  cleanupListOfValues: boolean | object
}

export interface PluginMoveElemsAttrsToGroup {
  moveElemsAttrsToGroup: boolean | object
}

export interface PluginMoveGroupAttrsToElems {
  moveGroupAttrsToElems: boolean | object
}

export interface PluginCollapseGroups {
  collapseGroups: boolean | object
}

export interface PluginRemoveRasterImages {
  removeRasterImages: boolean | object
}

export interface PluginMergePaths {
  mergePaths: boolean | object
}

export interface PluginConvertShapeToPath {
  convertShapeToPath: boolean | object
}

export interface PluginSortAttrs {
  sortAttrs: boolean | object
}

export interface PluginRemoveDimensions {
  removeDimensions: boolean | object
}

export interface PluginConvertEllipseToCircle {
  convertEllipseToCircle: boolean | object
}

export interface PluginRemoveAttrs {
  removeAttrs: boolean | object
}

export interface PluginRemoveAttributesBySelector {
  removeAttributesBySelector: boolean | object
}

export interface PluginRemoveElementsByAttr {
  removeElementsByAttr: boolean | object
}

export interface PluginAddClassesToSVGElement {
  addClassesToSVGElement: boolean | object
}

export interface PluginAddAttributesToSVGElement {
  addAttributesToSVGElement: boolean | object
}

export interface PluginRemoveOffCanvasPaths {
  removeOffCanvasPaths: boolean | object
}

export interface PluginRemoveStyleElement {
  removeStyleElement: boolean | object
}

export interface PluginRemoveScriptElement {
  removeScriptElement: boolean | object
}

export interface PluginReusePaths {
  reusePaths: boolean | object
}

export interface PluginSortDefsChildren {
  sortDefsChildren: boolean | object
}

interface SvgInfo {
  path?: string
}

interface OptimizedSvg {
  data: string
  info: {
    width: string
    height: string
  }
  path?: string
}

export interface SVGO extends Function {
  new (config: Options): {
    optimize(svgstr: string): Promise<OptimizedSvg>
  }
}

export type PluginConfig =
  | PluginCleanupAttrs
  | PluginInlineStyles
  | PluginRemoveDoctype
  | PluginRemoveXMLProcInst
  | PluginRemoveComments
  | PluginRemoveMetadata
  | PluginRemoveTitle
  | PluginRemoveDesc
  | PluginRemoveUselessDefs
  | PluginRemoveXMLNS
  | PluginRemoveEditorsNSData
  | PluginRemoveEmptyAttrs
  | PluginRemoveHiddenElems
  | PluginRemoveEmptyText
  | PluginRemoveEmptyContainers
  | PluginRemoveViewBox
  | PluginCleanupEnableBackground
  | PluginMinifyStyles
  | PluginConvertStyleToAttrs
  | PluginConvertEllipseToCircle
  | PluginConvertColors
  | PluginConvertPathData
  | PluginConvertTransform
  | PluginRemoveUnknownsAndDefaults
  | PluginRemoveNonInheritableGroupAttrs
  | PluginRemoveUselessStrokeAndFill
  | PluginRemoveUnusedNS
  | PluginPrefixIds
  | PluginCleanupIDs
  | PluginCleanupNumericValues
  | PluginCleanupListOfValues
  | PluginMoveElemsAttrsToGroup
  | PluginSortDefsChildren
  | PluginMoveGroupAttrsToElems
  | PluginCollapseGroups
  | PluginRemoveRasterImages
  | PluginMergePaths
  | PluginConvertShapeToPath
  | PluginSortAttrs
  | PluginRemoveDimensions
  | PluginRemoveAttrs
  | PluginRemoveAttributesBySelector
  | PluginRemoveElementsByAttr
  | PluginAddClassesToSVGElement
  | PluginAddAttributesToSVGElement
  | PluginRemoveOffCanvasPaths
  | PluginRemoveStyleElement
  | PluginRemoveScriptElement
  | PluginReusePaths

export interface Js2SvgOptions {
  /** @default '<!DOCTYPE' */
  doctypeStart?: string
  /** @default '>' */
  doctypeEnd?: string
  /** @default '<?' */
  procInstStart?: string
  /** @default '?>' */
  procInstEnd?: string
  /** @default '<' */
  tagOpenStart?: string
  /** @default '>' */
  tagOpenEnd?: string
  /** @default '</' */
  tagCloseStart?: string
  /** @default '>' */
  tagCloseEnd?: string
  /** @default '<' */
  tagShortStart?: string
  /** @default '/>' */
  tagShortEnd?: string
  /** @default '="' */
  attrStart?: string
  /** @default '"' */
  attrEnd?: string
  /** @default '<!--' */
  commentStart?: string
  /** @default '-->' */
  commentEnd?: string
  /** @default '<![CDATA[' */
  cdataStart?: string
  /** @default ']]>' */
  cdataEnd?: string
  /** @default '' */
  textStart?: string
  /** @default '' */
  textEnd?: string
  /** @default 4 */
  indent?: number
  /** @default /[&'"<>]/g */
  regEntities?: RegExp
  /** @default /[&"<>]/g */
  regValEntities?: RegExp
  /** @default encodeEntity */
  encodeEntity?: (char?: string) => string
  /** @default false */
  pretty?: boolean
  /** @default true */
  useShortTags?: boolean
}

export interface Svg2JsOptions {
  /** @default true */
  strict?: boolean
  /** @default false */
  trim?: boolean
  /** @default true */
  normalize?: boolean
  /** @default true */
  lowercase?: boolean
  /** @default true */
  xmlns?: boolean
  /** @default true */
  position?: boolean
}

export interface Options {
  /** Output as Data URI string. */
  datauri?: 'base64' | 'enc' | 'unenc' | 'cheaty string so it doesnt encode anything' | undefined

  /** Precision of floating point numbers. Will be passed to each plugin that suppors this param. */
  floatPrecision?: number

  /** Use full set of plugins. */
  full?: boolean

  /** Options for rendering optimized SVG from AST. */
  js2svg?: Js2SvgOptions

  multipass?: boolean

  /**
   * Individual plugin configurations.
   * For specific options, see plugin source in https://github.com/svg/svgo/tree/master/plugins.
   */
  plugins?: PluginConfig[]

  /** Options for parsing original SVG into AST. */
  svg2js?: Svg2JsOptions
}
