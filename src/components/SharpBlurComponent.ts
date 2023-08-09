import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpBlurComponent
let blurComponent = OAIBaseComponent.create(NS_OMNI, 'blur')
  .fromScratch()
  .set('title', 'Blur Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Blurs an image')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Blurs an image, optionally using a sigmal value via Gaussian Blur',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#blur',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  blurComponent
  .addInput(
    blurComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to blur')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    blurComponent.createInput('sigma', 'number')
      .set('description', 'The sigma value for Gaussian BLur, 0 for fast blur, 0.3-1000 for Gaussian Blur Sigma')
      .setDefault(0)
      .setConstraints(0, 1000)
      .toOmniIO()
  )
  .addOutput(
    blurComponent.createOutput('images', 'object', 'imageArray')
      .set('title', 'Images')
      .set('description', 'The blurred images')
      .toOmniIO()
  )
  blurComponent.setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image: any) => {
      return ctx.app.cdn.get(image.ticket)
    }))
let results = await Promise.all(images.map(async (image: any) => {
  let buffer = image.data
  let sharpImage = sharp(buffer)

  if (payload.sigma === 0) {
    sharpImage.blur()
  }

  if (payload.sigma > 0) {
    let sigma = Math.max(0.3, Math.min(1e3, payload.sigma))
    sharpImage.blur(sigma)
  }

  let result = await sharpImage.toBuffer()
  image.data = result
  return image
}))

payload.images = await writeToCdn(ctx, results)

  }
  return { images: payload.images }
})
const SharpBlurComponent = blurComponent.toJSON()
export default SharpBlurComponent
