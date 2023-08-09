import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpRotationComponent
const component = OAIBaseComponent
  .create(NS_OMNI, "rotate")
  .fromScratch()
  .set('description', 'Rotate an image using the high speed impage manipulation library Sharp for nodejs')
  .set('title', 'Rotate Image (Sharp)')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Rotate an image using the high speed impage manipulation library Sharp for nodejs',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#rotate',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  });
component
  .addInput(
    component.createInput('images', 'object', 'imageArray')
      .set('description', 'The image(s) to rotate')
      .setRequired(true)
      .setControl({
        controlType: 'AlpineLabelComponent' 
      })
      .toOmniIO()
  )
  .addInput(
    component.createInput('angle', 'number')
      .set('description', 'The angle of rotation. (optional, default 0)')
      .setDefault(0)
      .setConstraints(-360, 360, 1)
      .setControl({
        controlType: 'AlpineNumWithSliderComponent' 
      })
      .toOmniIO()
  )
  .addInput(
    component.createInput('background', 'string')
      .set('description', 'Background colour when using a non-zero angle. (optional, default black)')
      .setDefault('black')
      .setControl({
        controlType: 'AlpineColorComponent' 
      })
      .toOmniIO()
  )
  .addOutput(
    component.createOutput('images', 'object', 'imageArray')
      .set('description', 'The rotated images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) =>{
        return ctx.app.cdn.get(image.ticket)
      }))
      let background = payload.background || 'black'
      let angle = payload.angle || 90
      let results = await Promise.all(images.map(async (image: any) => {
        let buffer = image.data
        let sharpImage = sharp(buffer)
        sharpImage.rotate(angle, { background: background })
        let result = await sharpImage.toBuffer()
        image.data = result
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return {images: payload.images}
  })
const SharpRotateComponent = component.toJSON()
export default SharpRotateComponent
