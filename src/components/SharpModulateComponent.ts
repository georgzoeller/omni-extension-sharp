import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'omni-sockets'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpModulateComponent
let modulateComponent = OAIBaseComponent
  .create(NS_OMNI, 'modulate')
  .fromScratch()
  .set('title', 'Modulate Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Transforms the image using brightness, saturation, hue rotation, and lightness')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Transforms the image using brightness, saturation, hue rotation, and lightness. Brightness and lightness both operate on luminance, with the difference being that brightness is multiplicative whereas lightness is additive.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#modulate',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  modulateComponent
  .addInput(
    modulateComponent.createInput('images', 'object', 'image', {array: true})
      .set('title', 'Image')
      .set('description', 'The image(s) to extend')
      .setRequired(true)
      .allowMultiple(true)
      .toOmniIO()
  )
  .addInput(
    modulateComponent.createInput('brightness', 'float')
      .set('title', 'Brightness')
      .set('description', 'The brightness multiplier.')
      .setDefault(1)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    modulateComponent.createInput('saturation', 'float')
      .set('title', 'Saturation')
      .set('description', 'The saturation multiplier.')
      .setDefault(1)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    modulateComponent.createInput('hue', 'float')
      .set('title', 'Hue Rotation')
      .set('description', 'The hue rotation in degrees.')
      .setDefault(0)
      .setConstraints(-360, 360, 1)
      .toOmniIO()
  )
  .addInput(
    modulateComponent.createInput('lightness', 'float')
      .set('title', 'Lightness')
      .set('description', 'The lightness addend.')
      .setDefault(0)
      .setConstraints(0)
      .toOmniIO()
  )
  .addOutput(
    modulateComponent.createOutput('images', 'object', 'image', {array: true})
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
        const args = { ...payload }
        if (args.hue == 0) {
          delete args.hue
        }
        image.data = await sharp(image.data).modulate(args).toBuffer()
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return { images: payload.images }
  })
const SharpModulateComponent = modulateComponent.toJSON()
export default SharpModulateComponent
