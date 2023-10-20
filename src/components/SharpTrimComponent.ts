/**
 * Copyright (c) 2023 MERCENARIES.AI PTE. LTD.
 * All rights reserved.
 */

import { OAIBaseComponent, WorkerContext, OmniComponentMacroTypes } from 'omni-sockets'
const NS_OMNI = 'sharp';
import sharp from 'sharp'
import writeToCdn from '../util/writeToCdn'

// SharpTrimComponent
let component = OAIBaseComponent
  .create(NS_OMNI, "trim")
  .fromScratch()
  .set('description', 'Trim pixels from all edges that contain values similar to the given background colour.')
  .set('title', 'Trim Image (Sharp)')
  .set('category', 'Image Manipulation')
  .setMethod('X-CUSTOM')
component
  .addInput(
    component.createInput('images', 'object', 'image', {array: true})
      .set('description', 'The image(s) to operate on')
      .setRequired(true)
      .allowMultiple(true)
      .setControl({
        controlType: 'AlpineLabelComponent'
      })
      .toOmniIO()
  )
  .addInput(
    component.createInput('trimMode', 'string')
      .set('description', 'Specify the mode for trimming: Top left pixel or Background color.')
      .setChoices(['Top left Pixel', 'Background color'], 'Top left Pixel')
      .setControl({
        controlType: 'AlpineSelectComponent'
      })
      .toOmniIO()
  )
  .addInput(
    component.createInput('background', 'string')
      .set('description', 'Background colour to trim, used when trim mode is Background color.')
      .setDefault('#000000')
      .setControl({
        controlType: 'AlpineColorComponent'
      })
      .toOmniIO()
  )
  .addInput(
    component.createInput('threshold', 'number')
      .set('description', 'The allowed difference from the above colour, a positive number.')
      .setDefault(10)
      .setControl({
        controlType: 'AlpineNumWithSliderComponent',
        step: 1
      })
      .toOmniIO()
  )
  .addOutput(
    component.createOutput('images', 'object', 'image', {array: true})
      .set('description', 'The processed images')
      .toOmniIO()
  )
  .setMacro(OmniComponentMacroTypes.EXEC, async (payload: any, ctx: WorkerContext) => {
    if (payload.images) {
      let images = await Promise.all(payload.images.map((image: any) =>{
        return ctx.app.cdn.get(image.ticket)
      }))
      let results = await Promise.all(images.map(async (image: any) => {
        if (payload.trimMode === "Background color") {
          image.data = await sharp(image.data).trim({ background: payload.background, threshold: payload.threshold }).toBuffer()
        } else {
          image.data = await sharp(image.data).trim(payload.threshold).toBuffer()
        }
        return image
      }))
      payload.images = await writeToCdn(ctx, results)
    }
    return {images: payload.images}
  })
const SharpTrimComponent = component.toJSON()
export default SharpTrimComponent