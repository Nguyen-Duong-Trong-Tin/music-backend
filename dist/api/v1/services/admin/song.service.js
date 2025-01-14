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
const song_model_1 = __importDefault(require("../../models/song.model"));
const find = () => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({});
    return songs;
});
const findBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(slug, "i");
    const songs = yield song_model_1.default.find({ slug: regex });
    return songs;
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const songExists = yield song_model_1.default.findOne({ _id: id });
    return songExists;
});
const create = (song) => __awaiter(void 0, void 0, void 0, function* () {
    const newSong = new song_model_1.default(song);
    yield newSong.save();
    return newSong;
});
const update = (id, song) => __awaiter(void 0, void 0, void 0, function* () {
    const newSong = yield song_model_1.default.findOneAndUpdate({
        _id: id
    }, song, {
        new: true,
        runValidators: true
    });
    return newSong;
});
const songService = {
    find,
    findBySlug,
    findById,
    create,
    update
};
exports.default = songService;
