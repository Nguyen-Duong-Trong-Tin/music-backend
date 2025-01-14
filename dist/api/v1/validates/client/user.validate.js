"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_enum_1 = require("../../enums/user.enum");
const validate_helper_1 = __importDefault(require("../../../../helpers/validate.helper"));
const register = (req, res, next) => {
    try {
        const fullName = req.body.fullName;
        const email = req.body.email;
        const password = req.body.password;
        const avatar = req.body.avatar;
        const role = req.body.role;
        if (!fullName ||
            !email ||
            !password ||
            !avatar ||
            !role) {
            return res.status(400).json({
                status: false,
                message: "Missing required information."
            });
        }
        if (typeof fullName !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof avatar !== "string" ||
            typeof role !== "string") {
            return res.status(400).json({
                status: false,
                message: "Missing datatype."
            });
        }
        if (!validate_helper_1.default.validateEmail(email)) {
            return res.status(400).json({
                status: false,
                message: "Email was incorrect."
            });
        }
        if (!validate_helper_1.default.validatePassowrd(password)) {
            return res.status(400).json({
                status: false,
                message: "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
            });
        }
        if (!Object.values(user_enum_1.EUserRole).includes(role) ||
            role === "ADMIN") {
            return res.status(400).json({
                status: false,
                message: "User role was incorrect."
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
    register,
    login
};
exports.default = userValidate;
