import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'omni-sockets'
import sharp from 'sharp'

const NS_OMNI = 'sharp'

// SharpMaskedColorComponent
let component = OAIBaseComponent
  .create(NS_OMNI, 'maskedColor')
  .fromScratch()
  .set('description', 'Compute the average color of the masked portion of an image.')
  .set('title', 'Masked Color Extractor (Sharp)')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
component
  .addInput(
    component.createInput('Image', 'image', 'image')
      .set('description', 'Input image')
      .setControl({ controlType: 'AlpineLabelComponent' })
      .toOmniIO()
  )
  .addInput(
    component.createInput('Mask', 'image', 'image')
      .set('description', 'Mask to apply on the image')
      .setControl({ controlType: 'AlpineLabelComponent' })
      .toOmniIO()
  )
  .addOutput(
    component.createOutput('Average Color', 'string', 'text').toOmniIO()
  )

async function BufferFromInput(cdnRecord: any, ctx: WorkerContext): Promise<Buffer> {
  const entry = await ctx.app.cdn.get(cdnRecord.ticket)
  return entry.data
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

component.setMacro(
  OmniComponentMacroTypes.EXEC,
  async (payload: any, ctx: WorkerContext) => {

  // Fetch the image and mask data
  const imageBuffer = await BufferFromInput(payload.Image, ctx);
  const maskBuffer = await BufferFromInput(payload.Mask, ctx);

  // Extract raw RGB and alpha data from the masked image
  const { data: rgbData } = await sharp(imageBuffer)
    .toColorspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: alphaData } = await sharp(maskBuffer)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

    let totalRed = 0
    let totalGreen = 0
    let totalBlue = 0
    let totalAlpha = 0.000001

    // Iterate over the alpha data to compute the weighted average RGB
    for (let i = 0; i < alphaData.length; i++) {
      const alpha = alphaData[i]
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

    //const rgbString = `rgb(${rgb.join(', ')})`;
    //return { 'Average Color': rgbString };

    const hexColor = rgbToHex(
      Math.round(averageRed),
      Math.round(averageGreen),
      Math.round(averageBlue)
    );

    return { 'Average Color': hexColor };
  }
)

const SharpMaskedColorComponent = component.toJSON();
export default SharpMaskedColorComponent;


