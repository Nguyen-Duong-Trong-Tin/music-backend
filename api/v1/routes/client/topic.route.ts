import express from "express";
const router = express.Router();

import controller from "../../controllers/client/topic.controller";

router.get("/get", controller.get);
router.get("/get/slug/:slug", controller.getBySlug);
router.get("/get/:id", controller.getById);

export default router;