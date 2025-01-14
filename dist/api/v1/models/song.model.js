"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const song_enum_1 = require("../enums/song.enum");
const SongSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    avatar: {
        type: String,
        required: true
    },
    like: {
        type: Array
    },
    listen: {
        type: Number
    },
    lyrics: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(song_enum_1.ESongStatus),
        required: true
    },
    topicId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "topics",
        required: true
    },
    singerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "singers",
        required: true
    }
}, {
    timestamps: true
});
const SongModel = mongoose_1.default.model("songs", SongSchema);
exports.default = SongModel;
