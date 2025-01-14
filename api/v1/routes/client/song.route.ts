import express from "express";
const router = express.Router();

import deserializeUser from "../../middlewares/deserializeUser.middleware";

import controller from "../../controllers/client/song.controller";

router.get("/get/:id", controller.getById);
router.get("/get/topic-slug/:topicSlug", controller.getByTopicSlug);
router.get("/get/slug/:slug", controller.getBySlug);

router.get("/search", controller.search);

router.patch(
  "/update/like/:id",
  [deserializeUser],
  controller.updateLike
);

export default router;