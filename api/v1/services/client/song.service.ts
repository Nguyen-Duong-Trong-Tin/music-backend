import { Request } from "express";

import { ESongStatus } from "../../enums/song.enum";

import ISong from "../../interfaces/song.interface";
import ISearch from "../../interfaces/search.interface";

import SongModel from "../../models/song.model";

import searchHelper from "../../../../helpers/search.helper";

const search = async (req: Request) => {
  const search = searchHelper(req);

  const songs = await SongModel.find(search);
  return songs;
}

const findByTopicId = async (topicId: string) => {
  const songs = await SongModel.find({
    topicId: topicId,
    status: ESongStatus.ACTIVE
  });
  return songs;
}

const findById = async (id: string) => {
  const songExists = await SongModel.findOne({
    _id: id,
    status: ESongStatus.ACTIVE
  });
  return songExists;
}

const findBySlug = async (slug: string) => {
  const songExists = await SongModel.findOne({
    slug: slug,
    status: ESongStatus.ACTIVE
  });
  return songExists;
}

const updateLike = async (id: string, userId: string) => {
  const songExists = await SongModel.findOne({
    _id: id,
    like: userId,
    status: ESongStatus.ACTIVE
  });

  let newSong: ISong | null;
  if (songExists) {
    newSong = await SongModel.findOneAndUpdate({ _id: id }, { $pull: { like: userId } }, { new: true });
  } else {
    newSong = await SongModel.findOneAndUpdate({ _id: id }, { $push: { like: userId } }, { new: true });
  }
  return newSong;
}

const songService = {
  search,
  findByTopicId,
  findById,
  findBySlug,
  updateLike
};
export default songService;