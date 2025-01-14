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
const song_service_1 = __importDefault(require("../../services/client/song.service"));
const favoriteSong_service_1 = __importDefault(require("../../services/client/favoriteSong.service"));
const getByMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUserId = req.user.code;
        const favoriteSongs = yield favoriteSong_service_1.default.findByUserId(myUserId);
        return res.status(200).json({
            status: true,
            message: "Favorite songs found.",
            data: favoriteSongs
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const getBySongId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUserId = req.user.code;
        const songId = req.params.songId;
        const songExists = yield song_service_1.default.findById(songId);
        if (!songExists) {
            return res.status(404).json({
                status: false,
                message: "Song id not found."
            });
        }
        const favoriteSongExists = yield favoriteSong_service_1.default.findByUserIdAndSongId(myUserId, songId);
        return res.status(200).json({
            status: true,
            message: "Favorite song found.",
            data: favoriteSongExists
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const updateBySongId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUserId = req.user.code;
        const songId = req.params.songId;
        const songExsits = yield song_service_1.default.findById(songId);
        if (!songExsits) {
            return res.status(404).json({
                status: false,
                message: "Song id not found."
            });
        }
        const favoriteSongExists = yield favoriteSong_service_1.default.findByUserIdAndSongId(myUserId, songId);
        if (favoriteSongExists) {
            yield favoriteSong_service_1.default.del(favoriteSongExists.id);
            return res.status(200).json({
                status: true,
                message: "Favorite song was deleted successfully."
            });
        }
        const newFavoriteSong = yield favoriteSong_service_1.default.create({
            userId: myUserId,
            songId
        });
        return res.status(200).json({
            status: true,
            message: "Favorite song was created successfully.",
            data: newFavoriteSong
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
});
const favoriteSongController = {
    getByMe,
    getBySongId,
    updateBySongId
};
exports.default = favoriteSongController;
