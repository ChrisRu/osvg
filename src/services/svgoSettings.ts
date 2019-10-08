import {
  PluginConfig,
  PluginMoveElemsAttrsToGroup,
  PluginMoveGroupAttrsToElems,
  PluginRemoveDimensions,
  PluginRemoveViewBox,
} from '../plugins/svgo/types'

export interface ISetting {
  description: string
  getConfig: (value: boolean) => PluginConfig
  category: string
  value: boolean
}

export const defaultSettings: ISetting[] = [
  {
    description: 'Remove doctype declaration',
    getConfig: (value: boolean) => ({ removeDoctype: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove XML processing instructions',
    getConfig: (value: boolean) => ({ removeXMLProcInst: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove comments',
    getConfig: (value: boolean) => ({ removeComments: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove XMLNS (used for inline <svg>)',
    getConfig: (value: boolean) => ({ removeXMLNS: value }),
    category: 'stripping',
    value: false,
  },
  {
    description: 'Remove editor namespaces, elements and attributes',
    getConfig: (value: boolean) => ({ removeEditorsNSData: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove raster images',
    getConfig: (value: boolean) => ({ removeRasterImages: value }),
    category: 'stripping',
    value: false,
  },
  {
    description: 'Remove elements in <defs> without an id',
    getConfig: (value: boolean) => ({ removeUselessDefs: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: "Remove unknown elements' content and attributes",
    getConfig: (value: boolean) => ({ removeUnknownsAndDefaults: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: "Remove non-inheritable group's presentational attributes",
    getConfig: (value: boolean) => ({ removeNonInheritableGroupAttrs: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove useless stroke and fill attributes',
    getConfig: (value: boolean) => ({ removeUselessStrokeAndFill: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove hidden elements (zero sized or with absent attributes)',
    getConfig: (value: boolean) => ({ removeHiddenElems: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove empty <text> elements',
    getConfig: (value: boolean) => ({ removeEmptyText: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove empty attributes',
    getConfig: (value: boolean) => ({ removeEmptyAttrs: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove empty container elements',
    getConfig: (value: boolean) => ({ removeEmptyContainers: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Remove <style> elements',
    getConfig: (value: boolean) => ({ removeStyleElement: value }),
    category: 'stripping',
    value: false,
  },
  {
    description: 'Remove <script> elements',
    getConfig: (value: boolean) => ({ removeScriptElement: value }),
    category: 'stripping',
    value: false,
  },
  {
    description: 'Remove <title> element',
    getConfig: (value: boolean) => ({ removeTitle: value }),
    category: 'stripping',
    value: false,
  },
  {
    description: 'Remove <desc> element',
    getConfig: (value: boolean) => ({ removeDesc: value }),
    category: 'stripping',
    value: false,
  },
  {
    description: 'Remove <metadata> element',
    getConfig: (value: boolean) => ({ removeMetadata: value }),
    category: 'stripping',
    value: true,
  },
  {
    description: 'Prefer viewbox over width and height',
    getConfig: (value: boolean) =>
      (({ [value ? 'removeDimensions' : 'removeViewBox']: true } as unknown) as
        | PluginRemoveDimensions
        | PluginRemoveViewBox),
    category: 'stripping',
    value: false,
  },
  {
    description: 'Remove unused namespaces declaration',
    getConfig: (value: boolean) => ({ removeUnusedNS: value }),
    category: 'stripping',
    value: true,
  },
  // {
  //   getConfig: (value: boolean) => ({ removeAttributesBySelector: value }),
  //   description: 'Remove attributes of elements that match a CSS selector',
  //   category: 'stripping'
  //   value: []
  // },
  // {
  //   getConfig: (value: boolean) => ({ removeElementsByAttr: value }),
  //   description: 'Remove arbitrary elements by ID or className',
  //   category: 'stripping'
  //   value: []
  // },
  // {
  //   getConfig: (value: boolean) => ({ removeOffCanvasPaths: value }),
  //   description: 'Remove elements that are drawn outside of the viewbox',
  //   category: 'stripping'
  //   value: []
  // },
  {
    description: "Round numeric values to the fixed precision, removes default 'px' units",
    getConfig: (value: boolean) => ({ cleanupNumericValues: value }),
    category: 'rounding',
    value: true,
  },
  {
    description: 'Round lists of values to the fixed precision',
    getConfig: (value: boolean) => ({ cleanupListOfValues: value }),
    category: 'rounding',
    value: true,
  },
  {
    description: 'Optimize path data by writing in shorter form with transformations',
    getConfig: (value: boolean) => ({ convertPathData: value }),
    category: 'rounding',
    value: true,
  },
  {
    description: 'Collapse multiple transformations and optimize them',
    getConfig: (value: boolean) => ({ convertTransform: value }),
    category: 'rounding',
    value: true,
  },
  {
    description: 'Convert non-eccentric <ellipse> elements to <circle> elements',
    getConfig: (value: boolean) => ({ convertEllipseToCircle: value }),
    category: 'shapes',
    value: true,
  },
  {
    description: 'Convert basic shapes to more compact path form',
    getConfig: (value: boolean) => ({ convertShapeToPath: value }),
    category: 'shapes',
    value: true,
  },
  {
    description: 'Minify styles and remove unused styles based on usage',
    getConfig: (value: boolean) => ({ minifyStyles: value }),
    category: 'styles',
    value: true,
  },
  {
    description: 'Minify colours to smaller strings',
    getConfig: (value: boolean) => ({ convertColors: value }),
    category: 'styles',
    value: true,
  },
  // {
  //   description: 'Inline styles',
  //   getConfig: (value: boolean) => ({ inlineStyles: value }),
  //   category: 'styles'
  //   value: false
  // },
  {
    description: 'Convert style to attributes',
    getConfig: (value: boolean) => ({ convertStyleToAttrs: value }),
    category: 'styles',
    value: true,
  },
  {
    description: 'Remove unused IDs and minifies used IDs',
    getConfig: (value: boolean) => ({ cleanupIDs: value }),
    category: 'styles',
    value: true,
  },
  {
    description: 'Sort attributes',
    getConfig: (value: boolean) => ({ sortAttrs: value }),
    category: 'pretty code',
    value: true,
  },
  {
    description: 'Sort children of <defs> to improve compression',
    getConfig: (value: boolean) => ({ sortDefsChildren: value }),
    category: 'pretty code',
    value: true,
  },
  {
    description: 'Cleanup attributes from newlines, trailing and repeating spaces',
    getConfig: (value: boolean) => ({ cleanupAttrs: value }),
    category: 'pretty code',
    value: true,
  },
  // {
  //   getConfig: (value: boolean) => ({ prefixIds: value }),
  //   description: 'Prefix IDs',
  //   category: 'pretty code'
  // },
  {
    description: 'Prefer attributes on parent group instead of individual elements',
    getConfig: (value: boolean) =>
      (({
        [value ? 'moveElemsAttrsToGroup' : 'moveGroupAttrsToElems']: true,
      } as unknown) as PluginMoveElemsAttrsToGroup | PluginMoveGroupAttrsToElems),
    category: 'pretty code',
    value: true,
  },
  {
    description: 'Cleanup enable-background',
    getConfig: (value: boolean) => ({ cleanupEnableBackground: value }),
    category: 'other',
    value: true,
  },
  {
    description: 'Collapse useless groups',
    getConfig: (value: boolean) => ({ collapseGroups: value }),
    category: 'other',
    value: true,
  },
  {
    description: 'Merge multiple paths into one',
    getConfig: (value: boolean) => ({ mergePaths: value }),
    category: 'other',
    value: true,
  },
  {
    description: 'Replace duplicate elements with <use> elements',
    getConfig: (value: boolean) => ({ reusePaths: value }),
    category: 'other',
    value: true,
  },
  // {
  //   getConfig: (value: boolean) => ({ addClassesToSVGElement: value }),
  //   description: 'Add classes to <svg> element',
  //   category: 'other'
  //   value: []
  // },
  // {
  //   getConfig: (value: boolean) => ({ addAttributesToSVGElement: value }),
  //   description: 'Add attributes to an outer <svg> element',
  //   category: 'other'
  //   value: []
  // },
]
