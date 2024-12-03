import config from "@/config";

const ImagePath = (url: string): string => {
  return `${config.apiUrl}/file/${url}`;
};

export default ImagePath
