import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpExtendComponent
let component = OAIBaseComponent
  .create(NS_OMNI, "extend")
  .fromScratch()
  .set('description', 'Extend / pad / extrude one or more edges of the image.')
  .set('title', 'Extend Image (Sharp)')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
component
  .addInput(
    component.createInput('images', 'object', 'image', {array: true})
      .set('description', 'The image(s) to extend')
      .setRequired(true)
      .allowMultiple(true)
      .setControl({
        controlType: 'AlpineLabelComponent'
      })
      .toOmniIO()
  )
  .addInput(
    component.createInput('extendWith', 'string')
      .set('description', 'How to determine the color of the new pixels.')
      .setChoices(['background', 'copy', 'repeat', 'mirror'], 'background')
      .toOmniIO()
  )
  .addInput(
    component.createInput('background', 'string')
      .set('description', 'The color of the new pixels if method "background" was chosen.')
      .setDefault('#000000')
      .setControl({
        controlType: 'AlpineColorComponent'
      })
      .toOmniIO()
  )
  .addInput(
    component.createInput('left', 'integer')
      .set('title', 'Left')
      .setDefault(0)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    component.createInput('top', 'integer')
      .set('title', 'Top')
      .setDefault(0)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    component.createInput('bottom', 'integer')
      .set('title', 'Bottom')
      .setDefault(0)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    component.createInput('right', 'integer')
      .set('title', 'Right')
      .setDefault(0)
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
        const { left, right, top, bottom, extendWith, background } = payload
        image.data = await sharp(image.data).extend({left,right, top, bottom, extendWith, background}).toBuffer()
        image.meta.width += left + right
        image.meta.height += top + bottom
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return payload
  })
const SharpExtendComponent = component.toJSON()
export default SharpExtendComponent
