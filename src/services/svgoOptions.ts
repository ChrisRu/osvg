export interface IPlugin {
  description: string
  id: string
  default: boolean
}

export const plugins = {
  Stripping: [
    {
      description: 'Remove doctype declaration',
      id: 'removeDoctype',
      default: true,
    },
    {
      description: 'Remove XML processing instructions',
      id: 'removeXMLProcInst',
      default: true,
    },
    {
      description: 'Remove comments',
      id: 'removeComments',
      default: true,
    },
    {
      description: 'Remove XMLNS (used for inline <svg>)',
      id: 'removeXMLNS',
      default: false,
    },
    {
      description: 'Remove editor namespaces, elements and attributes',
      id: 'removeEditorsNSData',
      default: true,
    },
    {
      description: 'Remove raster images',
      id: 'removeRasterImages',
      default: false,
    },
    {
      description: 'Remove elements in <defs> without an id',
      id: 'removeUselessDefs',
      default: true,
    },
    {
      description: "Remove unknown elements' content and attributes",
      id: 'removeUnknownsAndDefaults',
      default: true,
    },
    {
      description: "Remove non-inheritable group's presentational attributes",
      id: 'removeNonInheritableGroupAttrs',
      default: true,
    },
    {
      description: 'Remove useless stroke and fill attributes',
      id: 'removeUselessStrokeAndFill',
      default: true,
    },
    {
      description: 'Remove hidden elements (zero sized or with absent attributes)',
      id: 'removeHiddenElems',
      default: true,
    },
    {
      description: 'Remove empty <text> elements',
      id: 'removeEmptyText',
      default: true,
    },
    {
      description: 'Remove empty attributes',
      id: 'removeEmptyAttrs',
      default: true,
    },
    {
      description: 'Remove empty container elements',
      id: 'removeEmptyContainers',
      default: true,
    },
    {
      description: 'Remove <style> elements',
      id: 'removeStyleElement',
      default: false,
    },
    {
      description: 'Remove <script> elements',
      id: 'removeScriptElement',
      default: false,
    },
    {
      description: 'Remove <title> element',
      id: 'removeTitle',
      default: false,
    },
    {
      description: 'Remove <desc> element',
      id: 'removeDesc',
      default: false,
    },
    {
      description: 'Remove <metadata> element',
      id: 'removeMetadata',
      default: true,
    },
    {
      description: 'Remove width and height attributes in presence of viewbox',
      id: 'removeDimensions',
      default: false,
      invert: 'removeViewBox',
    },
    {
      description: 'Remove viewbox attribute when possible',
      id: 'removeViewBox',
      default: false,
      invert: 'removeDimensions',
    },
    {
      description: 'Remove unused namespaces declaration',
      id: 'removeUnusedNS',
      default: true,
    },
    // {
    //   id: 'removeAttributesBySelector',
    //   description: 'Remove attributes of elements that match a CSS selector',
    // },
    // {
    //   id: 'removeElementsByAttr',
    //   description: 'Remove arbitrary elements by ID or className',
    // },
    // {
    //   id: 'removeOffCanvasPaths',
    //   description: 'Remove elements that are drawn outside of the viewbox',
    // },
  ],
  Rouding: [
    {
      description: "Round numeric values to the fixed precision, removes default 'px' units",
      id: 'cleanupNumericValues',
      default: true,
    },
    {
      description: 'Round lists of values to the fixed precision',
      id: 'cleanupListOfValues',
      default: true,
    },
    {
      description: 'Optimize path data by writing in shorter form with transformations',
      id: 'convertPathData',
      default: true,
    },
    {
      description: 'Collapse multiple transformations and optimize them',
      id: 'convertTransform',
      default: true,
    },
  ],
  Shapes: [
    {
      description: 'Convert non-eccentric <ellipse> elements to <circle> elements',
      id: 'convertEllipseToCircle',
      default: true,
    },
    {
      description: 'Convert basic shapes to more compact path form',
      id: 'convertShapeToPath',
      default: true,
    },
  ],
  Styles: [
    {
      description: 'Minify styles and remove unused styles based on usage',
      id: 'minifyStyles',
      default: true,
    },
    {
      description: 'Minify colours to smaller strings',
      id: 'convertColors',
      default: true,
    },
    // Has additional options
    // {
    //   description: 'Inline styles',
    //   id: 'inlineStyles',
    //   default: true,
    // },
    {
      description: 'Convert style to attributes',
      id: 'convertStyleToAttrs',
      default: false,
    },
    {
      description: 'Remove unused IDs and minifies used IDs',
      id: 'cleanupIDs',
      default: false,
    },
  ],
  'Pretty Code': [
    {
      description: 'Sort attributes',
      id: 'sortAttrs',
      default: false,
      // Has additional options
    },
    {
      description: 'Sort children of <defs> to improve compression',
      id: 'sortDefsChildren',
      default: true,
    },
  ],
  Other: [
    {
      description: 'Clean up enable-background',
      id: 'cleanupEnableBackground',
      default: true,
    },
    {
      description: 'Cleanup attributes from newlines, trailing and repeating spaces',
      id: 'cleanupAttrs',
      default: true,
    },
    // {
    //   id: 'prefixIds',
    //   description: 'Prefix IDs',
    //   default: false,
    // },
    {
      id: 'moveElemsAttrsToGroup',
      description: 'Move attrs to parent group',
      default: true,
      invert: 'moveGroupAttrsToElems',
    },
    {
      id: 'moveGroupAttrsToElems',
      description: 'Move group attributes to elements',
      default: false,
      invert: 'moveElemsAttrsToGroup',
    },
    {
      id: 'collapseGroups',
      description: 'Collapse useless groups',
      default: true,
    },
    {
      id: 'mergePaths',
      description: 'Merge multiple paths into one',
      default: true,
    },
    {
      id: 'reusePaths',
      description: 'Replace duplicate elements with <use> elements',
      default: true,
    },
    // {
    //   id: 'addClassesToSVGElement',
    //   description: 'Add classes to <svg> element',
    // },
    // {
    //   id: 'addAttributesToSVGElement',
    //   description: 'Add attributes to an outer <svg> element',
    // },
  ],
}
