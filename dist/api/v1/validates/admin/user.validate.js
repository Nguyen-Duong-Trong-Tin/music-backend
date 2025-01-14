"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login = (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email ||
            !password) {
            return res.status(400).json({
                status: false,
                message: "Missing required information."
            });
        }
        if (typeof email !== "string" ||
            typeof password !== "string") {
            return res.status(400).json({
                status: false,
                message: "Missing datatype."
            });
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
const userValidate = {
    login
};
exports.default = userValidate;
