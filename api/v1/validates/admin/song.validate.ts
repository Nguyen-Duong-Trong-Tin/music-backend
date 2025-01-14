import { NextFunction, Response } from "express";

import { ESongStatus } from "../../enums/song.enum";
import validateHelper from "../../../../helpers/validate.helper";

// [POST] /api/v1/songs/create
const create = (req: any, res: Response, next: NextFunction) => {
  try {
    const title = req.body.title;
    const lyrics = req.body.lyrics;
    const status = req.body.status;
    const topicId = req.body.topicId;
    const singerId = req.body.singerId;

    if (
      !title ||
      !lyrics ||
      !status ||
      !topicId ||
      !singerId ||
      !req.files ||
      !req.files.avatar ||
      !req.files.avatar[0] ||
      !req.files.audio ||
      !req.files.audio[0]
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required information"
      });
    }

    if (
      typeof title !== "string" ||
      typeof lyrics !== "string" ||
      typeof status !== "string" ||
      typeof topicId !== "string" ||
      typeof singerId !== "string"
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing datatype."
      });
    }

    if (!Object.values(ESongStatus).includes(status as ESongStatus)) {
      return res.status(400).json({
        status: false,
        message: "Song was incorrect."
      });
    }

    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [PATCH] /api/v1/songs/update/:id
const update = (req: any, res: Response, next: NextFunction) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const like = req.body.like;
    const listen = req.body.listen;
    const lyrics = req.body.lyrics;
    const status = req.body.status;
    const topicId = req.body.topicId;
    const singerId = req.body.singerId;

    if (
      !title &&
      !description &&
      !like &&
      listen !== undefined &&
      !lyrics &&
      !status &&
      !topicId &&
      !singerId &&
      !(req.files && req.files.avatar && req.files.avatar[0]) &&
      !(req.files && req.files.audio && req.files.audio[0])
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required information."
      });
    }

    if (
      like &&
      validateHelper.validateArray(like)
    ) {
      return res.status(400).json({
        status: false,
        message: "Like was incorrect."
      });
    }

    if (
      listen &&
      listen < 0
    ) {
      return res.status(400).json({
        status: false,
        message: "Listen was incorrect."
      });
    }

    if (
      status &&
      !Object.values(ESongStatus).includes(status as ESongStatus)
    ) {
      return res.status(400).json({
        status: false,
        message: "Status was incorrect."
      });
    }

    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const songValidate = {
  create,
  update
};
export default songValidate;