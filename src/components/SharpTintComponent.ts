import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpTintComponent
let tintComponent = OAIBaseComponent
  .create(NS_OMNI, 'tint')
  .fromScratch()
  .set('title', 'Tint Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Tints an image')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Tints an image via provided RGB values',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#tint',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  tintComponent
  .addInput(
    tintComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to blur')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    tintComponent.createInput('red', 'number')
      .set('description', 'Tint the red channel')
      .setDefault(0)
      .setConstraints(0, 255, 1)
      .toOmniIO()
  )
  .addInput(
    tintComponent.createInput('green', 'number')
      .set('description', 'Tint the green channel')
      .setDefault(0)
      .setConstraints(0, 255, 1)
      .toOmniIO()
  )
  .addInput(
    tintComponent.createInput('blue', 'number')
      .set('description', 'Tint the blue channel')
      .setDefault(0)
      .setConstraints(0, 255, 1)
      .toOmniIO()
  )
  .addOutput(
    tintComponent.createOutput('images', 'object', 'imageArray')
      .set('description', 'The tinted images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
  const tint = {
    r: parseInt(payload.red),
    g: parseInt(payload.green),
    b: parseInt(payload.blue)
  }

  let results = await Promise.all(images.map(async (image: any) => {
    image.data = await sharp(image.data).tint(tint).toBuffer()
    return image
  }))

  payload.images = await writeToCdn(ctx, results, { tint })
}

return { images: payload.images }

  })
const SharpTintComponent = tintComponent.toJSON()
export default SharpTintComponent
