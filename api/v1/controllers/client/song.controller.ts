import { Request, Response } from "express";

import topicService from "../../services/client/topic.service";
import songService from "../../services/client/song.service";

// [GET] /songs/get/:id 
const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const songExists = await songService.findById(id);
    if (!songExists) {
      return res.status(404).json({
        status: false,
        message: "Song id not found."
      });
    }
    return res.status(200).json({
      status: true,
      message: "Song found.",
      data: songExists
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [GET] /songs/get/topic-slug/:topicSlug
const getByTopicSlug = async (req: Request, res: Response) => {
  try {
    const topicSlug = req.params.topicSlug;

    const topicExists = await topicService.findBySlug(topicSlug);
    if (!topicExists) {
      return res.status(404).json({
        status: false,
        message: "Topic slug not found."
      });
    }

    const songs = await songService.findByTopicId(topicExists.id);
    return res.status(200).json({
      status: true,
      message: "Songs found.",
      data: songs
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [GET] /songs/get/slug/:slug
const getBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const songExists = await songService.findBySlug(slug);
    if (!songExists) {
      return res.status(404).json({
        status: false,
        message: "Song slug not found."
      });
    }
    return res.status(200).json({
      status: true,
      message: "Song found.",
      data: songExists
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [GET] /songs/search?search=:search
const search = async (req: Request, res: Response) => {
  try {
    const songs = await songService.search(req);
    return res.status(200).json({
      status: true,
      message: "Songs found.",
      data: songs
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [PATCH] /songs/update/like/:id
const updateLike = async (req: any, res: Response) => {
  try {
    const myUserId: string = req.user.code;

    const id = req.params.id;
    const songIdExists = await songService.findById(id);
    if (!songIdExists) {
      return res.status(404).json({
        status: false,
        message: "Song id not found."
      });
    }

    const newSong = await songService.updateLike(id, myUserId);
    return res.status(200).json({
      status: true,
      message: "Song was updated successfully.",
      data: newSong
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const songController = {
  getById,
  getByTopicSlug,
  getBySlug,
  search,
  updateLike
};
export default songController;