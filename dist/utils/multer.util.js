"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
});
const multerUtil = {
    upload
};
exports.default = multerUtil;
