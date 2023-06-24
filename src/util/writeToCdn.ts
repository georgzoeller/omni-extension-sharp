import updateMetaData from './updateMetaData';

// Writes an array of images objectsto the CDN
const writeToCdn = async (ctx: any, images: any, meta?:any) => {
  console.log("writeToCdn")
  
  return Promise.all(images.map(async (image: any) => {
    // Update image metadata    
    // Write to CDN    
    if (image.data != null)
    {
      console.log('image', image.data)
      await updateMetaData(image)
      console.log('post-meta', image.data)
      return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType }, Object.assign({}, image.meta, meta || {}));
    }
    else
    {      
      console.log('no image data')
      return image
    }
  }));
}
export default writeToCdn