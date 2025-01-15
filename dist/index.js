"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require('cors');
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://music-frontend-sigma.vercel.app",
        "http://localhost:8080",
        "https://music-admin-jet.vercel.app"
    ],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_config_1 = __importDefault(require("./configs/database.config"));
(0, database_config_1.default)();
const client_1 = __importDefault(require("./api/v1/routes/client"));
(0, client_1.default)(app);
const admin_1 = __importDefault(require("./api/v1/routes/admin"));
(0, admin_1.default)(app);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
