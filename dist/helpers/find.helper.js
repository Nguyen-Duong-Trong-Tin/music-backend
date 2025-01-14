"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findHelper = (req) => {
    const find = {};
    const role = req.query.role;
    if (role) {
        find.role = role;
    }
    return find;
};
exports.default = findHelper;
