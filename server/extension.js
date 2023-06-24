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
        const tint = {
          r: parseInt(payload.red),
          g: parseInt(payload.green),
          b: parseInt(payload.blue)
        };
        let results = await Promise.all(images.map(async (image) => {
          image.data = await sharp(image.data).tint(tint).toBuffer();
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta, { tint }));
        }));
        payload.images = results;
      }
      return payload;
    }
  }
};
var SharpGrayscaleComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "grayscale",
    "operation": {
      "schema": {
        "title": "Grayscale Image",
        "type": "object",
        required: [],
        "properties": {
          "grayscale": {
            "title": "Grayscale",
            "type": "boolean",
            "default": true,
            "description": `Grayscale the Image`
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
                "description": "The grayscaled images"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Grayscale Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Convert an image to 8-bit, 256 color grayscale",
      "meta": {
        "source": {
          "summary": "Convert to 8-bit greyscale; 256 shades of grey. This is a linear operation. If the input image is in a non-linear colour space such as sRGB, use gamma() with greyscale() for the best results. By default the output image will be web-friendly sRGB and contain three (identical) color channels. This may be overridden by other sharp operations such as toColourspace('b-w'), which will produce an output image containing one color channel. An alpha channel may be present, and will be unchanged by the operation.",
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-operation#grayscale",
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
          "description": "The image(s) to grayscale",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
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
          if (payload.grayscale) {
            image.data = await sharp(image.data).grayscale(true).toBuffer();
          }
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          if (payload.grayscale) {
            return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta, { grayscale: payload.grayscale }));
          } else {
            delete image.data;
            return image;
          }
        }));
        payload.images = results;
      }
      return payload;
    }
  }
};
var SharpExtractComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "extract",
    "operation": {
      "schema": {
        "title": "Extract Image",
        "type": "object",
        required: [],
        "properties": {
          "left": {
            "title": "Left",
            "type": "number",
            "default": 0,
            "minimum": 0
          },
          "top": {
            "title": "Top",
            "type": "number",
            "default": 0,
            "minimum": 0
          },
          "width": {
            "title": "Width",
            "type": "number",
            "default": 512,
            "minimum": 0
          },
          "height": {
            "title": "height",
            "type": "number",
            "default": 512,
            "minimum": 0
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
                "description": "The processed images"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Extract Image Region (Sharp)",
      "category": "Image Manipulation",
      "summary": "Extracts/Crops an image region",
      "meta": {
        "source": {
          "summary": `Extract/crop a region of the image.
            Use extract before resize for pre-resize extraction.
            Use extract after resize for post-resize extraction.
            Use extract before and after for both.`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-operation#extract",
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
          "description": "The image(s) to extract from",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
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
          const { left, top, width, height } = payload;
          image.data = await sharp(image.data).extract({ left, top, width, height }).toBuffer();
          image.meta.width = width;
          image.meta.height = height;
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
var SharpTrimComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "trim",
    "operation": {
      "schema": {
        "title": "Trim Image",
        "type": "object",
        required: [],
        "properties": {
          "trimMode": {
            "title": "Trim Mode",
            "type": "string",
            "enum": ["Top left Pixel", "Background color"],
            "default": "Top left Pixel",
            "description": "Specify the mode for trimming: Top left pixel or Background color."
          },
          "background": {
            "title": "Background",
            "type": "string",
            "default": "#000000",
            "description": "Background colour to trim, used when trim mode is 'Background color'."
          },
          "threshold": {
            "title": "Threshold",
            "type": "number",
            "default": 10,
            "description": "The allowed difference from the above colour, a positive number."
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
                "description": "The processed images"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Trim Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Trim pixels from all edges that contain values similar to the given background colour.",
      "meta": {
        "source": {
          "summary": `Trim pixels from all edges that contain values similar to the given background colour, which defaults to that of the top-left pixel. Images with an alpha channel will use the combined bounding box of alpha and non-alpha channels.`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-operation#trim",
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
          "description": "The image(s) to operate on",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
          }
        },
        "trimMode": {
          "control": {
            "type": "AlpineSelectComponent"
          }
        },
        "background": {
          "control": {
            "type": "AlpineColorComponent"
          }
        },
        "threshold": {
          "step": 1,
          "control": {
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
          if (payload.trimMode === "Background color") {
            image.data = await sharp(image.data).trim({ background: payload.background, threshold: payload.threshold }).toBuffer();
          } else {
            image.data = await sharp(image.data).trim(payload.threshold).toBuffer();
          }
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta));
        }));
        payload.images = results;
      }
      return { images: payload.images };
    }
  }
};
var SharpExtendComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "extend",
    "operation": {
      "schema": {
        "title": "Extend Image",
        "type": "object",
        required: [],
        "properties": {
          "left": {
            "title": "Left",
            "type": "integer",
            "default": 0,
            "minimum": 0
          },
          "top": {
            "title": "Top",
            "type": "integer",
            "default": 0,
            "minimum": 0
          },
          "bottom": {
            "title": "Bottom",
            "type": "integer",
            "default": 0,
            "minimum": 0
          },
          "right": {
            "title": "Right",
            "type": "integer",
            "default": 0,
            "minimum": 0
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
                "description": "The processed images"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Extend Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Extend / pad / extrude one or more edges of the image.",
      "meta": {
        "source": {
          "summary": `Extend / pad / extrude one or more edges of the image with either the provided background colour or pixels derived from the image. This operation will always occur after resizing and extraction, if any.`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-resize#extend",
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
          "description": "The image(s) to extend",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
          }
        },
        "extendWith": {
          "type": "string",
          "title": "Method",
          "description": "How to determine the color of the new pixels.",
          "choices": ["background", "copy", "repeat", "mirror"],
          "default": "background"
        },
        "background": {
          "type": "string",
          "x-type": "text",
          "title": "Background",
          "description": "The color of the new pixels if method 'background' was chosen.",
          "control": {
            type: "AlpineColorComponent"
          },
          "default": "#000000"
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
          const { left, right, top, bottom, extendWith, background } = payload;
          image.data = await sharp(image.data).extend({ left, right, top, bottom, extendWith, background }).toBuffer();
          image.meta.width += left + right;
          image.meta.height += top + bottom;
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
var SharpModulateComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "modulate",
    "operation": {
      "schema": {
        "title": "Modulate Image",
        "type": "object",
        required: [],
        "properties": {
          "brightness": {
            "title": "Brightness",
            "type": "float",
            "default": 1,
            "minimum": 0,
            "description": "The brightness multiplier."
          },
          "saturation": {
            "title": "Saturation",
            "type": "float",
            "default": 1,
            "minimum": 0,
            "description": "The saturation multiplier."
          },
          "hue": {
            "title": "Hue Rotation",
            "type": "float",
            "default": 0,
            "minimum": -360,
            "maximum": 360,
            "description": "The hue rotation in degrees."
          },
          "lightness": {
            "title": "Lightness",
            "type": "float",
            "default": 0,
            "minimum": 0,
            "description": "The lightness addend."
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
                "description": "The processed images"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Modulate Image (Sharp)",
      "category": "Image Manipulation",
      "summary": "Transforms the image using brightness, saturation, hue rotation, and lightness",
      "meta": {
        "source": {
          "summary": `Transforms the image using brightness, saturation, hue rotation, and lightness. Brightness and lightness both operate on luminance, with the difference being that brightness is multiplicative whereas lightness is additive.`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-operation#modulate",
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
          "description": "The image(s) to extend",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
          }
        },
        "hue": {
          "step": 1,
          "control": {
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
          const args = { ...payload };
          if (args.hue == 0) {
            delete args.hue;
          }
          image.data = await sharp(image.data).modulate(args).toBuffer();
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta));
        }));
        payload.images = results;
      }
      return { images: payload.images };
    }
  }
};
var SharpExtractChannelComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "extractChannel",
    "operation": {
      "schema": {
        "title": "Extract Channel",
        "type": "object",
        required: [],
        "properties": {
          "channel": {
            "title": "Channel",
            "type": "string",
            "enum": ["red", "green", "blue", "alpha"],
            "default": "red",
            "description": "The channel to extract."
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
                "description": "The processed images"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Extract Channel (Sharp)",
      "category": "Image Manipulation",
      "summary": "Extract channels from a multi-channel image.",
      "meta": {
        "source": {
          "summary": `Extract channel from a multi-channel image.`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-channel#extractchannel",
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
          "description": "The image(s) to operate on",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
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
          image.data = await sharp(image.data).extractChannel(payload.channel).toBuffer();
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta));
        }));
        payload.images = results;
      }
      return { images: payload.images };
    }
  }
};
var SharpMetaDataComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "metadata",
    "operation": {
      "schema": {
        "title": "Get Image Metadata",
        "type": "object",
        required: [],
        "properties": {}
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
                "x-type": "objectArray"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Get Image Metadata (Sharp)",
      "category": "Image Manipulation",
      "summary": "Returns the metadata of an image",
      "meta": {
        "source": {
          "summary": `Fast access to (uncached) image metadata without decoding any compressed pixel data.

            This is read from the header of the input image. It does not take into consideration any operations to be applied to the output image, such as resize or rotate..`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-input#metadata",
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
          "description": "The image(s) to inspect",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
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
          let md = await sharp(image.data).metadata();
          return Object.assign({}, image.meta, md || {});
        }));
        payload.metadata = results;
      }
      return payload;
    }
  }
};
var SharpStatsComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "stats",
    "operation": {
      "schema": {
        "title": "Get Image Statistics",
        "type": "object",
        required: [],
        "properties": {}
      },
      "responseTypes": {
        "200": {
          "schema": {
            "required": [
              "stats"
            ],
            "type": "string",
            "properties": {
              "stats": {
                "title": "Stats",
                "type": "object",
                "x-type": "objectArray"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Get Image Stats (Sharp)",
      "category": "Image Manipulation",
      "summary": "Access to pixel-derived image statistics for every channel in the image",
      "meta": {
        "source": {
          "summary": `Access to pixel-derived image statistics for every channel in the image`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-input#stats",
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
          "description": "The image(s) to inspect",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
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
          let md = await sharp(image.data).stats();
          return md;
        }));
        payload.stats = results;
      }
      return payload;
    }
  }
};
var SharpRemoveAlphaComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "removeAlpha",
    "operation": {
      "schema": {
        "title": "Remove Alpha",
        "type": "object",
        required: [],
        "properties": {}
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
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Remove Alpha (Sharp)",
      "category": "Image Manipulation",
      "summary": "Remove alpha channel from an image, if any.",
      "meta": {
        "source": {
          "summary": `Remove alpha channel from an image, if any. This is a no-op if the image does not have an alpha channel.`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-channel#removeAlpha",
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
          "description": "The image(s) to operate on",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
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
          image.data = await sharp(image.data).removeAlpha().toBuffer();
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta));
        }));
        payload.images = results;
      }
      return { images: payload.images };
    }
  }
};
var SharpEnsureAlphaComponent = {
  schema: {
    "tags": ["default"],
    "componentKey": "ensureAlpha",
    "operation": {
      "schema": {
        "title": "Ensure Alpha",
        "type": "object",
        required: [],
        "properties": {
          "alpha": {
            "title": "Alpha",
            "type": "number",
            "default": 1,
            "minimum": 0,
            "maximum": 1,
            "description": "Alpha transparency level (0=fully-transparent, 1=fully-opaque)."
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
                "description": "The processed images"
              }
            }
          },
          "contentType": "application/json"
        }
      },
      "method": "X-CUSTOM"
    },
    patch: {
      "title": "Ensure Alpha (Sharp)",
      "category": "Image Manipulation",
      "summary": "Ensure the output image has an alpha transparency channel.",
      "meta": {
        "source": {
          "summary": `Ensure the output image has an alpha transparency channel. If missing, the added alpha channel will have the specified transparency level, defaulting to fully-opaque (1). This is a no-op if the image already has an alpha channel.`,
          links: {
            "Sharp Website": "https://sharp.pixelplumbing.com/",
            "Documentation": "https://sharp.pixelplumbing.com/api-channel#ensureAlpha",
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
          "description": "The image(s) to operate on",
          "required": true,
          "control": {
            "type": "AlpineLabelComponent"
          }
        },
        "alpha": {
          "step": 0.1,
          "control": {
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
          image.data = await sharp(image.data).ensureAlpha(payload.alpha).toBuffer();
          return image;
        }));
        results = await Promise.all(results.map((image) => {
          return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta));
        }));
        payload.images = results;
      }
      return { images: payload.images };
    }
  }
};
var components = [SharpRotationComponent, SharpTrimComponent, SharpBlurComponent, SharpTintComponent, SharpGrayscaleComponent, SharpExtractComponent, SharpMetaDataComponent, SharpStatsComponent, SharpExtendComponent, SharpModulateComponent, SharpExtractChannelComponent, SharpRemoveAlphaComponent, SharpEnsureAlphaComponent];
var components_default = (FactoryFn) => {
  return components.map((c) => FactoryFn(c.schema, c.functions));
};

// extension.ts
var extensionHooks = {};
var extension_default = { hooks: extensionHooks, createComponents: components_default };
export {
  extension_default as default
};
