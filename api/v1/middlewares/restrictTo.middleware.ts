import { NextFunction, Response } from "express";

import IUser from "../interfaces/user.interface";

const responseNoAccess = (res: Response) => {
  return res.status(403).json({
    status: false,
    message: "No access"
  });
}

const restrictTo = (roles: string[]) => (req: any, res: Response, next: NextFunction) => {
  try {
    const user: Pick<IUser, "code" | "role"> = req.user;

    if (!roles.includes(user.role)) {
      return responseNoAccess(res);
    }
    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

export default restrictTo;