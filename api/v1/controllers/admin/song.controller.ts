import { Request, Response } from "express";

import { ETopicStatus } from "../../enums/topic.enum";
import { EUserRole, EUserStatus } from "../../enums/user.enum";

import songService from "../../services/admin/song.service";
import topicService from "../../services/admin/topic.service";
import userService from "../../services/admin/user.service";

import cloudinaryUtil from "../../../../utils/cloudinary.util";
import slugUtil from "../../../../utils/slug.util";

// [GET] /api/v1/songs/get
const get = async (req: Request, res: Response) => {
  try {
    const songs = await songService.find();
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

// [GET] /api/v1/songs/get/:id
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

// [POST] /api/v1/songs/create
const create = async (req: any, res: Response) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const lyrics = req.body.lyrics;
    const status = req.body.status;
    const topicId = req.body.topicId;
    const singerId = req.body.singerId;

    let slug = slugUtil.convert(title);
    const songs = await songService.findBySlug(slug);
    if (songs.length) {
      slug += "-" + (songs.length + 1);
    }

    const listen = 0;

    const topicExists = await topicService.findById({ id: topicId, status: ETopicStatus.ACTIVE });
    if (!topicExists) {
      return res.status(404).json({
        status: false,
        message: "Topic id not found."
      });
    }

    const singerExists = await userService.findById({
      id: singerId,
      status: EUserStatus.ACTIVE,
      role: EUserRole.SINGER
    });
    if (!singerExists) {
      return res.status(404).json({
        status: false,
        message: "Singer id not found."
      });
    }

    const avatar = (await cloudinaryUtil.upload(req.files.avatar[0], "image")).url;
    const audio = (await cloudinaryUtil.upload(req.files.audio[0], "video")).url;

    const newSong = await songService.create({
      title,
      slug,
      description,
      avatar,
      listen,
      lyrics,
      audio,
      status,
      topicId,
      singerId
    });
    return res.status(201).json({
      status: true,
      message: "Song was created successfully.",
      data: newSong
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [PATCH] /api/v1/songs/update/:id
const update = async (req: any, res: Response) => {
  try {
    const id = req.params.id;

    const title = req.body.title;
    const description = req.body.description;
    const like = req.body.like;
    const listen = req.body.listen;
    const lyrics = req.body.lyrics;
    const status = req.body.status;
    const topicId = req.body.topicId;
    const singerId = req.body.singerId;

    const songExists = await songService.findById(id);
    if (!songExists) {
      return res.status(404).json({
        status: false,
        message: "Song id not found."
      });
    }

    let slug;
    if (title) {
      slug = slugUtil.convert(title);

      const songs = await songService.findBySlug(slug);
      if (songs.length) {
        slug += "-" + (songs.length + 1);
      }
    }

    if (like) {
      for (const item of like) {
        const userExists = await userService.findById(item);
        if (!userExists) {
          return res.status(404).json({
            status: false,
            message: "User id not found."
          });
        }
      }
    }


    if (topicId) {
      const topicExists = await topicService.findById({ id: topicId, status: ETopicStatus.ACTIVE });
      if (!topicExists) {
        return res.status(404).json({
          status: false,
          message: "Topic id not found."
        });
      }
    }

    if (singerId) {
      const singerExists = await userService.findById({ id: singerId, role: EUserRole.SINGER });
      if (!singerExists) {
        return res.status(404).json({
          status: false,
          message: "Singer id not found."
        });
      }
    }

    let avatar;
    if (req.files && req.files.avatar && req.files.avatar[0]) {
      avatar = (await cloudinaryUtil.upload(req.files.avatar[0], "image")).url;
    }

    let audio;
    if (req.files && req.files.audio && req.files.audio[0]) {
      audio = (await cloudinaryUtil.upload(req.files.audio[0], "video")).url;
    }

    const newSong = await songService.update(id, {
      title,
      slug,
      description,
      like,
      listen,
      lyrics,
      status,
      topicId,
      singerId,
      avatar,
      audio
    });
    return res.status(200).json({
      status: true,
      message: "Song was updated successfully.",
      data: newSong
    })
  } catch(e) {
    console.log(e);
    
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const songController = {
  get,
  getById,
  create,
  update
};
export default songController;