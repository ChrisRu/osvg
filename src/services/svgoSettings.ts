export interface ISettings {
  plugins: ISetting[]
  precision: number
  prettify: boolean
}

export interface ISetting {
  description: string
  id: string
  category: string
  value: boolean
}

export const defaultSettings: ISettings = {
  precision: 3,
  prettify: false,
  plugins: [
    {
      description: 'Remove doctype declaration',
      id: 'removeDoctype',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove XML processing instructions',
      id: 'removeXMLProcInst',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove comments',
      id: 'removeComments',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove XMLNS (used for inline <svg>)',
      id: 'removeXMLNS',
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove editor namespaces, elements and attributes',
      id: 'removeEditorsNSData',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove raster images',
      id: 'removeRasterImages',
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove elements in <defs> without an id',
      id: 'removeUselessDefs',
      category: 'stripping',
      value: true,
    },
    {
      description: "Remove unknown elements' content and attributes",
      id: 'removeUnknownsAndDefaults',
      category: 'stripping',
      value: true,
    },
    {
      description: "Remove non-inheritable group's presentational attributes",
      id: 'removeNonInheritableGroupAttrs',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove useless stroke and fill attributes',
      id: 'removeUselessStrokeAndFill',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove hidden elements (zero sized or with absent attributes)',
      id: 'removeHiddenElems',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove empty <text> elements',
      id: 'removeEmptyText',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove empty attributes',
      id: 'removeEmptyAttrs',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove empty container elements',
      id: 'removeEmptyContainers',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Remove <style> elements',
      id: 'removeStyleElement',
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove <script> elements',
      id: 'removeScriptElement',
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove <title> element',
      id: 'removeTitle',
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove <desc> element',
      id: 'removeDesc',
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove <metadata> element',
      id: 'removeMetadata',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Prefer viewbox over width and height',
      id: 'removeDimensions',
      // getConfig: value =>
      //   (({ [value ? 'removeDimensions' : 'removeViewBox']: true } as unknown) as
      //     | PluginRemoveDimensions
      //     | PluginRemoveViewBox),
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove unused namespaces declaration',
      id: 'removeUnusedNS',
      category: 'stripping',
      value: true,
    },
    // {
    //   getConfig: (value) => ({ removeAttributesBySelector: value }),
    //   description: 'Remove attributes of elements that match a CSS selector',
    //   category: 'stripping'
    //   value: []
    // },
    // {
    //   getConfig: (value) => ({ removeElementsByAttr: value }),
    //   description: 'Remove arbitrary elements by ID or className',
    //   category: 'stripping'
    //   value: []
    // },
    // {
    //   getConfig: (value) => ({ removeOffCanvasPaths: value }),
    //   description: 'Remove elements that are drawn outside of the viewbox',
    //   category: 'stripping'
    //   value: []
    // },
    {
      description: "Round numeric values to the fixed precision, removes default 'px' units",
      id: 'cleanupNumericValues',
      category: 'rounding',
      value: true,
    },
    {
      description: 'Round lists of values to the fixed precision',
      id: 'cleanupListOfValues',
      category: 'rounding',
      value: true,
    },
    {
      description: 'Optimize path data by writing in shorter form with transformations',
      id: 'convertPathData',
      category: 'rounding',
      value: true,
    },
    {
      description: 'Collapse multiple transformations and optimize them',
      id: 'convertTransform',
      category: 'rounding',
      value: true,
    },
    {
      description: 'Convert non-eccentric <ellipse> elements to <circle> elements',
      id: 'convertEllipseToCircle',
      category: 'shapes',
      value: true,
    },
    {
      description: 'Convert basic shapes to more compact path form',
      id: 'convertShapeToPath',
      category: 'shapes',
      value: true,
    },
    {
      description: 'Minify styles and remove unused styles based on usage',
      id: 'minifyStyles',
      category: 'styles',
      value: true,
    },
    {
      description: 'Minify colours to smaller strings',
      id: 'convertColors',
      category: 'styles',
      value: true,
    },
    // {
    //   description: 'Inline styles',
    //   getConfig: (value) => ({ inlineStyles: value }),
    //   category: 'styles'
    //   value: false
    // },
    {
      description: 'Convert style to attributes',
      id: 'convertStyleToAttrs',
      category: 'styles',
      value: true,
    },
    {
      description: 'Remove unused IDs and minifies used IDs',
      id: 'cleanupIDs',
      category: 'styles',
      value: true,
    },
    {
      description: 'Sort attributes',
      id: 'sortAttrs',
      category: 'pretty code',
      value: true,
    },
    {
      description: 'Sort children of <defs> to improve compression',
      id: 'sortDefsChildren',
      category: 'pretty code',
      value: true,
    },
    {
      description: 'Cleanup attributes from newlines, trailing and repeating spaces',
      id: 'cleanupAttrs',
      category: 'pretty code',
      value: true,
    },
    // {
    //   getConfig: (value) => ({ prefixIds: value }),
    //   description: 'Prefix IDs',
    //   category: 'pretty code'
    // },
    {
      description: 'Prefer attributes on parent group instead of individual elements',
      id: 'moveElemsAttrsToGroup',
      // getConfig: value =>
      //   ({
      //     [value ? 'moveElemsAttrsToGroup' : 'moveGroupAttrsToElems']: true,
      //   } as unknown),
      category: 'pretty code',
      value: true,
    },
    {
      description: 'Cleanup enable-background',
      id: 'cleanupEnableBackground',
      category: 'other',
      value: true,
    },
    {
      description: 'Collapse useless groups',
      id: 'collapseGroups',
      category: 'other',
      value: true,
    },
    {
      description: 'Merge multiple paths into one',
      id: 'mergePaths',
      category: 'other',
      value: true,
    },
    {
      description: 'Replace duplicate elements with <use> elements',
      id: 'reusePaths',
      category: 'other',
      value: true,
    },
    // {
    //   getConfig: (value) => ({ addClassesToSVGElement: value }),
    //   description: 'Add classes to <svg> element',
    //   category: 'other'
    //   value: []
    // },
    // {
    //   getConfig: (value) => ({ addAttributesToSVGElement: value }),
    //   description: 'Add attributes to an outer <svg> element',
    //   category: 'other'
    //   value: []
    // },
  ],
}
