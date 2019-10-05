export const plugins = {
  Stripping: [
    {
      name: 'Remove doctype',
      id: 'removeDoctype',
      default: true,
    },
    {
      name: 'Remove XML instructions',
      id: 'removeXMLProcInst',
      default: true,
    },
    {
      name: 'Remove comments',
      id: 'removeComments',
      default: true,
    },
    {
      name: 'Remove xmlns',
      id: 'removeXMLNS',
      default: false,
    },
    {
      name: 'Remove editor data',
      id: 'removeEditorsNSData',
      default: true,
    },
    {
      name: 'Remove raster images',
      id: 'removeRasterImages',
      default: false,
    },
    {
      name: 'Remove unused defs',
      id: 'removeUselessDefs',
      default: true,
    },
    {
      name: 'Remove unknowns & defaults',
      id: 'removeUnknownsAndDefaults',
      default: true,
    },
    {
      name: 'Remove unneeded group attrs',
      id: 'removeNonInheritableGroupAttrs',
      default: true,
    },
    {
      name: 'Remove useless stroke & fill',
      id: 'removeUselessStrokeAndFill',
      default: true,
    },
    {
      name: 'Remove viewBox',
      id: 'removeViewBox',
      default: false,
    },
    {
      name: 'Remove hidden elements',
      id: 'removeHiddenElems',
      default: true,
    },
    {
      name: 'Remove empty text',
      id: 'removeEmptyText',
      default: true,
    },
    {
      name: 'Remove empty attrs',
      id: 'removeEmptyAttrs',
      default: true,
    },
    {
      name: 'Remove empty containers',
      id: 'removeEmptyContainers',
      default: true,
    },
    {
      name: 'Remove style elements',
      id: 'removeStyleElement',
      default: false,
    },
    {
      name: 'Remove script elements',
      id: 'removeScriptElement',
      default: false,
    },
    {
      name: 'Remove <title>',
      id: 'removeTitle',
      default: false,
    },
    {
      name: 'Remove <desc>',
      id: 'removeDesc',
      default: false,
    },
    {
      name: 'Remove <metadata>',
      id: 'removeMetadata',
      default: true,
    },
    {
      name: 'Remove width/height',
      id: 'removeDimensions',
      default: false,
    },
    {
      name: 'Remove unused namespaces',
      id: 'removeUnusedNS',
      default: true,
    },
    // {
    //   id: 'removeAttributesBySelector',
    //   name: 'Remove attributes by selector',
    // },
    // {
    //   id: 'removeElementsByAttr',
    //   name: 'Remove elements by attr',
    // },
    // {
    //   id: 'removeOffCanvasPaths',
    //   name: 'Remove off-canvas paths',
    // },
  ],
  Rouding: [
    {
      name: 'Round/rewrite numbers',
      id: 'cleanupNumericValues',
      default: true,
    },
    {
      name: 'Round/rewrite number lists',
      id: 'cleanupListOfValues',
      default: true,
    },
    {
      name: 'Round/rewrite paths',
      id: 'convertPathData',
      default: true,
    },
    {
      name: 'Round/rewrite transforms',
      id: 'convertTransform',
      default: true,
    },
  ],
  Shapes: [
    {
      name: 'Convert non-eccentric <ellipse> to <circle>',
      id: 'convertEllipseToCircle',
      default: true,
    },
    {
      name: 'Shapes to (smaller) paths',
      id: 'convertShapeToPath',
      default: true,
    },
  ],
  Styles: [
    {
      name: 'Minify styles',
      id: 'minifyStyles',
      default: true,
    },
    {
      name: 'Minify colours',
      id: 'convertColors',
      default: true,
    },
    {
      name: 'Inline styles',
      id: 'inlineStyles',
      default: true,
    },
    {
      name: 'Style to attributes',
      id: 'convertStyleToAttrs',
      default: false,
    },
    {
      name: 'Clean IDs',
      id: 'cleanupIDs',
      default: false,
    },
  ],
  'Pretty Code': [
    {
      name: 'Sort attrs',
      id: 'sortAttrs',
      default: true,
    },
    {
      name: 'Sort children of <defs>',
      id: 'sortDefsChildren',
      default: true,
    },
  ],
  Other: [
    {
      id: 'cleanupEnableBackground',
      name: 'Clean up enable-background',
      default: true,
    },
    {
      id: 'cleanupAttrs',
      name: 'Cleanup attribute whitespace',
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
    },
    {
      id: 'moveGroupAttrsToElems',
      name: 'Move group attrs to elements',
      default: false,
    },
    {
      id: 'collapseGroups',
      name: 'Collapse useless groups',
      default: true,
    },
    {
      id: 'mergePaths',
      name: 'Merge paths',
      default: true,
    },
    {
      id: 'reusePaths',
      name: 'Replace duplicate elements with links',
      default: true,
    },
    // {
    //   id: 'addClassesToSVGElement',
    //   name: 'Add classes to SVG element',
    // },
    // {
    //   id: 'addAttributesToSVGElement',
    //   name: 'Add attributes to SVG element',
    // },
  ],
}
