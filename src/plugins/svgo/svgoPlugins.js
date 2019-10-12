import removeDoctype from 'svgo/plugins/removeDoctype'
import removeXMLProcInst from 'svgo/plugins/removeXMLProcInst'
import removeComments from 'svgo/plugins/removeComments'
import removeMetadata from 'svgo/plugins/removeMetadata'
import removeXMLNS from 'svgo/plugins/removeXMLNS'
import removeEditorsNSData from 'svgo/plugins/removeEditorsNSData'
import cleanupAttrs from 'svgo/plugins/cleanupAttrs'
import inlineStyles from 'svgo/plugins/inlineStyles'
import minifyStyles from 'svgo/plugins/minifyStyles'
import convertStyleToAttrs from 'svgo/plugins/convertStyleToAttrs'
import cleanupIDs from 'svgo/plugins/cleanupIDs'
import removeRasterImages from 'svgo/plugins/removeRasterImages'
import removeUselessDefs from 'svgo/plugins/removeUselessDefs'
import cleanupNumericValues from 'svgo/plugins/cleanupNumericValues'
import cleanupListOfValues from 'svgo/plugins/cleanupListOfValues'
import convertColors from 'svgo/plugins/convertColors'
import removeUnknownsAndDefaults from 'svgo/plugins/removeUnknownsAndDefaults'
import removeNonInheritableGroupAttrs from 'svgo/plugins/removeNonInheritableGroupAttrs'
import removeUselessStrokeAndFill from 'svgo/plugins/removeUselessStrokeAndFill'
import removeViewBox from 'svgo/plugins/removeViewBox'
import cleanupEnableBackground from 'svgo/plugins/cleanupEnableBackground'
import removeHiddenElems from 'svgo/plugins/removeHiddenElems'
import removeEmptyText from 'svgo/plugins/removeEmptyText'
import convertShapeToPath from 'svgo/plugins/convertShapeToPath'
import moveElemsAttrsToGroup from 'svgo/plugins/moveElemsAttrsToGroup'
import moveGroupAttrsToElems from 'svgo/plugins/moveGroupAttrsToElems'
import collapseGroups from 'svgo/plugins/collapseGroups'
import convertPathData from 'svgo/plugins/convertPathData'
import convertTransform from 'svgo/plugins/convertTransform'
import convertEllipseToCircle from 'svgo/plugins/convertEllipseToCircle'
import removeEmptyAttrs from 'svgo/plugins/removeEmptyAttrs'
import removeEmptyContainers from 'svgo/plugins/removeEmptyContainers'
import mergePaths from 'svgo/plugins/mergePaths'
import removeUnusedNS from 'svgo/plugins/removeUnusedNS'
import reusePaths from 'svgo/plugins/reusePaths'
import sortAttrs from 'svgo/plugins/sortAttrs'
import sortDefsChildren from 'svgo/plugins/sortDefsChildren'
import removeTitle from 'svgo/plugins/removeTitle'
import removeDesc from 'svgo/plugins/removeDesc'
import removeDimensions from 'svgo/plugins/removeDimensions'
import removeStyleElement from 'svgo/plugins/removeStyleElement'
import removeScriptElement from 'svgo/plugins/removeScriptElement'

export const plugins = {
  removeDoctype,
  removeXMLProcInst,
  removeComments,
  removeMetadata,
  removeXMLNS,
  removeEditorsNSData,
  cleanupAttrs,
  inlineStyles,
  minifyStyles,
  convertStyleToAttrs,
  cleanupIDs,
  removeRasterImages,
  removeUselessDefs,
  cleanupNumericValues,
  cleanupListOfValues,
  convertColors,
  removeUnknownsAndDefaults,
  removeNonInheritableGroupAttrs,
  removeUselessStrokeAndFill,
  removeViewBox,
  cleanupEnableBackground,
  removeHiddenElems,
  removeEmptyText,
  convertShapeToPath,
  moveElemsAttrsToGroup,
  moveGroupAttrsToElems,
  collapseGroups,
  convertPathData,
  convertTransform,
  convertEllipseToCircle,
  removeEmptyAttrs,
  removeEmptyContainers,
  mergePaths,
  removeUnusedNS,
  reusePaths,
  sortAttrs,
  sortDefsChildren,
  removeTitle,
  removeDesc,
  removeDimensions,
  removeStyleElement,
  removeScriptElement,
}
