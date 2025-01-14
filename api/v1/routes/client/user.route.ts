import express from "express";
const router = express.Router();

import validate from "../../validates/client/user.validate";
import controller from "../../controllers/client/user.controller";
import deserializeUser from "../../middlewares/deserializeUser.middleware";

router.get(
  "/get/me",
  [deserializeUser],
  controller.getMe
);
router.get("/get/:id", controller.getById);

router.post(
  "/register",
  validate.register,
  controller.register
);
router.post(
  "/login",
  validate.login,
  controller.login
);
router.post("/refresh-token", controller.refreshToken);

export default router;