import { NextFunction, Request, Response } from "express";

import topicService from "../../services/admin/topic.service";

// [GET] /admin/topics/get
const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await topicService.find();
    return res.status(200).json({
      status: true,
      message: "Topics found.",
      data: topics
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const topicController = {
  get
};
export default topicController;