import { Response } from "express";

import songService from "../../services/client/song.service";
import favoriteSongService from "../../services/client/favoriteSong.service";

// [GET] /favorite-songs/get/me
const getByMe = async (req: any, res: Response) => {
  try {
    const myUserId = req.user.code;

    const favoriteSongs = await favoriteSongService.findByUserId(myUserId);
    return res.status(200).json({
      status: true,
      message: "Favorite songs found.",
      data: favoriteSongs
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [GET] /favorite-songs/get/:songId
const getBySongId = async (req: any, res: Response) => {
  try {
    const myUserId: string = req.user.code;
    const songId: string = req.params.songId;

    const songExists = await songService.findById(songId);
    if (!songExists) {
      return res.status(404).json({
        status: false,
        message: "Song id not found."
      });
    }

    const favoriteSongExists = await favoriteSongService.findByUserIdAndSongId(myUserId, songId);
    return res.status(200).json({
      status: true,
      message: "Favorite song found.",
      data: favoriteSongExists
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [PATCH] /favorite-songs/update/song-id/:songId
const updateBySongId = async (req: any, res: Response) => {
  try {
    const myUserId: string = req.user.code;
    const songId = req.params.songId;

    const songExsits = await songService.findById(songId);
    if (!songExsits) {
      return res.status(404).json({
        status: false,
        message: "Song id not found."
      });
    }

    const favoriteSongExists = await favoriteSongService.findByUserIdAndSongId(myUserId, songId);
    if (favoriteSongExists) {
      await favoriteSongService.del(favoriteSongExists.id);
      return res.status(200).json({
        status: true,
        message: "Favorite song was deleted successfully."
      })
    }

    const newFavoriteSong = await favoriteSongService.create({
      userId: myUserId,
      songId
    });
    return res.status(200).json({
      status: true,
      message: "Favorite song was created successfully.",
      data: newFavoriteSong
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const favoriteSongController = {
  getByMe,
  getBySongId,
  updateBySongId
};
export default favoriteSongController;