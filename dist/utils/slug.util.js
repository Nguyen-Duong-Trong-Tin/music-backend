"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slug = require("slug");
const convert = (value) => {
    return slug(value);
};
const slugUtil = {
    convert
};
exports.default = slugUtil;
