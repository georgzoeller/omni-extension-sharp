import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpRotationComponent
const component = OAIBaseComponent
  .create(NS_OMNI, "negate")
  .fromScratch()
  .set('description', 'Negate / Invert an image using the high speed impage manipulation library Sharp for nodejs')
  .set('title', 'Negate/Invert Image (Sharp)')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Negate an image using the high speed impage manipulation library Sharp for nodejs',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#negate',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  });
component
  .addInput(
    component.createInput('images', 'object', 'image', {array: true})
      .set('description', 'The image(s) to rotate')
      .setRequired(true)
      .allowMultiple(true)
      .setControl({
        controlType: 'AlpineLabelComponent'
      })
      .toOmniIO()
  )

  component
  .addInput(
    component.createInput('alpha', 'boolean')
      .set('description', 'Whether to negate alpha')
      .toOmniIO()
  )


  .addOutput(
    component.createOutput('images', 'object', 'image', {array: true})
      .set('description', 'The negated images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) =>{
        return ctx.app.cdn.get(image.ticket)
      }))

      let results = await Promise.all(images.map(async (image: any) => {
        let buffer = image.data
        let sharpImage = sharp(buffer)
        sharpImage.negate({alpha: payload.alpha})
        let result = await sharpImage.toBuffer()
        image.data = result
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return {images: payload.images}
  })
const SharpNegateComponent = component.toJSON()
export default SharpNegateComponent
