import { ESongStatus } from "../enums/song.enum";

import { TopicDocument } from "../models/topic.model";
import { UserDocument } from "../models/user.model";

interface ISong {
  title: string;
  slug: string;
  description: string;
  avatar: string;
  like: string[];
  listen: number;
  lyrics: string;
  audio: string;
  status: ESongStatus;
  topicId: TopicDocument["_id"];
  singerId: UserDocument["_id"];
}

export default ISong;