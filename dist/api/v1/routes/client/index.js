"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const topic_route_1 = __importDefault(require("./topic.route"));
const song_route_1 = __importDefault(require("./song.route"));
const favoriteSong_route_1 = __importDefault(require("./favoriteSong.route"));
const clientRoutesV1 = (app) => {
    const baseUrl = "/api/v1";
    app.use(`${baseUrl}/users`, user_route_1.default);
    app.use(`${baseUrl}/topics`, topic_route_1.default);
    app.use(`${baseUrl}/songs`, song_route_1.default);
    app.use(`${baseUrl}/favorite-songs`, favoriteSong_route_1.default);
};
exports.default = clientRoutesV1;
