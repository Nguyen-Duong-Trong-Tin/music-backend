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
const favoriteSong_model_1 = __importDefault(require("../../models/favoriteSong.model"));
const findByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteSongs = yield favoriteSong_model_1.default.find({ userId });
    return favoriteSongs;
});
const findByUserIdAndSongId = (userId, songId) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteSongExists = yield favoriteSong_model_1.default.findOne({ userId, songId });
    return favoriteSongExists;
});
const create = (favoriteSong) => __awaiter(void 0, void 0, void 0, function* () {
    const newFavoriteSong = new favoriteSong_model_1.default(favoriteSong);
    yield newFavoriteSong.save();
    return newFavoriteSong;
});
const del = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield favoriteSong_model_1.default.deleteOne({ _id: id });
});
const favoriteSongService = {
    findByUserId,
    findByUserIdAndSongId,
    create,
    del
};
exports.default = favoriteSongService;
