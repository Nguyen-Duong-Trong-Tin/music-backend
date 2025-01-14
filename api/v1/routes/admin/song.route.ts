import express from "express";
const router = express.Router();

import validate from "../../validates/admin/song.validate";

import controller from "../../controllers/admin/song.controller";

import multer from "../../../../utils/multer.util";

router.get("/get", controller.get);
router.get("/get/:id", controller.getById);

router.post(
  "/create",
  multer.upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  validate.create,
  controller.create
);

router.patch(
  "/update/:id",
  multer.upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  validate.update,
  controller.update
);

export default router;