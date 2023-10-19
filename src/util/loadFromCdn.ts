/**
 * Copyright (c) 2023 MERCENARIES.AI PTE. LTD.
 * All rights reserved.
 */



// Writes an array of images objectsto the CDN
const loadFromCdn = async (ctx: any, images) => {    
  return Promise.all(images.filter((image: any) => image.ticket != null).
    map((image: any) =>{
    return ctx.app.cdn.get(image.ticket)
  }))
}
export default loadFromCdn