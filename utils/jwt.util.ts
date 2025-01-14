const jwt = require("jsonwebtoken");

import { EUserRole } from "../api/v1/enums/user.enum";
import IUser from "../api/v1/interfaces/user.interface";

interface IVerify {
  success: boolean;
  expires: boolean;
  user: Pick<IUser, "code" | "role">
};

const generate = (user: Pick<IUser, "code" | "role">, expiresIn: string): string => {
  return jwt.sign(user, process.env.TOKEN, { expiresIn: expiresIn });
}

const verify = (token: string) => {
  const result: IVerify = {
    success: false,
    expires: false,
    user: { code: "", role: EUserRole.USER }
  };

  jwt.verify(token, process.env.TOKEN, (e: Error, user: Pick<IUser, "code" | "role">) => {
    if (e) {
      if (e.name === "TokenExpiredError") result.expires = true;
      return;
    }

    result.success = true;
    result.user = user;
  });

  return result;
}

const jwtUtil = {
  generate,
  verify
};
export default jwtUtil;