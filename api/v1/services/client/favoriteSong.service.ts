import IFavoriteSong from "../../interfaces/favoriteSong.interface";

import FavoriteSongModel from "../../models/favoriteSong.model";

const findByUserId = async (userId: string) => {
  const favoriteSongs = await FavoriteSongModel.find({ userId });
  return favoriteSongs;
}

const findByUserIdAndSongId = async (userId: string, songId: string) => {
  const favoriteSongExists = await FavoriteSongModel.findOne({ userId, songId });
  return favoriteSongExists;
}

const create = async (favoriteSong: Partial<IFavoriteSong>) => {
  const newFavoriteSong = new FavoriteSongModel(favoriteSong);
  await newFavoriteSong.save();
  return newFavoriteSong;
}

const del = async (id: string) => {
  await FavoriteSongModel.deleteOne({ _id: id });
}

const favoriteSongService = {
  findByUserId,
  findByUserIdAndSongId,
  create,
  del
};
export default favoriteSongService;