// components.ts
import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'mercs_rete'
import sharp4 from "sharp";

// components/SharpResizeComponent.ts
import sharp2 from "sharp";

// util/updateMetaData.ts
import sharp from "sharp";

import sharp3 from "sharp";

const NS = 'sharp'

var updateMetaData = async (image) => {
  if (image.data) {
    let img = sharp(image.data);
    let metadata = await img.metadata();
    image.meta = { height: metadata.height, width: metadata.width, format: metadata.format, size: metadata.size, channels: metadata.channels };
  }
  return image;
};
var updateMetaData_default = updateMetaData;

// util/writeToCdn.ts
var writeToCdn = async (ctx, images, meta) => {
  console.log("writeToCdn");
  return Promise.all(images.map(async (image) => {
    if (image.data != null) {
      await updateMetaData_default(image);
      return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType, userId: ctx.userId }, Object.assign({}, image.meta, meta || {}, { user: ctx.user.id }));
    } else {
      return image;
    }
  }));
};
var writeToCdn_default = writeToCdn;

// components/SharpResizeComponent.ts
// SharpResizeComponent
let resizeComponent = OAIBaseComponent
    .create(NS, 'resize')
    .fromScratch()
    .setMethod('X-CUSTOM')
    resizeComponent
    .set('title', 'Resize Image')
    .set('description', 'Resize the image to given width and height using various options.')
    .addInput(
      resizeComponent.createInput('images', 'object', 'imageArray')
            .set('title', 'Input Images')
            .set('description', 'Images to resize.')
            .setRequired(true)
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
    })    .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
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

        results = await writeToCdn_default(ctx, results)

        return { images: results }
    }

    return {}
})
const SharpResizeComponent = resizeComponent.toJSON()

// components/SharpCompositeComponent.ts
// SharpCompositeComponent
let compositeComponent = OAIBaseComponent
  .create(NS, 'composite')
  .fromScratch()
  .set('title', 'Composite Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Composite image(s) over the processed image using various options.')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Composite image(s) over the processed image with options for blending, placement, tiling, and more.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-composite',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  compositeComponent
  .addInput(
    compositeComponent.createInput('images', 'array', 'imageArray')
      .set('description', 'Images to be processed')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('compositeImages', 'array', 'imageArray')
      .set('description', 'Images to be composited')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('blend', 'string')
      .set('description', 'How to blend this image with the image below.')
      .setDefault('clear')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('gravity', 'string')
      .set('description', 'Gravity at which to place the overlay.')
      .setDefault('northeast')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('top', 'number')
      .set('description', 'The pixel offset from the top edge.')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('left', 'number')
      .set('description', 'The pixel offset from the left edge.')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('tile', 'boolean')
      .set('description', 'Set to true to repeat the overlay image across the entire image with the given gravity.')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('premultiplied', 'boolean')
      .set('description', 'Set to true to avoid premultiplying the image below.')
      .toOmniIO()
  )
  .addInput(
    compositeComponent.createInput('density', 'number')
      .set('description', 'Number representing the DPI for vector overlay image.')
      .setDefault(72)
      .setConstraints(1, 600, 1)
      .toOmniIO()
  )
  .addOutput(
    compositeComponent.createOutput('images', 'array', 'imageArray')
      .set('description', 'The processed images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images && payload.compositeImages) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
      let compositeImages = await Promise.all(payload.compositeImages.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
      let results = await Promise.all(images.map(async (image: any, index: number) => {
        image.data = await sharp3(image.data).composite(compositeImages.map((compositeImage: any) => ({
          input: compositeImage.data,
          blend: payload.blend,
          gravity: payload.gravity,
          top: payload.top,
          left: payload.left,
          tile: payload.tile,
          premultiplied: payload.premultiplied,
          density: payload.density
        }))).toBuffer()
        return image
      }))
      results = await writeToCdn_default(ctx, results)
      return { images: results }
    }
    return {}
  })
const SharpCompositeComponent = compositeComponent.toJSON()

// SharpRotationComponent
let rotateComponent = OAIBaseComponent
  .create(NS, 'rotate')
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
    let sharpImage = sharp4(buffer)
    sharpImage.rotate(angle, { background })
    let result = await sharpImage.toBuffer()
    image.data = result
    return image
  }))

  payload.images = await writeToCdn_default(ctx, results)
}

return { images: payload.images }

  })
const SharpRotationComponent = rotateComponent.toJSON()

// SharpBlurComponent
let blurComponent = OAIBaseComponent.create(NS, 'blur')
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
      .setConstraints(0, 3e3)
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
  let sharpImage = sharp4(buffer)

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

payload.images = await writeToCdn_default(ctx, results)

  }
  return { images: payload.images }
})
const SharpBlurComponent = blurComponent.toJSON()

// SharpTintComponent
let tintComponent = OAIBaseComponent
  .create(NS, 'tint')
  .fromScratch()
  .set('title', 'Tint Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Tints an image')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Tints an image via provided RGB values',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#tint',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  tintComponent
  .addInput(
    tintComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to blur')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    tintComponent.createInput('red', 'number')
      .set('description', 'Tint the red channel')
      .setDefault(0)
      .setConstraints(0, 255, 1)
      .toOmniIO()
  )
  .addInput(
    tintComponent.createInput('green', 'number')
      .set('description', 'Tint the green channel')
      .setDefault(0)
      .setConstraints(0, 255, 1)
      .toOmniIO()
  )
  .addInput(
    tintComponent.createInput('blue', 'number')
      .set('description', 'Tint the blue channel')
      .setDefault(0)
      .setConstraints(0, 255, 1)
      .toOmniIO()
  )
  .addOutput(
    tintComponent.createOutput('images', 'object', 'imageArray')
      .set('description', 'The tinted images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
  const tint = {
    r: parseInt(payload.red),
    g: parseInt(payload.green),
    b: parseInt(payload.blue)
  }

  let results = await Promise.all(images.map(async (image: any) => {
    image.data = await sharp4(image.data).tint(tint).toBuffer()
    return image
  }))

  payload.images = await writeToCdn_default(ctx, results, { tint })
}

return { images: payload.images }

  })
const SharpTintComponent = tintComponent.toJSON()

// SharpGrayscaleComponent
let grayScaleComponent = OAIBaseComponent
  .create(NS, 'grayscale')
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
    grayScaleComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to grayscale')
      .setRequired(true)
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
    grayScaleComponent.createOutput('images', 'object', 'imageArray')
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
      image.data = await sharp4(image.data).grayscale(true).toBuffer()
    }
    return image
  }))

  payload.images = await writeToCdn_default(ctx, results, { grayscale: payload.grayscale })
}
return payload

  })
const SharpGrayscaleComponent = grayScaleComponent.toJSON()

//  SharpExtractComponent
let extractComponent = OAIBaseComponent
  .create(NS, 'extract')
  .fromScratch()
  .set('title', 'Extract Image Region (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Extracts/Crops an image region')
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
  extractComponent
  .addInput(
    extractComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to extract from')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    extractComponent.createInput('left', 'number')
      .set('title', 'Left')
      .setDefault(0)
      .set('minimum', 0)
      .toOmniIO()
  )
  .addInput(
    extractComponent.createInput('top', 'number')
      .set('title', 'Top')
      .setDefault(0)
      .set('minimum', 0)
      .toOmniIO()
  )
  .addInput(
    extractComponent.createInput('width', 'number')
      .set('title', 'Width')
      .setDefault(512)
      .set('minimum', 0)
      .toOmniIO()
  )
  .addInput(
    extractComponent.createInput('height', 'number')
      .set('title', 'Height')
      .setDefault(512)
      .set('minimum', 0)
      .toOmniIO()
  )
  .addOutput(
    extractComponent.createOutput('images', 'object', 'imageArray')
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
    const { left, top, width, height } = payload
    image.data = await sharp(image.data).extract({ left, top, width, height }).toBuffer()
    return image
  }))

  payload.images = await writeToCdn_default(ctx, results)
}
return payload

  })
const SharpExtractComponent = extractComponent.toJSON()

// SharpTrimComponent
let trimComponent = OAIBaseComponent.create(NS, 'trim')
  .fromScratch()
  .set('title', 'Trim Image (Sharp)')
  .set('description', 'Trim pixels from all edges that contain values similar to the given background colour.')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Trim pixels from all edges that contain values similar to the given background colour, which defaults to that of the top-left pixel. Images with an alpha channel will use the combined bounding box of alpha and non-alpha channels.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#trim',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  trimComponent
  .addInput(
    trimComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to operate on')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    trimComponent.createInput('trimMode', 'string')
      .set('title', 'Trim Mode')
      .setDefault('Top left Pixel')
      .set('description', 'Specify the mode for trimming: Top left pixel or Background color.')
      .toOmniIO()
  )
  .addInput(
    trimComponent.createInput('background', 'string')
      .set('title', 'Background')
      .setDefault('#000000')
      .set('description', 'Background colour to trim, used when trim mode is 'Background color'.')
      .toOmniIO()
  )
  .addInput(
    trimComponent.createInput('threshold', 'number')
      .set('title', 'Threshold')
      .setDefault(10)
      .set('description', 'The allowed difference from the above colour, a positive number.')
      .toOmniIO()
  )
  .addOutput(
    trimComponent.createOutput('images', 'object', 'imageArray')
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
    if (payload.trimMode === 'Background color') {
      image.data = await sharp4(image.data).trim({ background: payload.background, threshold: payload.threshold }).toBuffer()
    } else {
      image.data = await sharp4(image.data).trim(payload.threshold).toBuffer()
    }
    return image
  }))

  payload.images = await writeToCdn_default(ctx, results)
}
return { images: payload.images }

  })
const SharpTrimComponent = trimComponent.toJSON()


// SharpExtendComponent
let extendComponent = OAIBaseComponent
  .create(NS, 'extend')
  .fromScratch()
  .set('title', 'Extend Image')
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
  image.data = await sharp4(image.data).extend({ left, right, top, bottom, extendWith, background }).toBuffer()
  image.meta.width += left + right
  image.meta.height += top + bottom
  return image
}))

payload.images = await writeToCdn_default(ctx, results)

  }
  return payload
})
const SharpExtendComponent = extendComponent.toJSON()


// SharpModulateComponent
let modulateComponent = OAIBaseComponent
  .create(NS, 'modulate')
  .fromScratch()
  .set('title', 'Modulate Image (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Transforms the image using brightness, saturation, hue rotation, and lightness')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Transforms the image using brightness, saturation, hue rotation, and lightness. Brightness and lightness both operate on luminance, with the difference being that brightness is multiplicative whereas lightness is additive.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-operation#modulate',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  modulateComponent
  .addInput(
    modulateComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to extend')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    modulateComponent.createInput('brightness', 'float')
      .set('title', 'Brightness')
      .set('description', 'The brightness multiplier.')
      .setDefault(1)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    modulateComponent.createInput('saturation', 'float')
      .set('title', 'Saturation')
      .set('description', 'The saturation multiplier.')
      .setDefault(1)
      .setConstraints(0)
      .toOmniIO()
  )
  .addInput(
    modulateComponent.createInput('hue', 'float')
      .set('title', 'Hue Rotation')
      .set('description', 'The hue rotation in degrees.')
      .setDefault(0)
      .setConstraints(-360, 360, 1)
      .toOmniIO()
  )
  .addInput(
    modulateComponent.createInput('lightness', 'float')
      .set('title', 'Lightness')
      .set('description', 'The lightness addend.')
      .setDefault(0)
      .setConstraints(0)
      .toOmniIO()
  )
  .addOutput(
    modulateComponent.createOutput('images', 'object', 'imageArray')
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
        const args = { ...payload }
        if (args.hue == 0) {
          delete args.hue
        }
        image.data = await sharp4(image.data).modulate(args).toBuffer()
        return image
      }))
      payload.images = await writeToCdn_default(ctx, results)
    }
    return { images: payload.images }
  })
const SharpModulateComponent = modulateComponent.toJSON()


// SharpExtractChannelComponent
let extractChannelComponent = OAIBaseComponent
  .create(NS, 'extractChannel')
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
    extractChannelComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to operate on')
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
    extractChannelComponent.createOutput('images', 'object', 'imageArray')
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
        image.data = await sharp4(image.data).extractChannel(payload.channel).toBuffer()
        return image
      }))
      payload.images = await writeToCdn_default(ctx, results)
    }
    return { images: payload.images }
  })
const SharpExtractChannelComponent = extractChannelComponent.toJSON()


// SharpMetaDataComponent
let metadataComponent = OAIBaseComponent.create(NS, 'metadata')
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
    metadataComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to inspect')
      .setRequired(true)
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
        let md = await sharp4(image.data).metadata()
        return Object.assign({}, image.meta, md || {})
      }))
      payload.metadata = results
    }
    return { metadata: payload.metadata }
  })
const SharpMetaDataComponent = metadataComponent.toJSON()


// SharpStatsComponent
let statsComponent = OAIBaseComponent
  .create(NS, 'stats')
  .fromScratch()
  .set('title', 'Get Image Stats (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Access to pixel-derived image statistics for every channel in the image')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Access to pixel-derived image statistics for every channel in the image',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-input#stats',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  statsComponent
  .addInput(
    statsComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to inspect')
      .setRequired(true)
      .toOmniIO()
  )
  .addOutput(
    statsComponent.createOutput('stats', 'object', 'objectArray')
      .set('title', 'Stats')
      .set('description', 'Pixel-derived image statistics for every channel in the image')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) => {
        return ctx.app.cdn.get(image.ticket)
      }))
  let results = await Promise.all(images.map(async (image: any) => {
    let md = await sharp4(image.data).stats()
    return md
  }))

  payload.stats = results
}
return { stats: payload.stats }

  })
const SharpStatsComponent = statsComponent.toJSON()

// SharpRemoveAlphaComponent
let removeAlphaComponent = OAIBaseComponent
  .create(NS, 'removeAlpha')
  .fromScratch()
  .set('title', 'Remove Alpha (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Remove alpha channel from an image, if any. This is a no-op if the image does not have an alpha channel.')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Remove alpha channel from an image, if any. This is a no-op if the image does not have an alpha channel.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-channel#removeAlpha',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  removeAlphaComponent
  .addInput(
    removeAlphaComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to operate on')
      .setRequired(true)
      .toOmniIO()
  )
  removeAlphaComponent.setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image: any) => {
      return ctx.app.cdn.get(image.ticket)
    }))
let results = await Promise.all(images.map(async (image: any) => {
  image.data = await sharp4(image.data).removeAlpha().toBuffer()
  return image
}))

payload.images = await writeToCdn_default(ctx, results)

  }
  return { images: payload.images }
})
const SharpRemoveAlphaComponent = removeAlphaComponent.toJSON()

// SharpEnsureAlphaComponent
let ensureAlphaComponent = OAIBaseComponent
  .create(NS, 'ensureAlpha')
  .fromScratch()
  .set('title', 'Ensure Alpha (Sharp)')
  .set('category', 'Image Manipulation')
  .set('description', 'Ensure the output image has an alpha transparency channel.')
  .setMethod('X-CUSTOM')
  .setMeta({
    source: {
      summary: 'Ensure the output image has an alpha transparency channel. If missing, the added alpha channel will have the specified transparency level, defaulting to fully-opaque (1). This is a no-op if the image already has an alpha channel.',
      links: {
        'Sharp Website': 'https://sharp.pixelplumbing.com/',
        'Documentation': 'https://sharp.pixelplumbing.com/api-channel#ensureAlpha',
        'Sharp Github': 'https://github.com/lovell/sharp',
        'Support Sharp': 'https://opencollective.com/libvips'
      }
    }
  })
  ensureAlphaComponent
  .addInput(
    ensureAlphaComponent.createInput('images', 'object', 'imageArray')
      .set('title', 'Image')
      .set('description', 'The image(s) to operate on')
      .setRequired(true)
      .toOmniIO()
  )
  .addInput(
    ensureAlphaComponent.createInput('alpha', 'number')
      .set('title', 'Alpha')
      .set('description', 'Alpha transparency level (0=fully-transparent, 1=fully-opaque).')
      .setDefault(1)
      .setConstraints(0, 1, 0.1)
      .toOmniIO()
  )
  .addOutput(
    ensureAlphaComponent.createOutput('images', 'object', 'imageArray')
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
        image.data = await sharp4(image.data).ensureAlpha(payload.alpha).toBuffer()
        return image
      }))
      payload.images = await writeToCdn_default(ctx, results)
    }
    return { images: payload.images }
  })
const SharpEnsureAlphaComponent = ensureAlphaComponent.toJSON()

let allComponents = [SharpRotationComponent, SharpTrimComponent, SharpBlurComponent, SharpTintComponent, SharpGrayscaleComponent, SharpExtractComponent, SharpMetaDataComponent, SharpStatsComponent, SharpExtendComponent, SharpModulateComponent, SharpExtractChannelComponent, SharpRemoveAlphaComponent, SharpEnsureAlphaComponent, SharpResizeComponent, SharpCompositeComponent];

export default {
  createComponents: () => {
    blocks: [ allComponents ]
  }
}