import imageCompression from "browser-image-compression";
const defaultOptions = {
  maxSizeMB: 1,
};
export function compressFile(imageFile: FileList, fileSize?: number) {
  const defaultOptions = {
    maxSizeMB: fileSize ? fileSize : 1,
  };
  return imageCompression(imageFile[0], defaultOptions);
}
