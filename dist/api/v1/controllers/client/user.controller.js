"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_enum_1 = require("../../enums/user.enum");
const user_service_1 = __importDefault(require("../../services/client/user.service"));
const md5_util_1 = __importDefault(require("../../../../utils/md5.util"));
const jwt_util_1 = __importDefault(require("../../../../utils/jwt.util"));
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUserId = req.user.code;
        const me = yield user_service_1.default.findById(myUserId);
        return res.status(200).json({
            status: true,
            message: "Me found.",
            data: me
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userExists = yield user_service_1.default.findById(id);
        if (!userExists) {
            return res.status(404).json({
                status: false,
                message: "User id not found."
            });
        }
        return res.status(200).json({
            status: false,
            message: "User found.",
            data: userExists
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullName = req.body.fullName;
        const email = req.body.email;
        const password = md5_util_1.default.encodePassword(req.body.password);
        const avatar = req.body.avatar;
        const role = req.body.role;
        const userExists = yield user_service_1.default.findByEmail(email);
        if (userExists) {
            return res.status(400).json({
                status: false,
                message: "User email was exists."
            });
        }
        const newUser = yield user_service_1.default.register({
            fullName,
            email,
            password,
            avatar,
            role,
            slug: fullName,
            status: user_enum_1.EUserStatus.ACTIVE
        });
        return res.status(201).json({
            status: true,
            message: "User was registered successfully.",
            data: newUser
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = md5_util_1.default.encodePassword(req.body.password);
        const userExists = yield user_service_1.default.login(email, password);
        if (!userExists) {
            return res.status(400).json({
                status: false,
                message: "Email or password were incorrect."
            });
        }
        const user = {
            code: userExists.id,
            role: userExists.role
        };
        const accessToken = jwt_util_1.default.generate(user, "1d");
        const refreshToken = jwt_util_1.default.generate(user, "7d");
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        return res.status(200).json({
            status: true,
            message: "Login successfully.",
            data: {
                accessToken,
                refreshToken
            }
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        const verify = jwt_util_1.default.verify(refreshToken);
        if (!verify.success) {
            return res.status(401).json({
                status: false,
                message: "Authentication failed."
            });
        }
        const userExists = yield user_service_1.default.findById(verify.user.code);
        if (!userExists) {
            return res.status(404).json({
                status: false,
                message: "User id not found."
            });
        }
        const accessToken = jwt_util_1.default.generate({
            code: userExists.id,
            role: userExists.role
        }, "1d");
        return res.status(200).json({
            status: true,
            message: "Token was refreshed successfully.",
            data: { accessToken }
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const userController = {
    getMe,
    getById,
    register,
    login,
    refreshToken
};
exports.default = userController;
