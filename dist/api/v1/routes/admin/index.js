"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = __importDefault(require("../../../../configs"));
const deserializeUser_middleware_1 = __importDefault(require("../../middlewares/deserializeUser.middleware"));
const restrictTo_middleware_1 = __importDefault(require("../../middlewares/restrictTo.middleware"));
const user_route_1 = __importDefault(require("./user.route"));
const topic_route_1 = __importDefault(require("./topic.route"));
const song_route_1 = __importDefault(require("./song.route"));
const clientRoutesV1 = (app) => {
    const baseUrlAdmin = `/api/v1/${configs_1.default.PATH_ADMIN}`;
    app.use(`${baseUrlAdmin}/users`, user_route_1.default);
    app.use(`${baseUrlAdmin}/topics`, [deserializeUser_middleware_1.default, (0, restrictTo_middleware_1.default)(["ADMIN"])], topic_route_1.default);
    app.use(`${baseUrlAdmin}/songs`, [deserializeUser_middleware_1.default, (0, restrictTo_middleware_1.default)(["ADMIN"])], song_route_1.default);
};
exports.default = clientRoutesV1;
