import mongoose from "mongoose";

import IFavoriteSong from "../interfaces/favoriteSong.interface";

export interface FavoriteSongDocument extends IFavoriteSong, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
};

const FavoriteSongSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "songs",
    required: true
  }
}, {
  timestamps: true
});

const FavoriteSongModel = mongoose.model<FavoriteSongDocument>("favorite_songs", FavoriteSongSchema);
export default FavoriteSongModel;