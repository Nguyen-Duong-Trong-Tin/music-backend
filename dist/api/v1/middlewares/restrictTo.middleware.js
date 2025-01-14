"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseNoAccess = (res) => {
    return res.status(403).json({
        status: false,
        message: "No access"
    });
};
const restrictTo = (roles) => (req, res, next) => {
    try {
        const user = req.user;
        if (!roles.includes(user.role)) {
            return responseNoAccess(res);
        }
        return next();
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
};
exports.default = restrictTo;
