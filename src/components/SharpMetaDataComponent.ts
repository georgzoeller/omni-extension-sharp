import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpMetaDataComponent
let metadataComponent = OAIBaseComponent.create(NS_OMNI, 'metadata')
  .fromScratch()
  .set('title', 'Get Image Metadata (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Returns the metadata of an image')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Fast access to (uncached) image metadata without decoding any compressed pixel data. This is read from the header of the input image. It does not take into consideration any operations to be applied to the output image, such as resize or rotate.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-input#metadata',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  metadataComponent
  .addInput(
    metadataComponent.createInput('images', 'object', 'image', {array: true})
      .set('title', 'Image')
      .set('description', 'The image(s) to inspect')
      .setRequired(true)
      .allowMultiple(true)
      .toOmniIO()
  )
  .addOutput(
    metadataComponent.createOutput('metadata', 'object', 'objectArray')
      .set('title', 'Metadata')
      .set('description', 'Metadata of the image(s)')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
      let results = await Promise.all(images.map(async (image: any) => {
        let md = await sharp(image.data).metadata()
        return Object.assign({}, image.meta, md || {})
      }))
      payload.metadata = results
    }
    return { metadata: payload.metadata }
  })
const SharpMetaDataComponent = metadataComponent.toJSON()
export default SharpMetaDataComponent
