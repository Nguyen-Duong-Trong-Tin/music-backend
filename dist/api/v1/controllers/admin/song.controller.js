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
const topic_enum_1 = require("../../enums/topic.enum");
const user_enum_1 = require("../../enums/user.enum");
const song_service_1 = __importDefault(require("../../services/admin/song.service"));
const topic_service_1 = __importDefault(require("../../services/admin/topic.service"));
const user_service_1 = __importDefault(require("../../services/admin/user.service"));
const cloudinary_util_1 = __importDefault(require("../../../../utils/cloudinary.util"));
const slug_util_1 = __importDefault(require("../../../../utils/slug.util"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield song_service_1.default.find();
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
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const lyrics = req.body.lyrics;
        const status = req.body.status;
        const topicId = req.body.topicId;
        const singerId = req.body.singerId;
        let slug = slug_util_1.default.convert(title);
        const songs = yield song_service_1.default.findBySlug(slug);
        if (songs.length) {
            slug += "-" + (songs.length + 1);
        }
        const listen = 0;
        const topicExists = yield topic_service_1.default.findById({ id: topicId, status: topic_enum_1.ETopicStatus.ACTIVE });
        if (!topicExists) {
            return res.status(404).json({
                status: false,
                message: "Topic id not found."
            });
        }
        const singerExists = yield user_service_1.default.findById({
            id: singerId,
            status: user_enum_1.EUserStatus.ACTIVE,
            role: user_enum_1.EUserRole.SINGER
        });
        if (!singerExists) {
            return res.status(404).json({
                status: false,
                message: "Singer id not found."
            });
        }
        const avatar = (yield cloudinary_util_1.default.upload(req.files.avatar[0], "image")).url;
        const audio = (yield cloudinary_util_1.default.upload(req.files.audio[0], "video")).url;
        const newSong = yield song_service_1.default.create({
            title,
            slug,
            description,
            avatar,
            listen,
            lyrics,
            audio,
            status,
            topicId,
            singerId
        });
        return res.status(201).json({
            status: true,
            message: "Song was created successfully.",
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
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const like = req.body.like;
        const listen = req.body.listen;
        const lyrics = req.body.lyrics;
        const status = req.body.status;
        const topicId = req.body.topicId;
        const singerId = req.body.singerId;
        const songExists = yield song_service_1.default.findById(id);
        if (!songExists) {
            return res.status(404).json({
                status: false,
                message: "Song id not found."
            });
        }
        let slug;
        if (title) {
            slug = slug_util_1.default.convert(title);
            const songs = yield song_service_1.default.findBySlug(slug);
            if (songs.length) {
                slug += "-" + (songs.length + 1);
            }
        }
        if (like) {
            for (const item of like) {
                const userExists = yield user_service_1.default.findById(item);
                if (!userExists) {
                    return res.status(404).json({
                        status: false,
                        message: "User id not found."
                    });
                }
            }
        }
        if (topicId) {
            const topicExists = yield topic_service_1.default.findById({ id: topicId, status: topic_enum_1.ETopicStatus.ACTIVE });
            if (!topicExists) {
                return res.status(404).json({
                    status: false,
                    message: "Topic id not found."
                });
            }
        }
        if (singerId) {
            const singerExists = yield user_service_1.default.findById({ id: singerId, role: user_enum_1.EUserRole.SINGER });
            if (!singerExists) {
                return res.status(404).json({
                    status: false,
                    message: "Singer id not found."
                });
            }
        }
        let avatar;
        if (req.files && req.files.avatar && req.files.avatar[0]) {
            avatar = (yield cloudinary_util_1.default.upload(req.files.avatar[0], "image")).url;
        }
        let audio;
        if (req.files && req.files.audio && req.files.audio[0]) {
            audio = (yield cloudinary_util_1.default.upload(req.files.audio[0], "video")).url;
        }
        const newSong = yield song_service_1.default.update(id, {
            title,
            slug,
            description,
            like,
            listen,
            lyrics,
            status,
            topicId,
            singerId,
            avatar,
            audio
        });
        return res.status(200).json({
            status: true,
            message: "Song was updated successfully.",
            data: newSong
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const songController = {
    get,
    getById,
    create,
    update
};
exports.default = songController;
