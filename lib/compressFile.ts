import imageCompression from "browser-image-compression";

export function compressFile(imageFile: FileList, fileSize?: number) {
  const defaultOptions = {
    maxSizeMB: fileSize ? fileSize : 0.5,
  };
  if (imageFile[0].size < 716000) {
    return imageFile[0]
  } else {
    return imageCompression(imageFile[0], defaultOptions);
  }
}
