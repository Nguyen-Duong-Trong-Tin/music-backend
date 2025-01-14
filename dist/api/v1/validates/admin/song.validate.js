"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const song_enum_1 = require("../../enums/song.enum");
const validate_helper_1 = __importDefault(require("../../../../helpers/validate.helper"));
const create = (req, res, next) => {
    try {
        const title = req.body.title;
        const lyrics = req.body.lyrics;
        const status = req.body.status;
        const topicId = req.body.topicId;
        const singerId = req.body.singerId;
        if (!title ||
            !lyrics ||
            !status ||
            !topicId ||
            !singerId ||
            !req.files ||
            !req.files.avatar ||
            !req.files.avatar[0] ||
            !req.files.audio ||
            !req.files.audio[0]) {
            return res.status(400).json({
                status: false,
                message: "Missing required information"
            });
        }
        if (typeof title !== "string" ||
            typeof lyrics !== "string" ||
            typeof status !== "string" ||
            typeof topicId !== "string" ||
            typeof singerId !== "string") {
            return res.status(400).json({
                status: false,
                message: "Missing datatype."
            });
        }
        if (!Object.values(song_enum_1.ESongStatus).includes(status)) {
            return res.status(400).json({
                status: false,
                message: "Song was incorrect."
            });
        }
        return next();
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
};
const update = (req, res, next) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const like = req.body.like;
        const listen = req.body.listen;
        const lyrics = req.body.lyrics;
        const status = req.body.status;
        const topicId = req.body.topicId;
        const singerId = req.body.singerId;
        if (!title &&
            !description &&
            !like &&
            listen !== undefined &&
            !lyrics &&
            !status &&
            !topicId &&
            !singerId &&
            !(req.files && req.files.avatar && req.files.avatar[0]) &&
            !(req.files && req.files.audio && req.files.audio[0])) {
            return res.status(400).json({
                status: false,
                message: "Missing required information."
            });
        }
        if (like &&
            validate_helper_1.default.validateArray(like)) {
            return res.status(400).json({
                status: false,
                message: "Like was incorrect."
            });
        }
        if (listen &&
            listen < 0) {
            return res.status(400).json({
                status: false,
                message: "Listen was incorrect."
            });
        }
        if (status &&
            !Object.values(song_enum_1.ESongStatus).includes(status)) {
            return res.status(400).json({
                status: false,
                message: "Status was incorrect."
            });
        }
        return next();
    }
    catch (_a) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong."
        });
    }
};
const songValidate = {
    create,
    update
};
exports.default = songValidate;
