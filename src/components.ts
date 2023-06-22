
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
            image.data = result.toString('base64')
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


let components = [SharpRotationComponent]


export default (FactoryFn: any) =>
{
  return components.map((c) => FactoryFn(c.schema, c.functions))
}
