import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpExtractChannelComponent
let extractChannelComponent = OAIBaseComponent
  .create(NS_OMNI, 'extractChannel')
  .fromScratch()
  .set('title', 'Extract Channel (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Extract channels from a multi-channel image.')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Extract channel from a multi-channel image.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-channel#extractchannel',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  extractChannelComponent
  .addInput(
    extractChannelComponent.createInput('images', 'object', 'image', {array: true})
      .set('title', 'Image')
      .set('description', 'The image(s) to operate on')
      .allowMultiple(true)
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    extractChannelComponent.createInput('channel', 'string')
      .set('title', 'Channel')
      .set('description', 'The channel to extract.')
      .setDefault('red')
      .setChoices(['red', 'green', 'blue', 'alpha'])
      .toOmniIO()
  )
  .addOutput(
    extractChannelComponent.createOutput('images', 'object', 'image', {array: true})
      .set('title', 'Images')
      .set('description', 'The processed images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
      let results = await Promise.all(images.map(async (image: any) => {
        image.data = await sharp(image.data).extractChannel(payload.channel).toBuffer()
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return { images: payload.images }
  })
const SharpExtractChannelComponent = extractChannelComponent.toJSON()
export default SharpExtractChannelComponent
