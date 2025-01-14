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
const user_model_1 = __importDefault(require("../../models/user.model"));
const find_helper_1 = __importDefault(require("../../../../helpers/find.helper"));
const find = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const find = (0, find_helper_1.default)(req);
    const users = yield user_model_1.default
        .find(find)
        .select("-password");
    return users;
});
const findById = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, status, role }) {
    ;
    const find = { _id: id };
    if (status) {
        find.status = status;
    }
    if (role) {
        find.role = role;
    }
    const userExists = yield user_model_1.default
        .findOne(find)
        .select("-password");
    return userExists;
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_model_1.default
        .findOne({
        email,
        password,
        status: user_enum_1.EUserStatus.ACTIVE,
        role: user_enum_1.EUserRole.ADMIN
    })
        .select("-password");
    return userExists;
});
const userService = {
    find,
    findById,
    login
};
exports.default = userService;
