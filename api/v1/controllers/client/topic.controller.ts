import { Request, Response } from "express";

import topicService from "../../services/client/topic.service";
import { log } from "node:console";

// [GET] /topics/get
const get = async (req: Request, res: Response) => {
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

// [GET] /topics/get/:id
const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const topicExists = await topicService.findById(id);
    if (!topicExists) {
      return res.status(404).json({
        status: false,
        message: "Topic id not found."
      });
    }
    return res.status(200).json({
      status: true,
      message: "Topic found.",
      data: topicExists
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [GET] /topics/get/slug/:slug
const getBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const topicExists = await topicService.findBySlug(slug);
    if (!topicExists) {
      return res.status(404).json({
        status: false,
        message: "Topic slug not found."
      });
    }
    return res.status(200).json({
      status: true,
      message: "Topics found.",
      data: topicExists
    })
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const topicController = {
  get,
  getBySlug,
  getById
};
export default topicController;