import sharp from 'sharp' 
import writeToCdn from '../util/writeToCdn'

const SharpResizeComponent = 
{
  schema:
  {
    "tags": ['default'],
    "componentKey": "resize",
    "operation": {
      "schema": {
        "title": "Resize Image",
        "type": "object",
        required:[ "width", "height"],
        "properties": {
          "width": {
            "title": "Width",
            "type": "number",
            "minimum": 1,
            "maximum": 8192,            
          },
          "height": {
            "title": "Height",
            "type": "number",
            "minimum": 1,
            "maximum": 8192,            
          },
          "fit": {
            "title": "Fit",
            "type": "string",
            "enum": ["cover", "contain", "fill", "inside", "outside"],
            "default": "cover",
            "description": "How the image should be resized to fit the target dimension(s)"
          },
          "position": {
            "title": "Position",
            "type": "string",
            "enum": ["centre", "north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"],
            "default": "centre",
            "description": "A position to use when fit is cover or contain."
          },
          "background": {
            "title": "Background",
            "type": "string",
            "default": "#000000",
            "description": "Background colour when fit is contain."
          },
          "kernel": {
            "title": "Kernel",
            "type": "string",
            "enum": ["nearest", "cubic", "mitchell", "lanczos2", "lanczos3"],
            "default": "lanczos3",
            "description": "The kernel to use for image reduction."
          },
          "withoutEnlargement": {
            "title": "Without Enlargement",
            "type": "boolean",
            "default": false,
            "description": "Do not scale up if the width or height are already less than the target dimensions."
          },
          "fastShrinkOnLoad": {
            "title": "Fast Shrink On Load",
            "type": "boolean",
            "default": true,
            "description": "Take greater advantage of the JPEG and WebP shrink-on-load feature."
          }
        },
      },
      "responseTypes": {
        "200": {
          "schema": {
            "required": ["images"],
            "type": "string",
            "properties": {
              "images": {
                "title": "Images",
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
    patch: {
      "title": "Resize Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Resize the image to given width and height using various options.",
      "meta": {
        "source": {
          "summary": "Resize the image to the given dimensions with various options for scaling, fitting, and cropping.",
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-resize",
            "Sharp Github": "https://github.com/lovell/sharp",
            "Support Sharp": "https://opencollective.com/libvips"
          }
        },
      },
      inputs: {
        "images": {
          "type": "object",
          "x-type": "imageArray",
          "required": true,
          "title": "Input Images",
          "description": "Images to resize."
        },
      },
      outputs: {
        "images": {
          "type": "object",
          "x-type": "imageArray",
          "title": "Output Images",
          "description": "The resized images."
        }
      }
    }
  },
  functions: {
    _exec: async (payload, ctx) =>
    {

      
      if (payload.images) {
        // get buffer
        let images = await Promise.all(payload.images.map((image) => {
          return ctx.app.cdn.get(image.ticket)
        }));
  
        let results = await Promise.all(images.map(async (image) => {
          let width = payload.width;
          let height = payload.height;
          let fit = payload.fit;
          let position = payload.position;
          let background = payload.background;
          let kernel = payload.kernel;
          let withoutEnlargement = payload.withoutEnlargement;
          let fastShrinkOnLoad = payload.fastShrinkOnLoad;
  
          image.data = await sharp(image.data)
            .resize(width, height, { 
              fit,
              position,
              background,
              kernel,
              withoutEnlargement,
              fastShrinkOnLoad
            })
            .toBuffer();
            
          
          
          return image;
        }));

        
  
        // write new record
        results = await writeToCdn(ctx, results)
          
        return {images: results}
      }
  
      return {};
    }
  }
}
export default SharpResizeComponent