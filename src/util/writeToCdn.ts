import updateMetaData from './updateMetaData';

// Writes an array of images objectsto the CDN
const writeToCdn = async (ctx: any, images: any, meta?:any) => {
  console.log("writeToCdn")

  return Promise.all(images.map(async (image: any) => {
    // Update image metadata
    // Write to CDN
    if (image.data != null)
    {
      await updateMetaData(image)
      return ctx.app.cdn.putTemp(image.data, { mimeType: image.mimeType, userId: ctx.userId, fileType: 'image' }, Object.assign({}, image.meta, meta || {}, {user: ctx.userId}));
    }
    else
    {
      return image
    }
  }));
}
export default writeToCdn