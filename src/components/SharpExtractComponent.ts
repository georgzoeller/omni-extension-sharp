import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

//  SharpExtractComponent
let extractComponent = OAIBaseComponent
  .create(NS_OMNI, 'extract')
  .fromScratch()
  .set('title', 'Extract Image Region (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Extracts/Crops an image region')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Extract/crop a region of the image. Use extract before resize for pre-resize extraction. Use extract after resize for post-resize extraction. Use extract before and after for both.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#extract',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  extractComponent
  .addInput(
    extractComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to extract from')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    extractComponent.createInput('left', 'number')
      .set('title', 'Left')
      .setDefault(0)
      .set('minimum', 0)
      .toOmniIO()
  )
  .addInput(
    extractComponent.createInput('top', 'number')
      .set('title', 'Top')
      .setDefault(0)
      .set('minimum', 0)
      .toOmniIO()
  )
  .addInput(
    extractComponent.createInput('width', 'number')
      .set('title', 'Width')
      .setDefault(512)
      .set('minimum', 0)
      .toOmniIO()
  )
  .addInput(
    extractComponent.createInput('height', 'number')
      .set('title', 'Height')
      .setDefault(512)
      .set('minimum', 0)
      .toOmniIO()
  )
  .addOutput(
    extractComponent.createOutput('images', 'object', 'imageArray')
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
    const { left, top, width, height } = payload
    image.data = await sharp(image.data).extract({ left, top, width, height }).toBuffer()
    return image
  }))

  payload.images = await writeToCdn(ctx, results)
}
return payload

  })
const SharpExtractComponent = extractComponent.toJSON()
export default SharpExtractComponent
