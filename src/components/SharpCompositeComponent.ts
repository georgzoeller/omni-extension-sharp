import sharp from 'sharp';
import writeToCdn from '../util/writeToCdn';

const SharpCompositeComponent =
{
  schema: {
    "tags": ['default'],
    "componentKey": "composite",
    "operation": {
      "schema": {
        "title": "Composite Image",
        "type": "object",
        "required": ["images", "compositeImages"],
        "properties": {
          "images": {
            "type": "array",
            "x-type": "imageArray",
            "description": "Images to be processed"
          },
          "compositeImages": {
            "type": "array",
            "x-type": "imageArray",

            "description": "Images to be composited"
          },

          "blend": {
            "type": "string",
            "enum": ["clear", "source", "over", "in", "out", "atop", "dest", "dest-over", "dest-in", "dest-out", "dest-atop", "xor", "add", "saturate", "multiply", "screen", "overlay", "darken", "lighten", "colour-dodge", "color-dodge", "colour-burn", "color-burn", "hard-light", "soft-light", "difference", "exclusion"],
            "description": "How to blend this image with the image below.",
            "default": "clear"
          },
          "gravity": {
            "type": "string",
            "enum": ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest", "centre", "center"],
            "description": "Gravity at which to place the overlay.",
            "default": "northeast"
          },
          "top": {
            "type": "number",
            "description": "The pixel offset from the top edge."
          },
          "left": {
            "type": "number",
            "description": "The pixel offset from the left edge."
          },
          "tile": {
            "type": "boolean",
            "description": "Set to true to repeat the overlay image across the entire image with the given gravity."
          },
          "premultiplied": {
            "type": "boolean",
            "description": "Set to true to avoid premultiplying the image below."
          },
          "density": {
            "type": "number",
            "description": "Number representing the DPI for vector overlay image.",
            "minimum": 1,
            "step": 1,
            "maximum": 600,
            "default": 72
          }
        },
      },


      "responseTypes": {
        "200": {
          "schema": {
            "required": ["images"],
            "type": "array",
            "properties": {
              "images": {
                "type": "object",
                "x-type": "imageArray",
                "description": "The processed images"
              }
            },
          },
          "contentType": "application/json"
        },
      },
      "method": "X-CUSTOM"
    },
    patch:
    {
      "title": "Composite Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Composite image(s) over the processed image using various options.",
      "meta": {
        "source": {
          "summary": "Composite image(s) over the processed image with options for blending, placement, tiling, and more.",
          "links": {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-composite",
            "Sharp Github": "https://github.com/lovell/sharp",
            "Support Sharp": "https://opencollective.com/libvips"
          }
        }

      },
    }
  },
  functions: {
    _exec: async (payload, ctx) => {
      if (payload.images && payload.compositeImages) {
        let images = await Promise.all(payload.images.map((image) => {
          return ctx.app.cdn.get(image.ticket);
        }));

        let compositeImages = await Promise.all(payload.compositeImages.map((image) => {
          return ctx.app.cdn.get(image.ticket);
        }));

        let results = await Promise.all(images.map(async (image, index) => {
          image.data = await sharp(image.data)
            .composite(compositeImages.map(compositeImage => ({
              input: compositeImage.data,
              blend: payload.blend,
              gravity: payload.gravity,
              top: payload.top,
              left: payload.left,
              tile: payload.tile,
              premultiplied: payload.premultiplied,
              density: payload.density
            })))
            .toBuffer();

          return image;
        }));

        results = await writeToCdn(ctx, results);
        return { images: results };
      }

      return {};
    }
  }
}


export default SharpCompositeComponent;
