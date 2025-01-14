"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const user_enum_1 = require("../api/v1/enums/user.enum");
;
const generate = (user, expiresIn) => {
    return jwt.sign(user, process.env.TOKEN, { expiresIn: expiresIn });
};
const verify = (token) => {
    const result = {
        success: false,
        expires: false,
        user: { code: "", role: user_enum_1.EUserRole.USER }
    };
    jwt.verify(token, process.env.TOKEN, (e, user) => {
        if (e) {
            if (e.name === "TokenExpiredError")
                result.expires = true;
            return;
        }
        result.success = true;
        result.user = user;
    });
    return result;
};
const jwtUtil = {
    generate,
    verify
};
exports.default = jwtUtil;
