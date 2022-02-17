import Compress from "compress.js";

export async function resizeImage(file:File) {
    const compress = new Compress()
    const resizedImage = await compress.compress([file], {
      size: 5, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 3000, // the max width of the output image, defaults to 1920px
      maxHeight: 3000, // the max height of the output image, defaults to 1920px
      resize: false // defaults to true, set false if you do not want to resize the image width and height
    })
    const img = resizedImage[0];
    const base64str = img.data
    const imgExt = img.ext
    const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
    return resizedFiile;
}