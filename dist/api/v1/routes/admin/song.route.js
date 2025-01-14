"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const song_validate_1 = __importDefault(require("../../validates/admin/song.validate"));
const song_controller_1 = __importDefault(require("../../controllers/admin/song.controller"));
const multer_util_1 = __importDefault(require("../../../../utils/multer.util"));
router.get("/get", song_controller_1.default.get);
router.get("/get/:id", song_controller_1.default.getById);
router.post("/create", multer_util_1.default.upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 }
]), song_validate_1.default.create, song_controller_1.default.create);
router.patch("/update/:id", multer_util_1.default.upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 }
]), song_validate_1.default.update, song_controller_1.default.update);
exports.default = router;
