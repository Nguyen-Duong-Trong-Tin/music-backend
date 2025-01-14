import express from "express";
const router = express.Router();

import deserializeUser from "../../middlewares/deserializeUser.middleware";

import controller from "../../controllers/client/favoriteSong.controller";

router.get(
  "/get/me",
  [deserializeUser],
  controller.getByMe
);
router.get(
  "/get/song-id/:songId",
  [deserializeUser],
  controller.getBySongId
);

router.patch(
  "/update/song-id/:songId",
  [deserializeUser],
  controller.updateBySongId
);

export default router;