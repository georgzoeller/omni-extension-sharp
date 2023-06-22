
import sharp from 'sharp'

const SharpRotationComponent =
  {
    schema:
    {
      "tags": ['default'],
      "componentKey": "rotate",
      "operation": {

        "schema": {
          "title": "Rotate",
          "type": "object",
          required:[],
          "properties": {
            "angle": {
              "title": "° Angle",
              "type": "number",
              "default": 90,
              "description": `Rotate the output image by either an explicit angle or auto-orient based on the EXIF Orientation tag.
              If an angle is provided, it is converted to a valid positive degree rotation. For example, -450 will produce a 270deg rotation.
              When rotating by an angle other than a multiple of 90, the background colour can be provided with the background option.
              If no angle is provided, it is determined from the EXIF data. Mirroring is supported and may infer the use of a flip operation. number`
            }
          },
        },
        "responseTypes": {
          "200": {
            "schema": {
              "title": "Text",
              "required": [
                "images"
              ],
              "type": "string",
              "properties": {
                "images": {
                  "title": "Images",
                  "type": "object",
                  "x-type": "imageArray",
                  "description": "The rotated images"
                },
              },
            },
            "contentType": "application/json"
          },
        },
        "method": "X-CUSTOM"
      },
      patch:
      {
        "title": "Rotate Image (Sharp)",
        "category": "Image Manipulation",
        "summary": "Rotates an image",
        "meta":
        {
          "source":
          {
            "summary": "Rotate an image using the high speed impage manipulation library Sharp for nodejs",
            links:
            {
              "Sharp Website": "https://sharp.pixelplumbing.com/",
              "Documentation": "https://sharp.pixelplumbing.com/api-operation#rotate",
              "Sharp Github": "https://github.com/lovell/sharp",
              "Support Sharp": "https://opencollective.com/libvips"
            }
          }
        },
        inputs:
        {
          "images":
          {
            "type": "object",
            "x-type": "imageArray",
            "title": "Image",
            "description": "The image(s) to rotate",
            "required": true,
            "control":
            {
              "type": "AlpineLabelComponent"
            }
          },
          "angle":
          {
            maximum: 360,
            minimum: -360,
            default: 0,
            step: 1,
            description: "The angle of rotation. (optional, default 0)",
            control:
            {
              "type": "AlpineNumWithSliderComponent"
            }
          },
          "background":
          {
            "type": "string",
            "x-type": "text",
            "title": "Background",
            "description": "Background colour when using a non-zero angle. (optional, default black)",
            "default": "black",
            control:
            {
              "type": "AlpineColorComponent"
            }
          }
        }
      }
    },
    functions: {
      _exec: async (payload, ctx) =>
      {

        if (payload.images)
        {
          // get buffer
          let images = await Promise.all(payload.images.map((image: any) =>{
            return ctx.app.cdn.get(image.ticket)
          }))

          let background = payload.background || 'black'
          let angle = payload.angle || 90

          let results = await Promise.all(images.map(async (image: any) =>
          {
            let buffer = image.data
            let sharpImage = sharp(buffer)
            sharpImage.rotate(angle, { background: background })
            let result = await sharpImage.toBuffer()
            image.data = result
            return image
          }))

          // write new record
          results = await Promise.all(results.map((image: any) =>
          {
            return ctx.app.cdn.putTemp(image.data, {mimeType: image.mimeType}, Object.assign({}, image.meta, {rotation: angle}))
          }))

          payload.images = results
        }

        return payload
      }
    }
  }


  const SharpBlurComponent =
  {
    schema:
    {
      "tags": ['default'],
      "componentKey": "blur",
      "operation": {

        "schema": {
          "title": "Blur",
          "type": "object",
          required:[],
          "properties": {
            "sigma": {
              "title": "Sigma",
              "type": "number",
              "default": 0,
              "minimum": 0,
              "maximum": 1000,
              "description": `Blur the image.
              When used without parameters, performs a fast 3x3 box blur (equivalent to a box linear filter).
              When a sigma is provided, performs a slower, more accurate Gaussian blur.r`
            }
          },
        },
        "responseTypes": {
          "200": {
            "schema": {
              "title": "Text",
              "required": [
                "images"
              ],
              "type": "string",
              "properties": {
                "images": {
                  "title": "Images",
                  "type": "object",
                  "x-type": "imageArray",
                  "description": "The blurred images"
                },
              },
            },
            "contentType": "application/json"
          },
        },
        "method": "X-CUSTOM"
      },
      patch:
      {
        "title": "Blur Image (Sharp)",
        "category": "Image Manipulation",
        "summary": "Blurs an image",
        "meta":
        {
          "source":
          {
            "summary": "Blurs an image, optionally using a sigmal value via Gaussian Blur",
            links:
            {
              "Sharp Website": "https://sharp.pixelplumbing.com/",
              "Documentation": "https://sharp.pixelplumbing.com/api-operation#blur",
              "Sharp Github": "https://github.com/lovell/sharp",
              "Support Sharp": "https://opencollective.com/libvips"
            }
          }
        },
        inputs:
        {
          "images":
          {
            "type": "object",
            "x-type": "imageArray",
            "title": "Image",
            "description": "The image(s) to blur",
            "required": true,
            "control":
            {
              "type": "AlpineLabelComponent"
            }
          },
          "sigma":
          {
            minimum: 0,
            maximum: 3000,
            default: 0,
            description: "The sigma value for Gaussian BLur, 0 for fast blur, 0.3-1000 for Gaussian Blur Sigma",
            control:
            {
              "type": "AlpineNumComponent"
            }
          }
        }
      }
    },
    functions: {
      _exec: async (payload, ctx) =>
      {

        if (payload.images)
        {
          // get buffer
          let images = await Promise.all(payload.images.map((image: any) =>{
            return ctx.app.cdn.get(image.ticket)
          }))




          let results = await Promise.all(images.map(async (image: any) =>
          {
            let buffer = image.data
            let sharpImage = sharp(buffer)
            if (payload.sigma == 0)
            {
              sharpImage.blur()
            }
            if (payload.sigma > 0 )
            {
              let sigma= Math.max(0.3,Math.min(1000,payload.sigma))
              sharpImage.blur(sigma)
            }

            let result = await sharpImage.toBuffer()
            image.data = result
            return image
          }))

          // write new record
          results = await Promise.all(results.map((image: any) =>
          {
            return ctx.app.cdn.putTemp(image.data, {mimeType: image.mimeType}, Object.assign({}, image.meta))
          }))

          payload.images = results
        }

        return payload
      }
    }
  }



  const SharpTintComponent =
  {
    schema:
    {
      "tags": ['default'],
      "componentKey": "tint",
      "operation": {

        "schema": {
          "title": "Tint Image",
          "type": "object",
          required:[],
          "properties": {
            "red": {
              "title": "Red",
              "type": "number",
              "default": 0,
              "minimum": 0,
              "maximum": 255,
              "description": `Tint the red channel.`
            },
            "green": {
              "title": "Green",
              "type": "number",
              "default": 0,
              "minimum": 0,
              "maximum": 255,
              "description": `Tint the green channel.`
            },
            "blue": {
              "title": "Blue",
              "type": "number",
              "default": 0,
              "minimum": 0,
              "maximum": 255,
              "description": `Tint the blue channel.`
            }
          },
        },
        "responseTypes": {
          "200": {
            "schema": {

              "required": [
                "images"
              ],
              "type": "string",
              "properties": {
                "images": {
                  "title": "Images",
                  "type": "object",
                  "x-type": "imageArray",
                  "description": "The tinted images"
                },
              },
            },
            "contentType": "application/json"
          },
        },
        "method": "X-CUSTOM"
      },
      patch:
      {
        "title": "Tint Image (Sharp)",
        "category": "Image Manipulation",
        "summary": "Tints an image",
        "meta":
        {
          "source":
          {
            "summary": "Tints an image via provided RGB values",
            links:
            {
              "Sharp Website": "https://sharp.pixelplumbing.com/",
              "Documentation": "https://sharp.pixelplumbing.com/api-operation#tint",
              "Sharp Github": "https://github.com/lovell/sharp",
              "Support Sharp": "https://opencollective.com/libvips"
            }
          }
        },
        inputs:
        {
          "images":
          {
            "type": "object",
            "x-type": "imageArray",
            "title": "Image",
            "description": "The image(s) to blur",
            "required": true,
            "control":
            {
              "type": "AlpineLabelComponent"
            }
          },
          "red":
          {
            step: 1,
            control: {
              "type": "AlpineNumWithSliderComponent"
            }
          },
          "green":
          {
            step: 1,
            control: {
              "type": "AlpineNumWithSliderComponent"
            }
          }
          ,
          "blue":
          {
            step: 1,
            control: {
              "type": "AlpineNumWithSliderComponent"
            }
          }

        }
      }
    },
    functions: {
      _exec: async (payload, ctx) =>
      {

        if (payload.images)
        {
          // get buffer
          let images = await Promise.all(payload.images.map((image: any) =>{
            return ctx.app.cdn.get(image.ticket)
          }))
          const tint = {
            r: parseInt(payload.red),
            g: parseInt(payload.green),
            b: parseInt(payload.blue)
          }

          let results = await Promise.all(images.map(async (image: any) =>
          {

            image.data = await sharp(image.data).tint(tint).toBuffer()
            return image
          }))

          // write new record
          results = await Promise.all(results.map((image: any) =>
          {
            return ctx.app.cdn.putTemp(image.data, {mimeType: image.mimeType}, Object.assign({}, image.meta, {tint: tint}))
          }))

          payload.images = results
        }

        return payload
      }
    }
  }


  const SharpGrayscaleComponent =
  {
    schema:
    {
      "tags": ['default'],
      "componentKey": "grayscale",
      "operation": {

        "schema": {
          "title": "Grayscale Image",
          "type": "object",
          required:[],
          "properties": {
            "Grayscale": {
              "title": "Grayscale",
              "type": "boolean",
              "default": true,
              "description": `Grayscale the Image`
            }
          },
        },
        "responseTypes": {
          "200": {
            "schema": {

              "required": [
                "images"
              ],
              "type": "string",
              "properties": {
                "images": {
                  "title": "Images",
                  "type": "object",
                  "x-type": "imageArray",
                  "description": "The grayscaled images"
                },
              },
            },
            "contentType": "application/json"
          },
        },
        "method": "X-CUSTOM"
      },
      patch:
      {
        "title": "Grayscale Image (Sharp)",
        "category": "Image Manipulation",
        "summary": "Convert an image to 8-bit, 256 color grayscale",
        "meta":
        {
          "source":
          {
            "summary": "Convert to 8-bit greyscale; 256 shades of grey. This is a linear operation. If the input image is in a non-linear colour space such as sRGB, use gamma() with greyscale() for the best results. By default the output image will be web-friendly sRGB and contain three (identical) color channels. This may be overridden by other sharp operations such as toColourspace('b-w'), which will produce an output image containing one color channel. An alpha channel may be present, and will be unchanged by the operation.",
            links:
            {
              "Sharp Website": "https://sharp.pixelplumbing.com/",
              "Documentation": "https://sharp.pixelplumbing.com/api-operation#grayscale",
              "Sharp Github": "https://github.com/lovell/sharp",
              "Support Sharp": "https://opencollective.com/libvips"
            }
          }
        },
        inputs:
        {
          "images":
          {
            "type": "object",
            "x-type": "imageArray",
            "title": "Image",
            "description": "The image(s) to grayscale",
            "required": true,
            "control":
            {
              "type": "AlpineLabelComponent"
            }
          }
        }
      }
    },
    functions: {
      _exec: async (payload, ctx) =>
      {

        if (payload.images)
        {
          // get buffer
          let images = await Promise.all(payload.images.map((image: any) =>{
            return ctx.app.cdn.get(image.ticket)
          }))


          let results = await Promise.all(images.map(async (image: any) =>
          {

            image.data = await sharp(image.data).grayscale(payload.grayscale).toBuffer()
            return image
          }))

          // write new record
          results = await Promise.all(results.map((image: any) =>
          {
            return ctx.app.cdn.putTemp(image.data, {mimeType: image.mimeType}, Object.assign({}, image.meta, {grayscale: payload.grayscale}))
          }))

          payload.images = results
        }

        return payload
      }
    }
  }
  const SharpExtractComponent =
  {
    schema:
    {
      "tags": ['default'],
      "componentKey": "extract",
      "operation": {

        "schema": {
          "title": "Extract Image",
          "type": "object",
          required:[],
          "properties": {
            "left": {
              "title": "Left",
              "type": "number",
              "default": 0,
              "minimum": 0,
            },
            "top": {
              "title": "Top",
              "type": "number",
              "default": 0,
              "minimum": 0,
            },
            "width": {
              "title": "Width",
              "type": "number",
              "default": 512,
              "minimum": 0,
            },
            "height": {
              "title": "height",
              "type": "number",
              "default": 512,
              "minimum": 0,
            }
          },
        },
        "responseTypes": {
          "200": {
            "schema": {

              "required": [
                "images"
              ],
              "type": "string",
              "properties": {
                "images": {
                  "title": "Images",
                  "type": "object",
                  "x-type": "imageArray",
                  "description": "The processed images"
                },
              },
            },
            "contentType": "application/json"
          },
        },
        "method": "X-CUSTOM"
      },
      patch:
      {
        "title": "Extract Image Region (Sharp)",
        "category": "Image Manipulation",
        "summary": "Extracts/Crops an image region",
        "meta":
        {
          "source":
          {
            "summary": `Extract/crop a region of the image.
            Use extract before resize for pre-resize extraction.
            Use extract after resize for post-resize extraction.
            Use extract before and after for both.`,
            links:
            {
              "Sharp Website": "https://sharp.pixelplumbing.com/",
              "Documentation": "https://sharp.pixelplumbing.com/api-operation#extract",
              "Sharp Github": "https://github.com/lovell/sharp",
              "Support Sharp": "https://opencollective.com/libvips"
            }
          }
        },
        inputs:
        {
          "images":
          {
            "type": "object",
            "x-type": "imageArray",
            "title": "Image",
            "description": "The image(s) to extract from",
            "required": true,
            "control":
            {
              "type": "AlpineLabelComponent"
            }
          }
        }
      }
    },
    functions: {
      _exec: async (payload, ctx) =>
      {

        if (payload.images)
        {
          // get buffer
          let images = await Promise.all(payload.images.map((image: any) =>{
            return ctx.app.cdn.get(image.ticket)
          }))


          let results = await Promise.all(images.map(async (image: any) =>
          {
            const { left, top, width, height } = payload

            image.data = await sharp(image.data).extract({left,top, width, height}).toBuffer()
            image.meta.width = width
            image.meta.height = height
            return image
          }))

          // write new record
          results = await Promise.all(results.map((image: any) =>
          {
            return ctx.app.cdn.putTemp(image.data, {mimeType: image.mimeType}, Object.assign({}, image.meta))
          }))

          payload.images = results
        }

        return payload
      }
    }
  }

  const SharpMetaDataComponent =
  {
    schema:
    {
      "tags": ['default'],
      "componentKey": "metadata",
      "operation": {

        "schema": {
          "title": "Get Image Metadata",
          "type": "object",
          required:[],
          "properties": {

          }

        },
        "responseTypes": {
          "200": {
            "schema": {

              "required": [
                "metadata"
              ],
              "type": "string",
              "properties": {
                "metadata": {
                  "title": "Metadata",
                  "type": "object",
                  "x-type": "objectArray",
                },
              },
            },
            "contentType": "application/json"
          },
        },
        "method": "X-CUSTOM"
      },
      patch:
      {
        "title": "Get Image Metadata (Sharp)",
        "category": "Image Manipulation",
        "summary": "Returns the metadata of an image",
        "meta":
        {
          "source":
          {
            "summary": `Fast access to (uncached) image metadata without decoding any compressed pixel data.

            This is read from the header of the input image. It does not take into consideration any operations to be applied to the output image, such as resize or rotate..`,
            links:
            {
              "Sharp Website": "https://sharp.pixelplumbing.com/",
              "Documentation": "https://sharp.pixelplumbing.com/api-input#metadata",
              "Sharp Github": "https://github.com/lovell/sharp",
              "Support Sharp": "https://opencollective.com/libvips"
            }
          }
        },
        inputs:
        {
          "images":
          {
            "type": "object",
            "x-type": "imageArray",
            "title": "Image",
            "description": "The image(s) to inspect",
            "required": true,
            "control":
            {
              "type": "AlpineLabelComponent"
            }
          }
        }
      }
    },
    functions: {
      _exec: async (payload, ctx) =>
      {

        if (payload.images)
        {
          // get buffer
          let images = await Promise.all(payload.images.map((image: any) =>{
            return ctx.app.cdn.get(image.ticket)
          }))


          let results = await Promise.all(images.map(async (image: any) =>
          {
            let md = await sharp(image.data).metadata();
            console.log("md", md)
            console.log(md.width, md.height, md.format)
            return md
          }))

          // write new record

          payload.metadata = results
        }

        return payload
      }
    }
  }

let components = [SharpRotationComponent, SharpBlurComponent, SharpTintComponent, SharpGrayscaleComponent, SharpExtractComponent, SharpMetaDataComponent]


export default (FactoryFn: any) =>
{
  return components.map((c) => FactoryFn(c.schema, c.functions))
}
