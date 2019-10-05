export const plugins = {
  Stripping: [
    {
      name: 'Remove doctype declaration',
      id: 'removeDoctype',
      default: true,
    },
    {
      name: 'Remove XML processing instructions',
      id: 'removeXMLProcInst',
      default: true,
    },
    {
      name: 'Remove comments',
      id: 'removeComments',
      default: true,
    },
    {
      name: 'Remove XMLNS (used for inline <svg>)',
      id: 'removeXMLNS',
      default: false,
    },
    {
      name: 'Remove editor namespaces, elements and attributes',
      id: 'removeEditorsNSData',
      default: true,
    },
    {
      name: 'Remove raster images',
      id: 'removeRasterImages',
      default: false,
    },
    {
      name: 'Remove elements in <defs> without an id',
      id: 'removeUselessDefs',
      default: true,
    },
    {
      name: "Remove unknown elements' content and attributes",
      id: 'removeUnknownsAndDefaults',
      default: true,
    },
    {
      name: "Remove non-inheritable group's presentational attributes",
      id: 'removeNonInheritableGroupAttrs',
      default: true,
    },
    {
      name: 'Remove useless stroke and fill attributes',
      id: 'removeUselessStrokeAndFill',
      default: true,
    },
    {
      name: 'Remove hidden elements (zero sized or with absent attributes)',
      id: 'removeHiddenElems',
      default: true,
    },
    {
      name: 'Remove empty <text> elements',
      id: 'removeEmptyText',
      default: true,
    },
    {
      name: 'Remove empty attributes',
      id: 'removeEmptyAttrs',
      default: true,
    },
    {
      name: 'Remove empty container elements',
      id: 'removeEmptyContainers',
      default: true,
    },
    {
      name: 'Remove <style> elements',
      id: 'removeStyleElement',
      default: false,
    },
    {
      name: 'Remove <script> elements',
      id: 'removeScriptElement',
      default: false,
    },
    {
      name: 'Remove <title> element',
      id: 'removeTitle',
      default: false,
    },
    {
      name: 'Remove <desc> element',
      id: 'removeDesc',
      default: false,
    },
    {
      name: 'Remove <metadata> element',
      id: 'removeMetadata',
      default: true,
    },
    {
      name: 'Remove width and height attributes in presence of viewbox',
      id: 'removeDimensions',
      default: false,
      invert: 'removeViewBox',
    },
    {
      name: 'Remove viewbox attribute when possible',
      id: 'removeViewBox',
      default: false,
      invert: 'removeDimensions',
    },
    {
      name: 'Remove unused namespaces declaration',
      id: 'removeUnusedNS',
      default: true,
    },
    // {
    //   id: 'removeAttributesBySelector',
    //   name: 'Remove attributes of elements that match a CSS selector',
    // },
    // {
    //   id: 'removeElementsByAttr',
    //   name: 'Remove arbitrary elements by ID or className',
    // },
    // {
    //   id: 'removeOffCanvasPaths',
    //   name: 'Remove elements that are drawn outside of the viewbox',
    // },
  ],
  Rouding: [
    {
      name: "Round numeric values to the fixed precision, removes default 'px' units",
      id: 'cleanupNumericValues',
      default: true,
    },
    {
      name: 'Round lists of values to the fixed precision',
      id: 'cleanupListOfValues',
      default: true,
    },
    {
      name: 'Optimize path data by writing in shorter form with transformations',
      id: 'convertPathData',
      default: true,
    },
    {
      name: 'Collapse multiple transformations and optimize them',
      id: 'convertTransform',
      default: true,
    },
  ],
  Shapes: [
    {
      name: 'Convert non-eccentric <ellipse> elements to <circle> elements',
      id: 'convertEllipseToCircle',
      default: true,
    },
    {
      name: 'Convert basic shapes to more compact path form',
      id: 'convertShapeToPath',
      default: true,
    },
  ],
  Styles: [
    {
      name: 'Minify styles and remove unused styles based on usage',
      id: 'minifyStyles',
      default: true,
    },
    {
      name: 'Minify colours to smaller strings',
      id: 'convertColors',
      default: true,
    },
    // Has additional options
    // {
    //   name: 'Inline styles',
    //   id: 'inlineStyles',
    //   default: true,
    // },
    {
      name: 'Convert style to attributes',
      id: 'convertStyleToAttrs',
      default: false,
    },
    {
      name: 'Remove unused IDs and minifies used IDs',
      id: 'cleanupIDs',
      default: false,
    },
  ],
  'Pretty Code': [
    {
      name: 'Sort attributes',
      id: 'sortAttrs',
      default: false,
      // Has additional options
    },
    {
      name: 'Sort children of <defs> to improve compression',
      id: 'sortDefsChildren',
      default: true,
    },
  ],
  Other: [
    {
      name: 'Clean up enable-background',
      id: 'cleanupEnableBackground',
      default: true,
    },
    {
      name: 'Cleanup attributes from newlines, trailing and repeating spaces',
      id: 'cleanupAttrs',
      default: true,
    },
    // {
    //   id: 'prefixIds',
    //   name: 'Prefix IDs',
    //   default: false,
    // },
    {
      id: 'moveElemsAttrsToGroup',
      name: 'Move attrs to parent group',
      default: true,
      invert: 'moveGroupAttrsToElems',
    },
    {
      id: 'moveGroupAttrsToElems',
      name: 'Move group attributes to elements',
      default: false,
      invert: 'moveElemsAttrsToGroup',
    },
    {
      id: 'collapseGroups',
      name: 'Collapse useless groups',
      default: true,
    },
    {
      id: 'mergePaths',
      name: 'Merge multiple paths into one',
      default: true,
    },
    {
      id: 'reusePaths',
      name: 'Replace duplicate elements with <use> elements',
      default: true,
    },
    // {
    //   id: 'addClassesToSVGElement',
    //   name: 'Add classes to <svg> element',
    // },
    // {
    //   id: 'addAttributesToSVGElement',
    //   name: 'Add attributes to an outer <svg> element',
    // },
  ],
}
