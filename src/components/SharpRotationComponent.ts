import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpRotationComponent
let rotateComponent = OAIBaseComponent
  .create(NS_OMNI, 'rotate')
  .fromScratch()
  .set('title', 'Rotate Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Rotates an image')
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
  })
  rotateComponent
  .addInput(
    rotateComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to rotate')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    rotateComponent.createInput('angle', 'number')
      .set('title', 'Angle')
      .set('description', 'The angle of rotation. (optional, default 0)')
      .setDefault(0)
      .setConstraints(-360, 360, 1)
      .toOmniIO()
  )
  .addInput(
    rotateComponent.createInput('background', 'string', 'text')
      .set('title', 'Background')
      .set('description', 'Background colour when using a non-zero angle. (optional, default black)')
      .setDefault('black')
      .toOmniIO()
  )
  .addOutput(
    rotateComponent.createOutput('images', 'object', 'imageArray')
      .set('title', 'Images')
      .set('description', 'The rotated images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
  let background = payload.background || 'black'
  let angle = payload.angle || 0

  let results = await Promise.all(images.map(async (image: any) => {
    let buffer = image.data
    let sharpImage = sharp(buffer)
    sharpImage.rotate(angle, { background })
    let result = await sharpImage.toBuffer()
    image.data = result
    return image
  }))

  payload.images = await writeToCdn(ctx, results)
}

return { images: payload.images }

  })
const SharpRotationComponent = rotateComponent.toJSON()
export default SharpRotationComponent
