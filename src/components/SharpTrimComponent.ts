import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpTrimComponent
let trimComponent = OAIBaseComponent.create(NS_OMNI, 'trim')
  .fromScratch()
  .set('title', 'Trim Image (Sharp)')
  .set('description', 'Trim pixels from all edges that contain values similar to the given background colour.')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Trim pixels from all edges that contain values similar to the given background colour, which defaults to that of the top-left pixel. Images with an alpha channel will use the combined bounding box of alpha and non-alpha channels.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#trim',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  trimComponent
  .addInput(
    trimComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to operate on')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    trimComponent.createInput('trimMode', 'string')
      .set('title', 'Trim Mode')
      .setDefault('Top left Pixel')
      .set('description', 'Specify the mode for trimming: Top left pixel or Background color.')
      .toOmniIO()
  )
  .addInput(
    trimComponent.createInput('background', 'string')
      .set('title', 'Background')
      .setDefault('#000000')
      .set('description', "Background colour to trim, used when trim mode is 'Background color'.")
      .toOmniIO()
  )
  .addInput(
    trimComponent.createInput('threshold', 'number')
      .set('title', 'Threshold')
      .setDefault(10)
      .set('description', 'The allowed difference from the above colour, a positive number.')
      .toOmniIO()
  )
  .addOutput(
    trimComponent.createOutput('images', 'object', 'imageArray')
      .set('title', 'Images')
      .set('description', 'The processed images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
  let results = await Promise.all(images.map(async (image: any) => {
    if (payload.trimMode === 'Background color') {
      image.data = await sharp(image.data).trim({ background: payload.background, threshold: payload.threshold }).toBuffer()
    } else {
      image.data = await sharp(image.data).trim(payload.threshold).toBuffer()
    }
    return image
  }))

  payload.images = await writeToCdn(ctx, results)
}
return { images: payload.images }

  })
const SharpTrimComponent = trimComponent.toJSON()
export default SharpTrimComponent
