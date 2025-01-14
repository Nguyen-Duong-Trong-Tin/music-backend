"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const streamifier = require("streamifier");
const upload = (file, type) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: type }, (error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};
const cloudinaryUtil = {
    upload
};
exports.default = cloudinaryUtil;
