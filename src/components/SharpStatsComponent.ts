import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'omni-sockets'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpStatsComponent
let statsComponent = OAIBaseComponent
  .create(NS_OMNI, 'stats')
  .fromScratch()
  .set('title', 'Get Image Stats (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Access to pixel-derived image statistics for every channel in the image')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Access to pixel-derived image statistics for every channel in the image',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-input#stats',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  statsComponent
  .addInput(
    statsComponent.createInput('images', 'object', 'image', {array: true})
      .set('title', 'Image')
      .set('description', 'The image(s) to inspect')
      .allowMultiple(true)
      .setRequired(true)
      .toOmniIO()
  )
  .addOutput(
    statsComponent.createOutput('stats', 'object', 'objectArray')
      .set('title', 'Stats')
      .set('description', 'Pixel-derived image statistics for every channel in the image')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
  let results = await Promise.all(images.map(async (image: any) => {
    let md = await sharp(image.data).stats()
    return md
  }))

  payload.stats = results
}
return { stats: payload.stats }

  })
const SharpStatsComponent = statsComponent.toJSON()
export default SharpStatsComponent
