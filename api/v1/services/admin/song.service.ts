import ISong from "../../interfaces/song.interface";

import SongModel from "../../models/song.model"

const find = async () => {
  const songs = await SongModel.find({});
  return songs;
}

const findBySlug = async (slug: string) => {
  const regex = new RegExp(slug, "i");

  const songs = await SongModel.find({ slug: regex });
  return songs;
}

const findById = async (id: string) => {
  const songExists = await SongModel.findOne({ _id: id });
  return songExists;
}

const create = async (song: Partial<ISong>) => {
  const newSong = new SongModel(song);
  await newSong.save();
  return newSong;
}

const update = async (id: string, song: Partial<ISong>) => {
  const newSong = await SongModel.findOneAndUpdate({
    _id: id
  }, song, {
    new: true,
    runValidators: true
  });
  return newSong;
}

const songService = {
  find,
  findBySlug,
  findById,
  create,
  update
};
export default songService;