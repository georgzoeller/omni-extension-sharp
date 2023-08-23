import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpRemoveAlphaComponent
let component = OAIBaseComponent
  .create(NS_OMNI, 'removeAlpha')
  .fromScratch()
  .set('description', 'Remove alpha channel from an image, if any.')
  .set('title', 'Remove Alpha (Sharp)')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
component
  .addInput(
    component.createInput('images', 'object', 'image', {array: true})
      .set('description', 'The image(s) to operate on')
      .setRequired(true)
      .allowMultiple(true)
      .setControl({
        controlType: 'AlpineLabelComponent'
      })
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
        image.data = await sharp(image.data).removeAlpha().toBuffer()
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return {images: payload.images}
  })
const SharpRemoveAlphaComponent = component.toJSON()
export default SharpRemoveAlphaComponent
