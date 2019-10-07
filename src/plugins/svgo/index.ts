import svgo from './svgo.js'
import { SVGO } from './types'

const svgoModule = (svgo.svgo as unknown) as SVGO

export default svgoModule
