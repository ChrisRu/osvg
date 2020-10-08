export interface ISetting {
  description: string
  id: string
  category: string
  value: number | boolean
}

export interface ISettings {
  plugins: ISetting[]
  precision: number
  prettify: boolean
}

export const defaultSettings: ISettings = {
  precision: 3,
  prettify: false,
  plugins: [
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
    {
      description: 'Prefer attributes on parent group instead of individual elements',
      id: 'moveElemsAttrsToGroup',
      category: 'pretty code',
      value: true,
    },
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
      description: 'Remove XMLNS (used for inline <svg>)',
      id: 'removeXMLNS',
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove comments',
      id: 'removeComments',
      category: 'stripping',
      value: true,
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
      description: 'Remove empty <text> elements',
      id: 'removeEmptyText',
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
      category: 'stripping',
      value: false,
    },
    {
      description: 'Remove unused namespaces declaration',
      id: 'removeUnusedNS',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Cleanup enable-background',
      id: 'cleanupEnableBackground',
      category: 'stripping',
      value: true,
    },
    {
      description: 'Collapse useless groups',
      id: 'collapseGroups',
      category: 'stripping',
      value: true,
    },
    {
      description: "Round numeric values to the fixed precision (removes default 'px' units)",
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
      description: 'Replace duplicate elements with <use> elements',
      id: 'reusePaths',
      category: 'rounding',
      value: false,
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
      description: 'Merge multiple paths into one',
      id: 'mergePaths',
      category: 'shapes',
      value: false,
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
  ],
}
