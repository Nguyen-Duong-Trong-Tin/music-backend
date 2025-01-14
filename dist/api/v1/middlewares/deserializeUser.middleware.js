"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_util_1 = __importDefault(require("../../../utils/jwt.util"));
const responseAuthenticationFailed = (res) => {
    return res.status(401).json({
        status: false,
        message: "Authentication failed."
    });
};
const responseAccessTokenExpires = (res) => {
    return res.status(401).json({
        status: false,
        message: "Access token was expires."
    });
};
const deserializeUser = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return responseAuthenticationFailed(res);
        }
        const token = authorization.split(' ');
        if (token[0] !== "Bearer" || !token[1]) {
            return responseAuthenticationFailed(res);
        }
        const accessToken = token[1];
        const verify = jwt_util_1.default.verify(accessToken);
        if (!verify.success) {
            if (!verify.expires) {
                return responseAuthenticationFailed(res);
            }
            const refreshToken = req.cookies.refreshToken;
            const verifyRefreshToken = jwt_util_1.default.verify(refreshToken);
            if (!verifyRefreshToken.success) {
                res.clearCookie("refreshToken");
                return responseAuthenticationFailed(res);
            }
            return responseAccessTokenExpires(res);
        }
        req.user = verify.user;
        return next();
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
};
exports.default = deserializeUser;
