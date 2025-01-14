"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const deserializeUser_middleware_1 = __importDefault(require("../../middlewares/deserializeUser.middleware"));
const song_controller_1 = __importDefault(require("../../controllers/client/song.controller"));
router.get("/get/:id", song_controller_1.default.getById);
router.get("/get/topic-slug/:topicSlug", song_controller_1.default.getByTopicSlug);
router.get("/get/slug/:slug", song_controller_1.default.getBySlug);
router.get("/search", song_controller_1.default.search);
router.patch("/update/like/:id", [deserializeUser_middleware_1.default], song_controller_1.default.updateLike);
exports.default = router;
