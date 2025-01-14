"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const FavoriteSongSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    songId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "songs",
        required: true
    }
}, {
    timestamps: true
});
const FavoriteSongModel = mongoose_1.default.model("favorite_songs", FavoriteSongSchema);
exports.default = FavoriteSongModel;
