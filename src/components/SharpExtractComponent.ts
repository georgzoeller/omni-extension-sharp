import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

//  SharpExtractComponent
let component = OAIBaseComponent
  .create(NS_OMNI, 'extract')
  .fromScratch()
  .set('description', 'Extracts/Crops an image region')
  .set('title', 'Extract Image Region (Sharp)')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Extract/crop a region of the image. Use extract before resize for pre-resize extraction. Use extract after resize for post-resize extraction. Use extract before and after for both.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#extract',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
component
  .addInput(
    component.createInput('images', 'object', 'image', {array: true})
      .set('description', 'The image(s) to extract from')
      .setRequired(true)
      .allowMultiple(true)
      .setControl({
        controlType: 'AlpineLabelComponent'
      })
      .toOmniIO()
  )
  .addInput(
    component.createInput('left', 'number')
      .set('description', 'Left')
      .setDefault(0)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    component.createInput('top', 'number')
      .set('description', 'Top')
      .setDefault(0)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    component.createInput('width', 'number')
      .set('description', 'Width')
      .setDefault(512)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    component.createInput('height', 'number')
      .set('description', 'Height')
      .setDefault(512)
      .setConstraints(0)
      .toOmniIO()
  )
  .addOutput(
    component.createOutput('images', 'object', 'image', {array: true})
      .set('description', 'The processed images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) =>{
        return ctx.app.cdn.get(image.ticket)
      }))
      let results = await Promise.all(images.map(async (image: any) => {
        const { left, top, width, height } = payload
        image.data = await sharp(image.data).extract({left,top, width, height}).toBuffer()
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return {images: payload.images}
  })
const SharpExtractComponent = component.toJSON()
export default SharpExtractComponent
