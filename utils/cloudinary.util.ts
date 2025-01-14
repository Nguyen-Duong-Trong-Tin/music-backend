import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
const streamifier = require("streamifier");

const upload = (file: any, type: "video" | "image") => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { resource_type: type },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

const cloudinaryUtil = {
  upload
};
export default cloudinaryUtil;