import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpExtendComponent
let extendComponent = OAIBaseComponent
  .create(NS_OMNI, 'extend')
  .fromScratch()
  .set('title', 'Extend Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Extend / pad / extrude one or more edges of the image')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Extend / pad / extrude one or more edges of the image with either the provided background colour or pixels derived from the image. This operation will always occur after resizing and extraction, if any.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-resize#extend',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  extendComponent
  .addInput(
    extendComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to extend')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    extendComponent.createInput('extendWith', 'string')
      .set('title', 'Method')
      .set('description', 'How to determine the color of the new pixels.')
      .setChoices(['background', 'copy', 'repeat', 'mirror'], 'background')
      .toOmniIO()
  )
  .addInput(
    extendComponent.createInput('background', 'string', 'text')
      .set('title', 'Background')
      .set('description', 'The color of the new pixels if method "background" was chosen.')
      .setDefault('#000000')
      .toOmniIO()
  )
  .addOutput(
    extendComponent.createOutput('images', 'object', 'imageArray')
      .set('title', 'Images')
      .set('description', 'The processed images')
      .toOmniIO()
  )
  extendComponent.setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image: any) => {
      return ctx.app.cdn.get(image.ticket)
    }))
let results = await Promise.all(images.map(async (image: any) => {
  const { left, right, top, bottom, extendWith, background } = payload
  image.data = await sharp(image.data).extend({ left, right, top, bottom, extendWith, background }).toBuffer()
  image.meta.width += left + right
  image.meta.height += top + bottom
  return image
}))

payload.images = await writeToCdn(ctx, results)

  }
  return payload
})
const SharpExtendComponent = extendComponent.toJSON()
export default SharpExtendComponent
