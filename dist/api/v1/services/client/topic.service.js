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
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const find = () => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        status: topic_enum_1.ETopicStatus.ACTIVE
    });
    return topics;
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const topicExists = yield topic_model_1.default.findOne({
        _id: id,
        status: topic_enum_1.ETopicStatus.ACTIVE
    });
    return topicExists;
});
const findBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const topicExists = yield topic_model_1.default.findOne({
        slug: slug,
        status: topic_enum_1.ETopicStatus.ACTIVE
    });
    return topicExists;
});
const topicService = {
    find,
    findById,
    findBySlug
};
exports.default = topicService;
