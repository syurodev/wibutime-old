import imageCompression from "browser-image-compression";

export function compressFile(imageFile: FileList, fileSize?: number) {
  const defaultOptions = {
    maxSizeMB: fileSize ? fileSize : 0.5,
  };
  return imageCompression(imageFile[0], defaultOptions);
}
