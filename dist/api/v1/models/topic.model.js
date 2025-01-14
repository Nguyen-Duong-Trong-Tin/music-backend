"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const topic_enum_1 = require("../enums/topic.enum");
const TopicSchema = new mongoose_1.default.Schema({
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
    status: {
        type: String,
        enum: Object.values(topic_enum_1.ETopicStatus),
        required: true
    }
}, {
    timestamps: true
});
const TopicModel = mongoose_1.default.model("topics", TopicSchema);
exports.default = TopicModel;
