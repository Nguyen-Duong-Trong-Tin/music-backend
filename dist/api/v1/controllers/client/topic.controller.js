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
const topic_service_1 = __importDefault(require("../../services/client/topic.service"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_service_1.default.find();
        return res.status(200).json({
            status: true,
            message: "Topics found.",
            data: topics
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
        const topicExists = yield topic_service_1.default.findById(id);
        if (!topicExists) {
            return res.status(404).json({
                status: false,
                message: "Topic id not found."
            });
        }
        return res.status(200).json({
            status: true,
            message: "Topic found.",
            data: topicExists
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const getBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const topicExists = yield topic_service_1.default.findBySlug(slug);
        if (!topicExists) {
            return res.status(404).json({
                status: false,
                message: "Topic slug not found."
            });
        }
        return res.status(200).json({
            status: true,
            message: "Topics found.",
            data: topicExists
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const topicController = {
    get,
    getBySlug,
    getById
};
exports.default = topicController;
