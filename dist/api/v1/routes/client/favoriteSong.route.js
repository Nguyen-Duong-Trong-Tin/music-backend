"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const deserializeUser_middleware_1 = __importDefault(require("../../middlewares/deserializeUser.middleware"));
const favoriteSong_controller_1 = __importDefault(require("../../controllers/client/favoriteSong.controller"));
router.get("/get/me", [deserializeUser_middleware_1.default], favoriteSong_controller_1.default.getByMe);
router.get("/get/song-id/:songId", [deserializeUser_middleware_1.default], favoriteSong_controller_1.default.getBySongId);
router.patch("/update/song-id/:songId", [deserializeUser_middleware_1.default], favoriteSong_controller_1.default.updateBySongId);
exports.default = router;
