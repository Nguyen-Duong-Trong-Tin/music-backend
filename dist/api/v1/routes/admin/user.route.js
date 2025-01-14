"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const deserializeUser_middleware_1 = __importDefault(require("../../middlewares/deserializeUser.middleware"));
const restrictTo_middleware_1 = __importDefault(require("../../middlewares/restrictTo.middleware"));
const user_validate_1 = __importDefault(require("../../validates/admin/user.validate"));
const user_controller_1 = __importDefault(require("../../controllers/admin/user.controller"));
router.get("/get", [deserializeUser_middleware_1.default, (0, restrictTo_middleware_1.default)(["ADMIN"])], user_controller_1.default.get);
router.get("/get/me", [deserializeUser_middleware_1.default, (0, restrictTo_middleware_1.default)(["ADMIN"])], user_controller_1.default.getMe);
router.post("/login", user_validate_1.default.login, user_controller_1.default.login);
exports.default = router;
