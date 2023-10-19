/**
 * Copyright (c) 2023 MERCENARIES.AI PTE. LTD.
 * All rights reserved.
 */

// components/SharpBlurComponent.ts
import { OAIBaseComponent, OmniComponentMacroTypes } from "omni-sockets";
import sharp2 from "sharp";

// util/updateMetaData.ts
import sharp from "sharp";
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
      return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType, userId: ctx.userId, jobId: ctx.jobId, fileType: "image" }, Object.assign({}, image.meta, meta || {}, { user: ctx.userId }));
    } else {
      return image;
    }
  }));
};
var writeToCdn_default = writeToCdn;

// components/SharpBlurComponent.ts
var NS_OMNI = "sharp";
var blurComponent = OAIBaseComponent.create(NS_OMNI, "blur").fromScratch().set("title", "Blur Image (Sharp)").set("category", "Image Manipulation").set("description", "Blurs an image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Blurs an image, optionally using a sigmal value via Gaussian Blur",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#blur",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
blurComponent.addInput(
  blurComponent.createInput("images", "object", "image", { array: true }).set("title", "Image").set("description", "The image(s) to blur").allowMultiple(true).setRequired(true).toOmniIO()
).addInput(
  blurComponent.createInput("sigma", "number").set("description", "The sigma value for Gaussian BLur, 0 for fast blur, 0.3-1000 for Gaussian Blur Sigma").setDefault(0).setConstraints(0, 1e3).toOmniIO()
).addOutput(
  blurComponent.createOutput("images", "object", "image", { array: true }).set("title", "Images").set("description", "The blurred images").toOmniIO()
);
blurComponent.setMacro(OmniComponentMacroTypes.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      let buffer = image.data;
      let sharpImage = sharp2(buffer);
      if (payload.sigma === 0) {
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
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpBlurComponent = blurComponent.toJSON();
var SharpBlurComponent_default = SharpBlurComponent;

// components/SharpCompositeComponent.ts
import { OAIBaseComponent as OAIBaseComponent2, OmniComponentMacroTypes as OmniComponentMacroTypes2 } from "omni-sockets";
import sharp3 from "sharp";
var NS_OMNI2 = "sharp";
var component = OAIBaseComponent2.create(NS_OMNI2, "composite").fromScratch().set("description", "Composite image(s) over the processed image using various options.").set("title", "Composite Image (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Composite image(s) over the processed image with options for blending, placement, tiling, and more.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-composite",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
component.addInput(
  component.createInput("images", "array", "image", { array: true }).set("description", "Images to be processed").setRequired(true).allowMultiple(true).toOmniIO()
).addInput(
  component.createInput("compositeImages", "array", "image", { array: true }).set("description", "Images to be composited").allowMultiple(true).setRequired(true).toOmniIO()
).addInput(
  component.createInput("blend", "string").set("description", "How to blend this image with the image below.").setChoices(["clear", "source", "over", "in", "out", "atop", "dest", "dest-over", "dest-in", "dest-out", "dest-atop", "xor", "add", "saturate", "multiply", "screen", "overlay", "darken", "lighten", "colour-dodge", "color-dodge", "colour-burn", "color-burn", "hard-light", "soft-light", "difference", "exclusion"], "clear").toOmniIO()
).addInput(
  component.createInput("gravity", "string").set("description", "Gravity at which to place the overlay.").setChoices(["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest", "centre", "center"], "northeast").toOmniIO()
).addInput(
  component.createInput("top", "number").set("description", "The pixel offset from the top edge.").toOmniIO()
).addInput(
  component.createInput("left", "number").set("description", "The pixel offset from the left edge.").toOmniIO()
).addInput(
  component.createInput("tile", "boolean").set("description", "Set to true to repeat the overlay image across the entire image with the given gravity.").toOmniIO()
).addInput(
  component.createInput("premultiplied", "boolean").set("description", "Set to true to avoid premultiplying the image below.").toOmniIO()
).addInput(
  component.createInput("density", "number").set("description", "Number representing the DPI for vector overlay image.").setDefault(72).setConstraints(1, 600, 1).toOmniIO()
).addOutput(
  component.createOutput("images", "object", "image", { array: true }).set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes2.EXEC, async (payload, ctx) => {
  if (payload.images && payload.compositeImages) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let compositeImages = await Promise.all(payload.compositeImages.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image, index) => {
      image.data = await sharp3(image.data).composite(compositeImages.map((compositeImage) => ({
        input: compositeImage.data,
        blend: payload.blend,
        gravity: payload.gravity,
        top: payload.top,
        left: payload.left,
        tile: payload.tile,
        premultiplied: payload.premultiplied,
        density: payload.density
      }))).toBuffer();
      return image;
    }));
    results = await writeToCdn_default(ctx, results);
    return { images: results };
  }
  return {};
});
var SharpCompositeComponent = component.toJSON();
var SharpCompositeComponent_default = SharpCompositeComponent;

// components/SharpEnsureAlphaComponent.ts
import { OAIBaseComponent as OAIBaseComponent3, OmniComponentMacroTypes as OmniComponentMacroTypes3 } from "omni-sockets";
import sharp4 from "sharp";
var NS_OMNI3 = "sharp";
var ensureAlphaComponent = OAIBaseComponent3.create(NS_OMNI3, "ensureAlpha").fromScratch().set("title", "Ensure Alpha (Sharp)").set("category", "Image Manipulation").set("description", "Ensure the output image has an alpha transparency channel.").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Ensure the output image has an alpha transparency channel. If missing, the added alpha channel will have the specified transparency level, defaulting to fully-opaque (1). This is a no-op if the image already has an alpha channel.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-channel#ensureAlpha",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
ensureAlphaComponent.addInput(
  ensureAlphaComponent.createInput("images", "object", "image", { array: true }).set("title", "Image").set("description", "The image(s) to operate on").setRequired(true).allowMultiple(true).toOmniIO()
).addInput(
  ensureAlphaComponent.createInput("alpha", "number").set("title", "Alpha").set("description", "Alpha transparency level (0=fully-transparent, 1=fully-opaque).").setDefault(1).setConstraints(0, 1, 0.1).toOmniIO()
).addOutput(
  ensureAlphaComponent.createOutput("images", "object", "image", { array: true }).set("title", "Images").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes3.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      image.data = await sharp4(image.data).ensureAlpha(payload.alpha).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpEnsureAlphaComponent = ensureAlphaComponent.toJSON();
var SharpEnsureAlphaComponent_default = SharpEnsureAlphaComponent;

// components/SharpExtractChannelComponent.ts
import { OAIBaseComponent as OAIBaseComponent4, OmniComponentMacroTypes as OmniComponentMacroTypes4 } from "omni-sockets";
import sharp5 from "sharp";
var NS_OMNI4 = "sharp";
var extractChannelComponent = OAIBaseComponent4.create(NS_OMNI4, "extractChannel").fromScratch().set("title", "Extract Channel (Sharp)").set("category", "Image Manipulation").set("description", "Extract channels from a multi-channel image.").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Extract channel from a multi-channel image.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-channel#extractchannel",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
extractChannelComponent.addInput(
  extractChannelComponent.createInput("images", "object", "image", { array: true }).set("title", "Image").set("description", "The image(s) to operate on").allowMultiple(true).setRequired(true).toOmniIO()
).addInput(
  extractChannelComponent.createInput("channel", "string").set("title", "Channel").set("description", "The channel to extract.").setDefault("red").setChoices(["red", "green", "blue", "alpha"]).toOmniIO()
).addOutput(
  extractChannelComponent.createOutput("images", "object", "image", { array: true }).set("title", "Images").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes4.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      image.data = await sharp5(image.data).extractChannel(payload.channel).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpExtractChannelComponent = extractChannelComponent.toJSON();
var SharpExtractChannelComponent_default = SharpExtractChannelComponent;

// components/SharpExtractComponent.ts
import { OAIBaseComponent as OAIBaseComponent5, OmniComponentMacroTypes as OmniComponentMacroTypes5 } from "omni-sockets";
import sharp6 from "sharp";
var NS_OMNI5 = "sharp";
var component2 = OAIBaseComponent5.create(NS_OMNI5, "extract").fromScratch().set("description", "Extracts/Crops an image region").set("title", "Extract Image Region (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Extract/crop a region of the image. Use extract before resize for pre-resize extraction. Use extract after resize for post-resize extraction. Use extract before and after for both.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#extract",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
component2.addInput(
  component2.createInput("images", "object", "image", { array: true }).set("description", "The image(s) to extract from").setRequired(true).allowMultiple(true).setControl({
    controlType: "AlpineLabelComponent"
  }).toOmniIO()
).addInput(
  component2.createInput("left", "number").set("description", "Left").setDefault(0).setConstraints(0).toOmniIO()
).addInput(
  component2.createInput("top", "number").set("description", "Top").setDefault(0).setConstraints(0).toOmniIO()
).addInput(
  component2.createInput("width", "number").set("description", "Width").setDefault(512).setConstraints(0).toOmniIO()
).addInput(
  component2.createInput("height", "number").set("description", "Height").setDefault(512).setConstraints(0).toOmniIO()
).addOutput(
  component2.createOutput("images", "object", "image", { array: true }).set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes5.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      const { left, top, width, height } = payload;
      image.data = await sharp6(image.data).extract({ left, top, width, height }).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpExtractComponent = component2.toJSON();
var SharpExtractComponent_default = SharpExtractComponent;

// components/SharpExtendComponent.ts
import { OAIBaseComponent as OAIBaseComponent6, OmniComponentMacroTypes as OmniComponentMacroTypes6 } from "omni-sockets";
import sharp7 from "sharp";
var NS_OMNI6 = "sharp";
var component3 = OAIBaseComponent6.create(NS_OMNI6, "extend").fromScratch().set("description", "Extend / pad / extrude one or more edges of the image.").set("title", "Extend Image (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM");
component3.addInput(
  component3.createInput("images", "object", "image", { array: true }).set("description", "The image(s) to extend").setRequired(true).allowMultiple(true).setControl({
    controlType: "AlpineLabelComponent"
  }).toOmniIO()
).addInput(
  component3.createInput("extendWith", "string").set("description", "How to determine the color of the new pixels.").setChoices(["background", "copy", "repeat", "mirror"], "background").toOmniIO()
).addInput(
  component3.createInput("background", "string").set("description", 'The color of the new pixels if method "background" was chosen.').setDefault("#000000").setControl({
    controlType: "AlpineColorComponent"
  }).toOmniIO()
).addInput(
  component3.createInput("left", "integer").set("title", "Left").setDefault(0).setConstraints(0).toOmniIO()
).addInput(
  component3.createInput("top", "integer").set("title", "Top").setDefault(0).setConstraints(0).toOmniIO()
).addInput(
  component3.createInput("bottom", "integer").set("title", "Bottom").setDefault(0).setConstraints(0).toOmniIO()
).addInput(
  component3.createInput("right", "integer").set("title", "Right").setDefault(0).setConstraints(0).toOmniIO()
).addOutput(
  component3.createOutput("images", "object", "image", { array: true }).set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes6.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      const { left, right, top, bottom, extendWith, background } = payload;
      image.data = await sharp7(image.data).extend({ left, right, top, bottom, extendWith, background }).toBuffer();
      image.meta.width += left + right;
      image.meta.height += top + bottom;
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return payload;
});
var SharpExtendComponent = component3.toJSON();
var SharpExtendComponent_default = SharpExtendComponent;

// components/SharpGrayscaleComponent.ts
import { OAIBaseComponent as OAIBaseComponent7, OmniComponentMacroTypes as OmniComponentMacroTypes7 } from "omni-sockets";
import sharp8 from "sharp";
var NS_OMNI7 = "sharp";
var grayScaleComponent = OAIBaseComponent7.create(NS_OMNI7, "grayscale").fromScratch().set("title", "Grayscale Image (Sharp)").set("category", "Image Manipulation").set("description", "Convert an image to 8-bit, 256 color grayscale").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Convert to 8-bit greyscale; 256 shades of grey. This is a linear operation. If the input image is in a non-linear colour space such as sRGB, use gamma() with greyscale() for the best results. By default the output image will be web-friendly sRGB and contain three (identical) color channels. This may be overridden by other sharp operations such as toColourspace('b-w'), which will produce an output image containing one color channel. An alpha channel may be present, and will be unchanged by the operation.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#grayscale",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
grayScaleComponent.addInput(
  grayScaleComponent.createInput("images", "object", "image", { array: true }).set("title", "Image").set("description", "The image(s) to grayscale").setRequired(true).allowMultiple(true).toOmniIO()
).addInput(
  grayScaleComponent.createInput("grayscale", "boolean").set("title", "Grayscale").set("description", "Grayscale the Image").setDefault(true).toOmniIO()
).addOutput(
  grayScaleComponent.createOutput("images", "object", "image", { array: true }).set("title", "Images").set("description", "The grayscaled images").toOmniIO()
).setMacro(OmniComponentMacroTypes7.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      if (payload.grayscale) {
        image.data = await sharp8(image.data).grayscale(true).toBuffer();
      }
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results, { grayscale: payload.grayscale });
  }
  return payload;
});
var SharpGrayscaleComponent = grayScaleComponent.toJSON();
var SharpGrayscaleComponent_default = SharpGrayscaleComponent;

// components/SharpMaskedColorComponent.ts
import { OAIBaseComponent as OAIBaseComponent8, OmniComponentMacroTypes as OmniComponentMacroTypes8 } from "omni-sockets";
import sharp9 from "sharp";
var NS_OMNI8 = "sharp";
var component4 = OAIBaseComponent8.create(NS_OMNI8, "maskedColor").fromScratch().set("description", "Compute the average color of the masked portion of an image.").set("title", "Masked Color Extractor (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM");
component4.addInput(
  component4.createInput("Image", "image", "image").set("description", "Input image").setControl({ controlType: "AlpineLabelComponent" }).toOmniIO()
).addInput(
  component4.createInput("Mask", "image", "image").set("description", "Mask to apply on the image").setControl({ controlType: "AlpineLabelComponent" }).toOmniIO()
).addOutput(
  component4.createOutput("Average Color", "string", "text").toOmniIO()
);
async function BufferFromInput(cdnRecord, ctx) {
  const entry = await ctx.app.cdn.get(cdnRecord.ticket);
  return entry.data;
}
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
component4.setMacro(
  OmniComponentMacroTypes8.EXEC,
  async (payload, ctx) => {
    const imageBuffer = await BufferFromInput(payload.Image, ctx);
    const maskBuffer = await BufferFromInput(payload.Mask, ctx);
    const { data: rgbData } = await sharp9(imageBuffer).toColorspace("srgb").raw().toBuffer({ resolveWithObject: true });
    const { data: alphaData } = await sharp9(maskBuffer).greyscale().raw().toBuffer({ resolveWithObject: true });
    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
    let totalAlpha = 1e-6;
    for (let i = 0; i < alphaData.length; i++) {
      const alpha = alphaData[i];
      totalAlpha += alpha;
      totalRed += rgbData[3 * i] * alpha;
      totalGreen += rgbData[3 * i + 1] * alpha;
      totalBlue += rgbData[3 * i + 2] * alpha;
    }
    const averageRed = totalRed / totalAlpha;
    const averageGreen = totalGreen / totalAlpha;
    const averageBlue = totalBlue / totalAlpha;
    const rgb = [
      Math.round(averageRed),
      Math.round(averageGreen),
      Math.round(averageBlue)
    ];
    const hexColor = rgbToHex(
      Math.round(averageRed),
      Math.round(averageGreen),
      Math.round(averageBlue)
    );
    return { "Average Color": hexColor };
  }
);
var SharpMaskedColorComponent = component4.toJSON();
var SharpMaskedColorComponent_default = SharpMaskedColorComponent;

// components/SharpMetaDataComponent.ts
import { OAIBaseComponent as OAIBaseComponent9, OmniComponentMacroTypes as OmniComponentMacroTypes9 } from "omni-sockets";
import sharp10 from "sharp";
var NS_OMNI9 = "sharp";
var metadataComponent = OAIBaseComponent9.create(NS_OMNI9, "metadata").fromScratch().set("title", "Get Image Metadata (Sharp)").set("category", "Image Manipulation").set("description", "Returns the metadata of an image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Fast access to (uncached) image metadata without decoding any compressed pixel data. This is read from the header of the input image. It does not take into consideration any operations to be applied to the output image, such as resize or rotate.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-input#metadata",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
metadataComponent.addInput(
  metadataComponent.createInput("images", "object", "image", { array: true }).set("title", "Image").set("description", "The image(s) to inspect").setRequired(true).allowMultiple(true).toOmniIO()
).addOutput(
  metadataComponent.createOutput("metadata", "object", "objectArray").set("title", "Metadata").set("description", "Metadata of the image(s)").toOmniIO()
).setMacro(OmniComponentMacroTypes9.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      let md = await sharp10(image.data).metadata();
      return Object.assign({}, image.meta, md || {});
    }));
    payload.metadata = results;
  }
  return { metadata: payload.metadata };
});
var SharpMetaDataComponent = metadataComponent.toJSON();
var SharpMetaDataComponent_default = SharpMetaDataComponent;

// components/SharpModulateComponent.ts
import { OAIBaseComponent as OAIBaseComponent10, OmniComponentMacroTypes as OmniComponentMacroTypes10 } from "omni-sockets";
import sharp11 from "sharp";
var NS_OMNI10 = "sharp";
var modulateComponent = OAIBaseComponent10.create(NS_OMNI10, "modulate").fromScratch().set("title", "Modulate Image (Sharp)").set("category", "Image Manipulation").set("description", "Transforms the image using brightness, saturation, hue rotation, and lightness").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Transforms the image using brightness, saturation, hue rotation, and lightness. Brightness and lightness both operate on luminance, with the difference being that brightness is multiplicative whereas lightness is additive.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#modulate",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
modulateComponent.addInput(
  modulateComponent.createInput("images", "object", "image", { array: true }).set("title", "Image").set("description", "The image(s) to extend").setRequired(true).allowMultiple(true).toOmniIO()
).addInput(
  modulateComponent.createInput("brightness", "float").set("title", "Brightness").set("description", "The brightness multiplier.").setDefault(1).setConstraints(0).toOmniIO()
).addInput(
  modulateComponent.createInput("saturation", "float").set("title", "Saturation").set("description", "The saturation multiplier.").setDefault(1).setConstraints(0).toOmniIO()
).addInput(
  modulateComponent.createInput("hue", "float").set("title", "Hue Rotation").set("description", "The hue rotation in degrees.").setDefault(0).setConstraints(-360, 360, 1).toOmniIO()
).addInput(
  modulateComponent.createInput("lightness", "float").set("title", "Lightness").set("description", "The lightness addend.").setDefault(0).setConstraints(0).toOmniIO()
).addOutput(
  modulateComponent.createOutput("images", "object", "image", { array: true }).set("title", "Images").set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes10.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      const args = { ...payload };
      if (args.hue == 0) {
        delete args.hue;
      }
      image.data = await sharp11(image.data).modulate(args).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpModulateComponent = modulateComponent.toJSON();
var SharpModulateComponent_default = SharpModulateComponent;

// components/SharpNegateComponent.ts
import { OAIBaseComponent as OAIBaseComponent11, OmniComponentMacroTypes as OmniComponentMacroTypes11 } from "omni-sockets";
import sharp12 from "sharp";
var NS_OMNI11 = "sharp";
var component5 = OAIBaseComponent11.create(NS_OMNI11, "negate").fromScratch().set("description", "Negate / Invert an image using the high speed impage manipulation library Sharp for nodejs").set("title", "Negate/Invert Image (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Negate an image using the high speed impage manipulation library Sharp for nodejs",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#negate",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
component5.addInput(
  component5.createInput("images", "object", "image", { array: true }).set("description", "The image(s) to rotate").setRequired(true).allowMultiple(true).setControl({
    controlType: "AlpineLabelComponent"
  }).toOmniIO()
);
component5.addInput(
  component5.createInput("alpha", "boolean").set("description", "Whether to negate alpha").toOmniIO()
).addOutput(
  component5.createOutput("images", "object", "image", { array: true }).set("description", "The negated images").toOmniIO()
).setMacro(OmniComponentMacroTypes11.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      let buffer = image.data;
      let sharpImage = sharp12(buffer);
      sharpImage.negate({ alpha: payload.alpha });
      let result = await sharpImage.toBuffer();
      image.data = result;
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpNegateComponent = component5.toJSON();
var SharpNegateComponent_default = SharpNegateComponent;

// components/SharpPrepareImageComponent.ts
import { OAIBaseComponent as OAIBaseComponent12, OmniComponentMacroTypes as OmniComponentMacroTypes12 } from "omni-sockets";
import sharp13 from "sharp";
var NS_OMNI12 = "sharp";
var component6 = OAIBaseComponent12.create(NS_OMNI12, "prepareImage").fromScratch().set("description", "Prepare an image for further processing.").set("title", "Prepare Image (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM");
component6.addInput(
  component6.createInput("image", "object", "image").set("description", "The image to operate on").set("title", "Image").setRequired(true).allowMultiple(true).setControl({
    controlType: "AlpineLabelComponent"
  }).toOmniIO()
).addOutput(
  component6.createOutput("image", "object", "image").set("title", "Image").set("description", "The processed image").toOmniIO()
).addOutput(
  component6.createOutput("mask", "image", "image").set("title", "Mask").toOmniIO()
).addOutput(
  component6.createOutput("width", "number").set("title", "Width").toOmniIO()
).addOutput(
  component6.createOutput("height", "number").set("title", "Height").toOmniIO()
).addControl(
  component6.createControl("target").set("title", "Target").setRequired(true).setControlType("AlpineSelectComponent").setChoices([
    { title: "Stable Diffusion XL", value: "sdxl" },
    { title: "Stable Diffusion 2.1", value: "sd2.1" },
    { title: "Stable Diffusion 1.5", value: "sd1.5" },
    { title: "720p", value: "720p" },
    { title: "1080p", value: "1080p" },
    { title: "4k Wallpaper", value: "4k" },
    { title: "8k", value: "8k" },
    { title: "Facebook Banner", value: "facebook" },
    { title: "Facebook Profile", value: "fbprofile" },
    { title: "Google Meet Background", value: "gmbackground" },
    { title: "Instagram", value: "instagram" },
    { title: "Phone Wallpaper", value: "phone" },
    { title: "Snapchat", value: "snapchat" },
    { title: "Thumbnail", value: "thumbnail" },
    { title: "WeChat", value: "wechat" },
    { title: "YouTube Cover", value: "youtube" },
    { title: "A4", value: "a4" },
    { title: "US Letter", value: "us_letter" },
    { title: "Photo Portrait", value: "12x18" },
    { title: "Photo Landscape", value: "18x12" }
  ]).toOmniControl()
);
function getSize(value) {
  const sizeMap = {
    sdxl: [1024, 1024, void 0, "png"],
    "sd1.5": [512, 512, void 0, "png"],
    "sd2.1": [768, 768, void 0, "png"],
    phone: [1080, 1920, void 0, "jpg"],
    "4k": [3840, 2160, void 0, "jpg"],
    "1080p": [1920, 1080, void 0, "jpg"],
    "720p": [1280, 720, void 0, "jpg"],
    "8k": [7680, 4320, void 0, "jpg"],
    youtube: [1280, 720, void 0, "jpg"],
    facebook: [820, 312, void 0, "jpg"],
    fbprofile: [180, 180, void 0, "jpg"],
    gmbackground: [1920, 1090, void 0, "jpg"],
    instagram: [1080, 1080, void 0, "jpg"],
    snapchat: [1080, 1920, void 0, "jpg"],
    thumbnail: [150, 150, void 0, "jpg"],
    wechat: [900, 500, void 0, "jpg"],
    a4: [Math.round(8.27 * 300), Math.round(11.69 * 300), 300, "jpg"],
    // 2480 x 3508
    us_letter: [Math.round(8.5 * 300), Math.round(11 * 300), 300, "jpg"],
    // 2550 x 3300
    "12x18": [3600, 5400, 300, "jpg"],
    "18x12": [5400, 3600, 300, "jpg"]
  };
  return sizeMap[value] || [1024, 1024, void 0, "jpg"];
}
async function fetchAndProcessImage(cdnRecord, ctx) {
  const entry = await ctx.app.cdn.get(cdnRecord.ticket);
  const buffer = entry.data;
  const image = sharp13(buffer).rotate();
  const metadata = await image.metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;
  return {
    buffer,
    width,
    height,
    targetWidth: width,
    targetHeight: height
  };
}
async function createMask(imageInfo, feather) {
  const { targetWidth, targetHeight } = imageInfo;
  let { roi } = imageInfo;
  roi ?? (roi = {
    x0: 0,
    y0: 0,
    x1: targetWidth,
    y1: targetHeight
  });
  const insetROI = {
    x0: roi.x0 + (roi.x0 > 0 ? feather : 0),
    y0: roi.y0 + (roi.y0 > 0 ? feather : 0),
    x1: roi.x1 - (roi.x1 < targetWidth ? feather : 0),
    y1: roi.y1 - (roi.y1 < targetHeight ? feather : 0)
  };
  const interior = await sharp13({
    create: {
      width: insetROI.x1 - insetROI.x0,
      height: insetROI.y1 - insetROI.y0,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 }
      // Black
    }
  }).png().toBuffer();
  let intermediateBuffer = await sharp13({
    create: {
      width: targetWidth,
      height: targetHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
      // White
    }
  }).composite([
    {
      input: interior,
      top: insetROI.y0,
      left: insetROI.x0
    }
  ]).png().toBuffer();
  if (feather > 0) {
    const sigma = 1 + feather / 2;
    intermediateBuffer = await sharp13(intermediateBuffer).blur(sigma).png().toBuffer();
  }
  const maskImageData = await sharp13(intermediateBuffer).png().toBuffer();
  return maskImageData;
}
async function SoftScale(imageInfo, target) {
  const { width: originalWidth, height: originalHeight, targetWidth, targetHeight } = imageInfo;
  const scaleFactorX = targetWidth / originalWidth;
  const scaleFactorY = targetHeight / originalHeight;
  const maxScaleFactor = Math.max(scaleFactorX, scaleFactorY);
  let scaleFudge = 1.03;
  if (target === "thumbnail") {
    scaleFudge = 1.15;
  }
  const scaleFactorA = Math.min(scaleFactorX * scaleFudge, scaleFactorY * scaleFudge, maxScaleFactor);
  const scaleFactorB = Math.min(scaleFactorX * scaleFudge * scaleFudge, scaleFactorY * scaleFudge * scaleFudge, maxScaleFactor);
  let scaledWidth = Math.round(originalWidth * scaleFactorA);
  let scaledHeight = Math.round(originalHeight * scaleFactorA);
  if (scaleFactorX < scaleFactorY) {
    scaledHeight = Math.round(originalHeight * scaleFactorB);
  } else {
    scaledWidth = Math.round(originalWidth * scaleFactorB);
  }
  const newBuffer = await sharp13(imageInfo.buffer).resize(scaledWidth, scaledHeight, { fit: "fill" }).toBuffer();
  return {
    ...imageInfo,
    buffer: newBuffer,
    width: scaledWidth,
    height: scaledHeight
  };
}
async function SoftCrop(imageInfo) {
  const { width, height, targetWidth, targetHeight } = imageInfo;
  const cropX = Math.max(0, Math.round((width - targetWidth) / 2));
  const cropY = Math.max(0, Math.round((height - targetHeight) / 2));
  const newBuffer = await sharp13(imageInfo.buffer).extract({
    left: cropX,
    top: cropY,
    width: Math.min(width, targetWidth),
    height: Math.min(height, targetHeight)
  }).toBuffer();
  return {
    ...imageInfo,
    buffer: newBuffer,
    width: Math.min(width, targetWidth),
    height: Math.min(height, targetHeight)
  };
}
async function ExtendWithBlackBars(imageInfo) {
  const { width, height, targetWidth, targetHeight, roi } = imageInfo;
  let extendX = Math.round((targetWidth - width) / 2);
  let extendY = Math.round((targetHeight - height) / 2);
  if (roi) {
    const targetCenterX = targetWidth / 2;
    const targetCenterY = targetHeight / 2;
    const roiCenterX = (roi.x0 + roi.x1) / 2;
    const roiCenterY = (roi.y0 + roi.y1) / 2;
    extendX = Math.round(targetCenterX - roiCenterX);
    extendY = Math.round(targetCenterY - roiCenterY);
    extendX = Math.max(0, Math.min(extendX, targetWidth - width));
    extendY = Math.max(0, Math.min(extendY, targetHeight - height));
  }
  const newBuffer = await sharp13(imageInfo.buffer).extend({
    top: extendY,
    bottom: targetHeight - height - extendY,
    left: extendX,
    right: targetWidth - width - extendX,
    background: { r: 0, g: 0, b: 0, alpha: 1 }
    // Black
  }).toBuffer();
  return {
    ...imageInfo,
    buffer: newBuffer,
    width: targetWidth,
    height: targetHeight,
    roi: { x0: extendX, y0: extendY, x1: targetWidth - extendX, y1: targetHeight - extendY }
  };
}
async function ExtendWithBlurredBackground(imageInfo) {
  const { width, height, targetWidth, targetHeight, roi } = imageInfo;
  let extendX = Math.round((targetWidth - width) / 2);
  let extendY = Math.round((targetHeight - height) / 2);
  if (roi) {
    const targetCenterX = targetWidth / 2;
    const targetCenterY = targetHeight / 2;
    const roiCenterX = (roi.x0 + roi.x1) / 2;
    const roiCenterY = (roi.y0 + roi.y1) / 2;
    extendX = Math.round(targetCenterX - roiCenterX);
    extendY = Math.round(targetCenterY - roiCenterY);
    extendX = Math.max(0, Math.min(extendX, targetWidth - width));
    extendY = Math.max(0, Math.min(extendY, targetHeight - height));
  }
  const blurRadius = Math.max(targetWidth, targetHeight) / 32;
  const blurredBuffer = await sharp13(imageInfo.buffer).resize(targetWidth, targetHeight, { fit: "fill" }).blur(blurRadius).toBuffer();
  const newBuffer = await sharp13(blurredBuffer).composite([
    {
      input: imageInfo.buffer,
      blend: "over",
      left: extendX,
      top: extendY
    }
  ]).toBuffer();
  return {
    ...imageInfo,
    buffer: newBuffer,
    width: targetWidth,
    height: targetHeight,
    roi: { x0: extendX, y0: extendY, x1: targetWidth - extendX, y1: targetHeight - extendY }
  };
}
component6.setMacro(OmniComponentMacroTypes12.EXEC, async (payload, ctx) => {
  let source = payload.image;
  const target = payload.target;
  if (Array.isArray(source)) {
    source = source[0];
  }
  const [targetWidth, targetHeight, dpi, fileFormat] = getSize(target);
  let imageInfo = await fetchAndProcessImage(source, ctx);
  imageInfo.targetWidth = targetWidth;
  imageInfo.targetHeight = targetHeight;
  imageInfo = await SoftScale(imageInfo, target);
  imageInfo = await SoftCrop(imageInfo);
  const useBlackBars = false;
  if (useBlackBars) {
    imageInfo = await ExtendWithBlackBars(imageInfo);
  } else {
    imageInfo = await ExtendWithBlurredBackground(imageInfo);
  }
  const feather = 8;
  const maskImageData = await createMask(imageInfo, feather);
  let transform = sharp13(imageInfo.buffer);
  if (dpi) {
    transform = transform.withMetadata({ density: dpi });
  }
  if (fileFormat) {
    transform = transform.toFormat(fileFormat);
  }
  const imageData = await transform.toBuffer();
  return { image: imageData, mask: maskImageData, width: imageInfo.width, height: imageInfo.height };
});
var SharpPrepareImageComponent = component6.toJSON();
var SharpPrepareImageComponent_default = SharpPrepareImageComponent;

// components/SharpRemoveAlphaComponent.ts
import { OAIBaseComponent as OAIBaseComponent13, OmniComponentMacroTypes as OmniComponentMacroTypes13 } from "omni-sockets";
import sharp14 from "sharp";
var NS_OMNI13 = "sharp";
var component7 = OAIBaseComponent13.create(NS_OMNI13, "removeAlpha").fromScratch().set("description", "Remove alpha channel from an image, if any.").set("title", "Remove Alpha (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM");
component7.addInput(
  component7.createInput("images", "object", "image", { array: true }).set("description", "The image(s) to operate on").setRequired(true).allowMultiple(true).setControl({
    controlType: "AlpineLabelComponent"
  }).toOmniIO()
).addOutput(
  component7.createOutput("images", "object", "image", { array: true }).set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes13.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      image.data = await sharp14(image.data).removeAlpha().toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpRemoveAlphaComponent = component7.toJSON();
var SharpRemoveAlphaComponent_default = SharpRemoveAlphaComponent;

// components/SharpResizeComponent.ts
import { OAIBaseComponent as OAIBaseComponent14, OmniComponentMacroTypes as OmniComponentMacroTypes14 } from "omni-sockets";
import sharp15 from "sharp";
var NS_OMNI14 = "sharp";
var resizeComponent = OAIBaseComponent14.create(NS_OMNI14, "resize").fromScratch().set("title", "Resize Image (Sharp)").set("description", "Resize the image to given width and height using various options.").set("category", "Image Manipulation").setMethod("X-CUSTOM");
resizeComponent.addInput(
  resizeComponent.createInput("images", "object", "image", { array: true }).set("title", "Input Images").set("description", "Images to resize.").allowMultiple(true).setRequired(true).toOmniIO()
).addInput(
  resizeComponent.createInput("width", "number").set("title", "Width").setRequired(true).setConstraints(1, 8192).toOmniIO()
).addInput(
  resizeComponent.createInput("height", "number").set("title", "Height").setRequired(true).setConstraints(1, 8192).toOmniIO()
).addInput(
  resizeComponent.createInput("fit", "string").set("title", "Fit").setChoices(["cover", "contain", "fill", "inside", "outside"], "cover").set("description", "How the image should be resized to fit the target dimension(s)").toOmniIO()
).addInput(
  resizeComponent.createInput("position", "string").set("title", "Position").setChoices(["centre", "north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"], "centre").set("description", "A position to use when fit is cover or contain.").toOmniIO()
).addInput(
  resizeComponent.createInput("background", "string").set("title", "Background").setDefault("#000000").set("description", "Background colour when fit is contain.").toOmniIO()
).addInput(
  resizeComponent.createInput("kernel", "string").set("title", "Kernel").setChoices(["nearest", "cubic", "mitchell", "lanczos2", "lanczos3"], "lanczos3").set("description", "The kernel to use for image reduction.").toOmniIO()
).addInput(
  resizeComponent.createInput("withoutEnlargement", "boolean").set("title", "Without Enlargement").setDefault(false).set("description", "Do not scale up if the width or height are already less than the target dimensions.").toOmniIO()
).addInput(
  resizeComponent.createInput("fastShrinkOnLoad", "boolean").set("title", "Fast Shrink On Load").setDefault(true).set("description", "Take greater advantage of the JPEG and WebP shrink-on-load feature.").toOmniIO()
).addOutput(
  resizeComponent.createOutput("images", "object", "image", { array: true }).set("title", "Output Images").set("description", "The resized images.").toOmniIO()
).setMeta({
  source: {
    summary: "Resize the image to the given dimensions with various options for scaling, fitting, and cropping.",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-resize",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
}).setMacro(OmniComponentMacroTypes14.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
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
      image.data = await sharp15(image.data).resize(
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
      ).toBuffer();
      return image;
    }));
    results = await writeToCdn_default(ctx, results);
    return { images: results };
  }
  return {};
});
var SharpResizeComponent = resizeComponent.toJSON();
var SharpResizeComponent_default = SharpResizeComponent;

// components/SharpRotationComponent.ts
import { OAIBaseComponent as OAIBaseComponent15, OmniComponentMacroTypes as OmniComponentMacroTypes15 } from "omni-sockets";
import sharp16 from "sharp";
var NS_OMNI15 = "sharp";
var component8 = OAIBaseComponent15.create(NS_OMNI15, "rotate").fromScratch().set("description", "Rotate an image using the high speed impage manipulation library Sharp for nodejs").set("title", "Rotate Image (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Rotate an image using the high speed impage manipulation library Sharp for nodejs",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#rotate",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
component8.addInput(
  component8.createInput("images", "object", "image", { array: true }).set("description", "The image(s) to rotate").setRequired(true).allowMultiple(true).setControl({
    controlType: "AlpineLabelComponent"
  }).toOmniIO()
).addInput(
  component8.createInput("angle", "number").set("description", "The angle of rotation. (optional, default 0)").setDefault(0).setConstraints(-360, 360, 1).setControl({
    controlType: "AlpineNumWithSliderComponent"
  }).toOmniIO()
).addInput(
  component8.createInput("background", "string").set("description", "Background colour when using a non-zero angle. (optional, default black)").setDefault("black").setControl({
    controlType: "AlpineColorComponent"
  }).toOmniIO()
).addOutput(
  component8.createOutput("images", "object", "image", { array: true }).set("description", "The rotated images").toOmniIO()
).setMacro(OmniComponentMacroTypes15.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let background = payload.background || "black";
    let angle = payload.angle || 90;
    let results = await Promise.all(images.map(async (image) => {
      let buffer = image.data;
      let sharpImage = sharp16(buffer);
      sharpImage.rotate(angle, { background });
      let result = await sharpImage.toBuffer();
      image.data = result;
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpRotateComponent = component8.toJSON();
var SharpRotationComponent_default = SharpRotateComponent;

// components/SharpStatsComponent.ts
import { OAIBaseComponent as OAIBaseComponent16, OmniComponentMacroTypes as OmniComponentMacroTypes16 } from "omni-sockets";
import sharp17 from "sharp";
var NS_OMNI16 = "sharp";
var statsComponent = OAIBaseComponent16.create(NS_OMNI16, "stats").fromScratch().set("title", "Get Image Stats (Sharp)").set("category", "Image Manipulation").set("description", "Access to pixel-derived image statistics for every channel in the image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Access to pixel-derived image statistics for every channel in the image",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-input#stats",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
statsComponent.addInput(
  statsComponent.createInput("images", "object", "image", { array: true }).set("title", "Image").set("description", "The image(s) to inspect").allowMultiple(true).setRequired(true).toOmniIO()
).addOutput(
  statsComponent.createOutput("stats", "object", "objectArray").set("title", "Stats").set("description", "Pixel-derived image statistics for every channel in the image").toOmniIO()
).setMacro(OmniComponentMacroTypes16.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      let md = await sharp17(image.data).stats();
      return md;
    }));
    payload.stats = results;
  }
  return { stats: payload.stats };
});
var SharpStatsComponent = statsComponent.toJSON();
var SharpStatsComponent_default = SharpStatsComponent;

// components/SharpTintComponent.ts
import { OAIBaseComponent as OAIBaseComponent17, OmniComponentMacroTypes as OmniComponentMacroTypes17 } from "omni-sockets";
import sharp18 from "sharp";
var NS_OMNI17 = "sharp";
var tintComponent = OAIBaseComponent17.create(NS_OMNI17, "tint").fromScratch().set("title", "Tint Image (Sharp)").set("category", "Image Manipulation").set("description", "Tints an image").setMethod("X-CUSTOM").setMeta({
  source: {
    summary: "Tints an image via provided RGB values",
    links: {
      "Sharp Website": "https://sharp.pixelplumbing.com/",
      "Documentation": "https://sharp.pixelplumbing.com/api-operation#tint",
      "Sharp Github": "https://github.com/lovell/sharp",
      "Support Sharp": "https://opencollective.com/libvips"
    }
  }
});
tintComponent.addInput(
  tintComponent.createInput("images", "object", "image", { array: true }).set("title", "Image").set("description", "The image(s) to blur").allowMultiple(true).setRequired(true).toOmniIO()
).addInput(
  tintComponent.createInput("red", "number").set("description", "Tint the red channel").setDefault(0).setConstraints(0, 255, 1).toOmniIO()
).addInput(
  tintComponent.createInput("green", "number").set("description", "Tint the green channel").setDefault(0).setConstraints(0, 255, 1).toOmniIO()
).addInput(
  tintComponent.createInput("blue", "number").set("description", "Tint the blue channel").setDefault(0).setConstraints(0, 255, 1).toOmniIO()
).addOutput(
  tintComponent.createOutput("images", "object", "image", { array: true }).set("description", "The tinted images").toOmniIO()
).setMacro(OmniComponentMacroTypes17.EXEC, async (payload, ctx) => {
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
      image.data = await sharp18(image.data).tint(tint).toBuffer();
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results, { tint });
  }
  return { images: payload.images };
});
var SharpTintComponent = tintComponent.toJSON();
var SharpTintComponent_default = SharpTintComponent;

// components/SharpTrimComponent.ts
import { OAIBaseComponent as OAIBaseComponent18, OmniComponentMacroTypes as OmniComponentMacroTypes18 } from "omni-sockets";
import sharp19 from "sharp";
var NS_OMNI18 = "omnitool";
var component9 = OAIBaseComponent18.create(NS_OMNI18, "trim").fromScratch().set("description", "Trim pixels from all edges that contain values similar to the given background colour.").set("title", "Trim Image (Sharp)").set("category", "Image Manipulation").setMethod("X-CUSTOM");
component9.addInput(
  component9.createInput("images", "object", "image", { array: true }).set("description", "The image(s) to operate on").setRequired(true).allowMultiple(true).setControl({
    controlType: "AlpineLabelComponent"
  }).toOmniIO()
).addInput(
  component9.createInput("trimMode", "string").set("description", "Specify the mode for trimming: Top left pixel or Background color.").setChoices(["Top left Pixel", "Background color"], "Top left Pixel").setControl({
    controlType: "AlpineSelectComponent"
  }).toOmniIO()
).addInput(
  component9.createInput("background", "string").set("description", "Background colour to trim, used when trim mode is Background color.").setDefault("#000000").setControl({
    controlType: "AlpineColorComponent"
  }).toOmniIO()
).addInput(
  component9.createInput("threshold", "number").set("description", "The allowed difference from the above colour, a positive number.").setDefault(10).setControl({
    controlType: "AlpineNumWithSliderComponent",
    step: 1
  }).toOmniIO()
).addOutput(
  component9.createOutput("images", "object", "image", { array: true }).set("description", "The processed images").toOmniIO()
).setMacro(OmniComponentMacroTypes18.EXEC, async (payload, ctx) => {
  if (payload.images) {
    let images = await Promise.all(payload.images.map((image) => {
      return ctx.app.cdn.get(image.ticket);
    }));
    let results = await Promise.all(images.map(async (image) => {
      if (payload.trimMode === "Background color") {
        image.data = await sharp19(image.data).trim({ background: payload.background, threshold: payload.threshold }).toBuffer();
      } else {
        image.data = await sharp19(image.data).trim(payload.threshold).toBuffer();
      }
      return image;
    }));
    payload.images = await writeToCdn_default(ctx, results);
  }
  return { images: payload.images };
});
var SharpTrimComponent = component9.toJSON();
var SharpTrimComponent_default = SharpTrimComponent;

// extension.ts
var components = [
  SharpBlurComponent_default,
  SharpCompositeComponent_default,
  SharpEnsureAlphaComponent_default,
  SharpExtractChannelComponent_default,
  SharpExtractComponent_default,
  SharpExtendComponent_default,
  SharpGrayscaleComponent_default,
  SharpMaskedColorComponent_default,
  SharpMetaDataComponent_default,
  SharpModulateComponent_default,
  SharpNegateComponent_default,
  SharpPrepareImageComponent_default,
  SharpRemoveAlphaComponent_default,
  SharpResizeComponent_default,
  SharpRotationComponent_default,
  SharpStatsComponent_default,
  SharpTintComponent_default,
  SharpTrimComponent_default
];
var extension_default = {
  createComponents: () => ({
    blocks: components,
    patches: []
  })
};
export {
  extension_default as default
};
