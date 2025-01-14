"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slug_util_1 = __importDefault(require("../utils/slug.util"));
const searchHelper = (req) => {
    const find = { status: "ACTIVE" };
    const search = req.query.search;
    if (search) {
        const titleRegex = new RegExp(search, "i");
        const slug = slug_util_1.default.convert(search);
        const slugRegex = new RegExp(slug, "i");
        find.$or = [
            { title: titleRegex },
            { slug: slugRegex }
        ];
    }
    return find;
};
exports.default = searchHelper;
