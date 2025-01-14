import express from "express";
const router = express.Router();

import deserializeUser from "../../middlewares/deserializeUser.middleware";
import restrictTo from "../../middlewares/restrictTo.middleware";

import validate from "../../validates/admin/user.validate";
import controller from "../../controllers/admin/user.controller";

router.get(
  "/get",
  [deserializeUser, restrictTo(["ADMIN"])],
  controller.get
);
router.get(
  "/get/me",
  [deserializeUser, restrictTo(["ADMIN"])],
  controller.getMe
);

router.post(
  "/login",
  validate.login,
  controller.login
);

export default router;