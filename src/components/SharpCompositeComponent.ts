import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpCompositeComponent
let compositeComponent = OAIBaseComponent
  .create(NS_OMNI, 'composite')
  .fromScratch()
  .set('title', 'Composite Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Composite image(s) over the processed image using various options.')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Composite image(s) over the processed image with options for blending, placement, tiling, and more.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-composite',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  compositeComponent
  .addInput(
    compositeComponent.createInput('images', 'array', 'imageArray')
      .set('description', 'Images to be processed')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('compositeImages', 'array', 'imageArray')
      .set('description', 'Images to be composited')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('blend', 'string')
      .set('description', 'How to blend this image with the image below.')
      .setDefault('clear')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('gravity', 'string')
      .set('description', 'Gravity at which to place the overlay.')
      .setDefault('northeast')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('top', 'number')
      .set('description', 'The pixel offset from the top edge.')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('left', 'number')
      .set('description', 'The pixel offset from the left edge.')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('tile', 'boolean')
      .set('description', 'Set to true to repeat the overlay image across the entire image with the given gravity.')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('premultiplied', 'boolean')
      .set('description', 'Set to true to avoid premultiplying the image below.')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('density', 'number')
      .set('description', 'Number representing the DPI for vector overlay image.')
      .setDefault(72)
      .setConstraints(1, 600, 1)
      .toOmniIO()
  )
  .addOutput(
    compositeComponent.createOutput('images', 'array', 'imageArray')
      .set('description', 'The processed images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images && payload.compositeImages) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
      let compositeImages = await Promise.all(payload.compositeImages.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
      let results = await Promise.all(images.map(async (image: any, index: number) => {
        image.data = await sharp(image.data).composite(compositeImages.map((compositeImage: any) => ({
          input: compositeImage.data,
          blend: payload.blend,
          gravity: payload.gravity,
          top: payload.top,
          left: payload.left,
          tile: payload.tile,
          premultiplied: payload.premultiplied,
          density: payload.density
        }))).toBuffer()
        return image
      }))
      results = await writeToCdn(ctx, results)
      return { images: results }
    }
    return {}
  })
const SharpCompositeComponent = compositeComponent.toJSON()

export default SharpCompositeComponent;
