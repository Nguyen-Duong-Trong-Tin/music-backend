import mongoose from "mongoose";

import ITopic from "../interfaces/topic.interface";
import { ETopicStatus } from "../enums/topic.enum";

export interface TopicDocument extends ITopic, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: Object.values(ETopicStatus),
    required: true
  }
}, {
  timestamps: true
});

const TopicModel = mongoose.model<TopicDocument>("topics", TopicSchema);
export default TopicModel;