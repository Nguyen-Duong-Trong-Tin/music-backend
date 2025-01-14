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
const user_service_1 = __importDefault(require("../../services/admin/user.service"));
const md5_util_1 = __importDefault(require("../../../../utils/md5.util"));
const jwt_util_1 = __importDefault(require("../../../../utils/jwt.util"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.default.find(req);
        return res.status(200).json({
            status: true,
            message: "Users found.",
            data: users
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUserId = req.user.code;
        const userExists = yield user_service_1.default.findById({
            id: myUserId,
            status: user_enum_1.EUserStatus.ACTIVE
        });
        if (!userExists) {
            return res.status(404).json({
                status: false,
                message: "User id not found."
            });
        }
        return res.status(200).json({
            status: true,
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
        const accessToken = jwt_util_1.default.generate({
            code: userExists.id,
            role: userExists.role
        }, "1d");
        return res.status(200).json({
            status: true,
            message: "Login successfully.",
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
    get,
    getMe,
    login
};
exports.default = userController;
