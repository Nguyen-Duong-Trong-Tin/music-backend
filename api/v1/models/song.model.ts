import mongoose from "mongoose";

import ISong from "../interfaces/song.interface";
import { ESongStatus } from "../enums/song.enum";

export interface SongDocument extends ISong, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  avatar: {
    type: String,
    required: true
  },
  like: {
    type: Array
  },
  listen: {
    type: Number
  },
  lyrics: {
    type: String,
    required: true
  },
  audio: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(ESongStatus),
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topics",
    required: true
  },
  singerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "singers",
    required: true
  }
}, {
  timestamps: true
});

const SongModel = mongoose.model<SongDocument>("songs", SongSchema);
export default SongModel;