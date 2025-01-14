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
const song_service_1 = __importDefault(require("../../services/client/song.service"));
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const songExists = yield song_service_1.default.findById(id);
        if (!songExists) {
            return res.status(404).json({
                status: false,
                message: "Song id not found."
            });
        }
        return res.status(200).json({
            status: true,
            message: "Song found.",
            data: songExists
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const getByTopicSlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topicSlug = req.params.topicSlug;
        const topicExists = yield topic_service_1.default.findBySlug(topicSlug);
        if (!topicExists) {
            return res.status(404).json({
                status: false,
                message: "Topic slug not found."
            });
        }
        const songs = yield song_service_1.default.findByTopicId(topicExists.id);
        return res.status(200).json({
            status: true,
            message: "Songs found.",
            data: songs
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
        const songExists = yield song_service_1.default.findBySlug(slug);
        if (!songExists) {
            return res.status(404).json({
                status: false,
                message: "Song slug not found."
            });
        }
        return res.status(200).json({
            status: true,
            message: "Song found.",
            data: songExists
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield song_service_1.default.search(req);
        return res.status(200).json({
            status: true,
            message: "Songs found.",
            data: songs
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const updateLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUserId = req.user.code;
        const id = req.params.id;
        const songIdExists = yield song_service_1.default.findById(id);
        if (!songIdExists) {
            return res.status(404).json({
                status: false,
                message: "Song id not found."
            });
        }
        const newSong = yield song_service_1.default.updateLike(id, myUserId);
        return res.status(200).json({
            status: true,
            message: "Song was updated successfully.",
            data: newSong
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const songController = {
    getById,
    getByTopicSlug,
    getBySlug,
    search,
    updateLike
};
exports.default = songController;
