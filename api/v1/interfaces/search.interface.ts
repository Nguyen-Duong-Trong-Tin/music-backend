import { FilterQuery } from "mongoose";

import { SongDocument } from "../models/song.model";

interface ISearch {
  status: string;
  $or: FilterQuery<SongDocument>[] | undefined;
};

export default ISearch;