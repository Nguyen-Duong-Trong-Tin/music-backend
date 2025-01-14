import express from "express";
const app = express();

import bodyParser from "body-parser";
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require('cors');
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:8080",
    "https://music-admin-jet.vercel.app"
  ],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

import dotenv from "dotenv";
dotenv.config();

import connectDatabase from "./configs/database.config";
connectDatabase();

// Routes
import clientRoutesV1 from "./api/v1/routes/client";
clientRoutesV1(app);

import adminRoutesV1 from "./api/v1/routes/admin";
adminRoutesV1(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});