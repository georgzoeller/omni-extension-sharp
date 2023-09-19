import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'omni-sockets'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpGrayscaleComponent
let grayScaleComponent = OAIBaseComponent
  .create(NS_OMNI, 'grayscale')
  .fromScratch()
  .set('title', 'Grayscale Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Convert an image to 8-bit, 256 color grayscale')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: "Convert to 8-bit greyscale; 256 shades of grey. This is a linear operation. If the input image is in a non-linear colour space such as sRGB, use gamma() with greyscale() for the best results. By default the output image will be web-friendly sRGB and contain three (identical) color channels. This may be overridden by other sharp operations such as toColourspace('b-w'), which will produce an output image containing one color channel. An alpha channel may be present, and will be unchanged by the operation.",
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#grayscale',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  grayScaleComponent
  .addInput(
    grayScaleComponent.createInput('images', 'object', 'image', {array: true})
      .set('title', 'Image')
      .set('description', 'The image(s) to grayscale')
      .setRequired(true)
      .allowMultiple(true)
      .toOmniIO()
  )
  .addInput(
    grayScaleComponent.createInput('grayscale', 'boolean')
      .set('title', 'Grayscale')
      .set('description', 'Grayscale the Image')
      .setDefault(true)
      .toOmniIO()
  )
  .addOutput(
    grayScaleComponent.createOutput('images', 'object', 'image', {array: true})
      .set('title', 'Images')
      .set('description', 'The grayscaled images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
  let results = await Promise.all(images.map(async (image: any) => {
    if (payload.grayscale) {
      image.data = await sharp(image.data).grayscale(true).toBuffer()
    }
    return image
  }))

  payload.images = await writeToCdn(ctx, results, { grayscale: payload.grayscale })
}
return payload

  })
const SharpGrayscaleComponent = grayScaleComponent.toJSON()
export default SharpGrayscaleComponent
