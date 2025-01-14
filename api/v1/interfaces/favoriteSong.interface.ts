import { SongDocument } from "../models/song.model";
import { UserDocument } from "../models/user.model";

interface IFavoriteSong {
  userId: UserDocument["_id"];
  songId: SongDocument["_id"];
}

export default IFavoriteSong;