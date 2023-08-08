import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

const NS_OMNI = 'sharp'

// SharpResizeComponent
let resizeComponent = OAIBaseComponent
    .create(NS_OMNI, 'resize')
    .fromScratch()
    .set('title', 'Resize Image (Sharp)')
    .set('description', 'Resize the image to given width and height using various options.')
    .setMethod('X-CUSTOM')
resizeComponent.
    addInput(
      resizeComponent.createInput('images', 'object', 'imageArray')
          .set('title', 'Input Images')
          .set('description', 'Images to resize.')
          .setRequired(true)
          .toOmniIO()
    )
    .addInput(
        resizeComponent.createInput('width', 'number')
            .set('title', 'Width')
            .setRequired(true)
            .setConstraints(1, 8192)
            .toOmniIO()
    )
    .addInput(
        resizeComponent.createInput('height', 'number')
            .set('title', 'Height')
            .setRequired(true)
            .setConstraints(1, 8192)
            .toOmniIO()
    )
    .addInput(
        resizeComponent.createInput('fit', 'string')
            .set('title', 'Fit')
            .setChoices(['cover', 'contain', 'fill', 'inside', 'outside'], 'cover')
            .set('description', 'How the image should be resized to fit the target dimension(s)')
            .toOmniIO()
    )
    .addInput(
        resizeComponent.createInput('position', 'string')
            .set('title', 'Position')
            .setChoices(['centre', 'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'], 'centre')
            .set('description', 'A position to use when fit is cover or contain.')
            .toOmniIO()
    )
    .addInput(
        resizeComponent.createInput('background', 'string')
            .set('title', 'Background')
            .setDefault('#000000')
            .set('description', 'Background colour when fit is contain.')
            .toOmniIO()
    )
    .addInput(
        resizeComponent.createInput('kernel', 'string')
            .set('title', 'Kernel')
            .setChoices(['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'], 'lanczos3')
            .set('description', 'The kernel to use for image reduction.')
            .toOmniIO()
    )
    .addInput(
        resizeComponent.createInput('withoutEnlargement', 'boolean')
            .set('title', 'Without Enlargement')
            .setDefault(false)
            .set('description', 'Do not scale up if the width or height are already less than the target dimensions.')
            .toOmniIO()
    )
    .addInput(
        resizeComponent.createInput('fastShrinkOnLoad', 'boolean')
            .set('title', 'Fast Shrink On Load')
            .setDefault(true)
            .set('description', 'Take greater advantage of the JPEG and WebP shrink-on-load feature.')
            .toOmniIO()
    )
    .addOutput(
        resizeComponent.createOutput('images', 'object', 'imageArray')
            .set('title', 'Output Images')
            .set('description', 'The resized images.')
            .toOmniIO()
    )
    .setMeta({
        source: {
            summary: 'Resize the image to the given dimensions with various options for scaling, fitting, and cropping.',
            links: {
                'Sharp Website': 'https://sharp.pixelplumbing.com/',
                'Documentation': 'https://sharp.pixelplumbing.com/api-resize',
                'Sharp Github': 'https://github.com/lovell/sharp',
                'Support Sharp': 'https://opencollective.com/libvips'
            }
        }
    }).setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
        if (payload.images) {
            let images = await Promise.all(payload.images.map((image: any) => {
                return ctx.app.cdn.get(image.ticket)
            }))
        let results = await Promise.all(images.map(async (image: any) => {
            let width = payload.width
            let height = payload.height
            let fit = payload.fit
            let position = payload.position
            let background = payload.background
            let kernel = payload.kernel
            let withoutEnlargement = payload.withoutEnlargement
            let fastShrinkOnLoad = payload.fastShrinkOnLoad
            image.data = await sharp(image.data).resize(
                width, 
                height,
                {
                    fit, 
                    position, 
                    background, 
                    kernel, 
                    withoutEnlargement, 
                    fastShrinkOnLoad
                }
            ).toBuffer()
            return image
        }))

        results = await writeToCdn(ctx, results)

        return { images: results }
    }

    return {}
})
const SharpResizeComponent = resizeComponent.toJSON()

export default SharpResizeComponent
