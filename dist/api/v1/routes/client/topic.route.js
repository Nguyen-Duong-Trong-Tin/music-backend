"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const topic_controller_1 = __importDefault(require("../../controllers/client/topic.controller"));
router.get("/get", topic_controller_1.default.get);
router.get("/get/slug/:slug", topic_controller_1.default.getBySlug);
router.get("/get/:id", topic_controller_1.default.getById);
exports.default = router;
