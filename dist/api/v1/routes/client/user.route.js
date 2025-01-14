"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_validate_1 = __importDefault(require("../../validates/client/user.validate"));
const user_controller_1 = __importDefault(require("../../controllers/client/user.controller"));
const deserializeUser_middleware_1 = __importDefault(require("../../middlewares/deserializeUser.middleware"));
router.get("/get/me", [deserializeUser_middleware_1.default], user_controller_1.default.getMe);
router.get("/get/:id", user_controller_1.default.getById);
router.post("/register", user_validate_1.default.register, user_controller_1.default.register);
router.post("/login", user_validate_1.default.login, user_controller_1.default.login);
router.post("/refresh-token", user_controller_1.default.refreshToken);
exports.default = router;
