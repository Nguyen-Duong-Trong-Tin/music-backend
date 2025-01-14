import { Request } from "express";

import IFind from "../api/v1/interfaces/find.interface";

const findHelper = (req: Request) => {
  const find: Partial<IFind> = {};

  const role = req.query.role as string;
  if (role) {
    find.role = role;
  }

  return find;
}

export default findHelper;