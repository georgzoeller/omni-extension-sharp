import sharp from 'sharp';

// Takes an image CDNResource and updates the meta data using sharp
const updateMetaData = async (image) =>{

    if (image.data)
    {
        // update metadata
        let img = sharp(image.data);
        let metadata = await img.metadata();
        image.meta = { height: metadata.height, width: metadata.width, format: metadata.format, size: metadata.size, channels: metadata.channels };            
    }
    return image;

}
export default updateMetaData