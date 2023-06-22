// components.ts
import sharp from "sharp";
var SharpRotationComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "rotate",
    "operation": {
      "schema": {
        "title": "Rotate",
        "type": "object",
        required: [],
        "properties": {
          "angle": {
            "title": "\xB0 Angle",
            "type": "number",
            "default": 90,
            "description": `Rotate the output image by either an explicit angle or auto-orient based on the EXIF Orientation tag.
              If an angle is provided, it is converted to a valid positive degree rotation. For example, -450 will produce a 270deg rotation.
              When rotating by an angle other than a multiple of 90, the background colour can be provided with the background option.
              If no angle is provided, it is determined from the EXIF data. Mirroring is supported and may infer the use of a flip operation. number`
          }
        }
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
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Rotate Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Rotates an image",
      "meta": {
        "source": {
          "summary": "Rotate an image using the high speed impage manipulation library Sharp for nodejs",
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-operation#rotate",
            "Sharp Github": "https://github.com/lovell/sharp",
            "Support Sharp": "https://opencollective.com/libvips"
          }
        }
      },
      inputs: {
        "images": {
          "type": "object",
          "x-type": "imageArray",
          "title": "Image",
          "description": "The image(s) to rotate",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
          }
        },
        "angle": {
          maximum: 360,
          minimum: -360,
          default: 0,
          step: 1,
          description: "The angle of rotation. (optional, default 0)",
          control: {
            "type": "AlpineNumWithSliderComponent"
          }
        },
        "background": {
          "type": "string",
          "x-type": "text",
          "title": "Background",
          "description": "Background colour when using a non-zero angle. (optional, default black)",
          "default": "black",
          control: {
            "type": "AlpineColorComponent"
          }
        }
      }
    }
  },
  functions: {
    _exec: async (payload, ctx) => {
      if (payload.images) {
        let images = await Promise.all(payload.images.map((image) => {
          return ctx.app.cdn.get(image.ticket);
        }));
        let background = payload.background || "black";
        let angle = payload.angle || 90;
        let results = await Promise.all(images.map(async (image) => {
          let buffer = image.data;
          let sharpImage = sharp(buffer);
          sharpImage.rotate(angle, { background });
          let result = await sharpImage.toBuffer();
          image.data = result;
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta, { rotation: angle }));
        }));
        payload.images = results;
      }
      return payload;
    }
  }
};
var SharpBlurComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "blur",
    "operation": {
      "schema": {
        "title": "Blur",
        "type": "object",
        required: [],
        "properties": {
          "sigma": {
            "title": "Sigma",
            "type": "number",
            "default": 0,
            "minimum": 0,
            "maximum": 1e3,
            "description": `Blur the image.
              When used without parameters, performs a fast 3x3 box blur (equivalent to a box linear filter).
              When a sigma is provided, performs a slower, more accurate Gaussian blur.r`
          }
        }
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
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Blur Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Blurs an image",
      "meta": {
        "source": {
          "summary": "Blurs an image, optionally using a sigmal value via Gaussian Blur",
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-operation#blur",
            "Sharp Github": "https://github.com/lovell/sharp",
            "Support Sharp": "https://opencollective.com/libvips"
          }
        }
      },
      inputs: {
        "images": {
          "type": "object",
          "x-type": "imageArray",
          "title": "Image",
          "description": "The image(s) to blur",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
          }
        },
        "sigma": {
          minimum: 0,
          maximum: 3e3,
          default: 0,
          description: "The sigma value for Gaussian BLur, 0 for fast blur, 0.3-1000 for Gaussian Blur Sigma",
          control: {
            "type": "AlpineNumComponent"
          }
        }
      }
    }
  },
  functions: {
    _exec: async (payload, ctx) => {
      if (payload.images) {
        let images = await Promise.all(payload.images.map((image) => {
          return ctx.app.cdn.get(image.ticket);
        }));
        let results = await Promise.all(images.map(async (image) => {
          let buffer = image.data;
          let sharpImage = sharp(buffer);
          if (payload.sigma == 0) {
            sharpImage.blur();
          }
          if (payload.sigma > 0) {
            let sigma = Math.max(0.3, Math.min(1e3, payload.sigma));
            sharpImage.blur(sigma);
          }
          let result = await sharpImage.toBuffer();
          image.data = result;
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta));
        }));
        payload.images = results;
      }
      return payload;
    }
  }
};
var SharpTintComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "tint",
    "operation": {
      "schema": {
        "title": "Tint Image",
        "type": "object",
        required: [],
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
        }
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
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Tint Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Tints an image",
      "meta": {
        "source": {
          "summary": "Tints an image via provided RGB values",
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-operation#tint",
            "Sharp Github": "https://github.com/lovell/sharp",
            "Support Sharp": "https://opencollective.com/libvips"
          }
        }
      },
      inputs: {
        "images": {
          "type": "object",
          "x-type": "imageArray",
          "title": "Image",
          "description": "The image(s) to blur",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
          }
        },
        "red": {
          step: 1,
          control: {
            "type": "AlpineNumWithSliderComponent"
          }
        },
        "green": {
          step: 1,
          control: {
            "type": "AlpineNumWithSliderComponent"
          }
        },
        "blue": {
          step: 1,
          control: {
            "type": "AlpineNumWithSliderComponent"
          }
        }
      }
    }
  },
  functions: {
    _exec: async (payload, ctx) => {
      if (payload.images) {
        let images = await Promise.all(payload.images.map((image) => {
          return ctx.app.cdn.get(image.ticket);
        }));
        let results = await Promise.all(images.map(async (image) => {
          let buffer = image.data;
          let sharpImage = sharp(buffer);
          sharpImage.tint({ r: payload.red, g: payload.green, b: payload.blue });
          let result = await sharpImage.toBuffer();
          image.data = result;
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta));
        }));
        payload.images = results;
      }
      return payload;
    }
  }
};
var components = [SharpRotationComponent, SharpBlurComponent, SharpTintComponent];
var components_default = (FactoryFn) => {
  return components.map((c) => FactoryFn(c.schema, c.functions));
};

// extension.ts
var extensionHooks = {};
var extension_default = { hooks: extensionHooks, createComponents: components_default };
export {
  extension_default as default
};
