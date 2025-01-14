import { Request } from "express";

import ISearch from "../api/v1/interfaces/search.interface";

import slugUtil from "../utils/slug.util";

const searchHelper = (req: Request) => {
  const find: Partial<ISearch> = { status: "ACTIVE" };
  const search = req.query.search as string;
  if (search) {
    const titleRegex = new RegExp(search, "i");

    const slug = slugUtil.convert(search);
    const slugRegex = new RegExp(slug, "i");

    find.$or = [
      { title: titleRegex },
      { slug: slugRegex }
    ]
  }

  return find;
}

export default searchHelper;