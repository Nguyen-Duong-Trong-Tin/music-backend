import express from "express";
const router = express.Router();

import controller from "../../controllers/admin/topic.controller";

router.get("/get", controller.get);

export default router;