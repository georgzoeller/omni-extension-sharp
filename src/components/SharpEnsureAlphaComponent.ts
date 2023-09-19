import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'omni-sockets'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpEnsureAlphaComponent
let ensureAlphaComponent = OAIBaseComponent
  .create(NS_OMNI, 'ensureAlpha')
  .fromScratch()
  .set('title', 'Ensure Alpha (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Ensure the output image has an alpha transparency channel.')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Ensure the output image has an alpha transparency channel. If missing, the added alpha channel will have the specified transparency level, defaulting to fully-opaque (1). This is a no-op if the image already has an alpha channel.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-channel#ensureAlpha',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  ensureAlphaComponent
  .addInput(
    ensureAlphaComponent.createInput('images', 'object', 'image', {array: true})
      .set('title', 'Image')
      .set('description', 'The image(s) to operate on')
      .setRequired(true)
      .allowMultiple(true)
      .toOmniIO()
  )
  .addInput(
    ensureAlphaComponent.createInput('alpha', 'number')
      .set('title', 'Alpha')
      .set('description', 'Alpha transparency level (0=fully-transparent, 1=fully-opaque).')
      .setDefault(1)
      .setConstraints(0, 1, 0.1)
      .toOmniIO()
  )
  .addOutput(
    ensureAlphaComponent.createOutput('images', 'object', 'image', {array: true})
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
        image.data = await sharp(image.data).ensureAlpha(payload.alpha).toBuffer()
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return { images: payload.images }
  })
const SharpEnsureAlphaComponent = ensureAlphaComponent.toJSON()
export default SharpEnsureAlphaComponent

