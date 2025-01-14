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
const song_enum_1 = require("../../enums/song.enum");
const song_model_1 = __importDefault(require("../../models/song.model"));
const search_helper_1 = __importDefault(require("../../../../helpers/search.helper"));
const search = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const search = (0, search_helper_1.default)(req);
    const songs = yield song_model_1.default.find(search);
    return songs;
});
const findByTopicId = (topicId) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        topicId: topicId,
        status: song_enum_1.ESongStatus.ACTIVE
    });
    return songs;
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const songExists = yield song_model_1.default.findOne({
        _id: id,
        status: song_enum_1.ESongStatus.ACTIVE
    });
    return songExists;
});
const findBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const songExists = yield song_model_1.default.findOne({
        slug: slug,
        status: song_enum_1.ESongStatus.ACTIVE
    });
    return songExists;
});
const updateLike = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const songExists = yield song_model_1.default.findOne({
        _id: id,
        like: userId,
        status: song_enum_1.ESongStatus.ACTIVE
    });
    let newSong;
    if (songExists) {
        newSong = yield song_model_1.default.findOneAndUpdate({ _id: id }, { $pull: { like: userId } }, { new: true });
    }
    else {
        newSong = yield song_model_1.default.findOneAndUpdate({ _id: id }, { $push: { like: userId } }, { new: true });
    }
    return newSong;
});
const songService = {
    search,
    findByTopicId,
    findById,
    findBySlug,
    updateLike
};
exports.default = songService;
