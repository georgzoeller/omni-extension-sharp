import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpRemoveAlphaComponent
let removeAlphaComponent = OAIBaseComponent
  .create(NS_OMNI, 'removeAlpha')
  .fromScratch()
  .set('title', 'Remove Alpha (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Remove alpha channel from an image, if any. This is a no-op if the image does not have an alpha channel.')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Remove alpha channel from an image, if any. This is a no-op if the image does not have an alpha channel.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-channel#removeAlpha',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  removeAlphaComponent
  .addInput(
    removeAlphaComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to operate on')
      .setRequired(true)
      .toOmniIO()
  )

  let controlComposer = removeAlphaComponent.createControl('images')
  controlComposer
    .setRequired(true)
    .setControlType('AlpineLabelComponent')
  
  removeAlphaComponent.addControl(controlComposer.toOmniControl())

  removeAlphaComponent.setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image: any) => {
      return ctx.app.cdn.get(image.ticket)
    }))
let results = await Promise.all(images.map(async (image: any) => {
  image.data = await sharp(image.data).removeAlpha().toBuffer()
  return image
}))

payload.images = await writeToCdn(ctx, results)

  }
  return { images: payload.images }
})
const SharpRemoveAlphaComponent = removeAlphaComponent.toJSON()
export default SharpRemoveAlphaComponent
