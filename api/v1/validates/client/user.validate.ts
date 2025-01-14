import { NextFunction, Request, Response } from "express";

import { EUserRole } from "../../enums/user.enum";
import validateHelper from "../../../../helpers/validate.helper";

// [POST] /users/register
const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    const role = req.body.role;

    if (
      !fullName ||
      !email ||
      !password ||
      !avatar ||
      !role
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required information."
      });
    }

    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof avatar !== "string" ||
      typeof role !== "string"
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing datatype."
      });
    }

    if (!validateHelper.validateEmail(email)) {
      return res.status(400).json({
        status: false,
        message: "Email was incorrect."
      });
    }

    if (!validateHelper.validatePassowrd(password)) {
      return res.status(400).json({
        status: false,
        message: "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      });
    }

    if (
      !Object.values(EUserRole).includes(role as EUserRole) ||
      role === "ADMIN"
     ) {
      return res.status(400).json({
        status: false,
        message: "User role was incorrect."
      });
    }

    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [POST] /users/login
const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required information."
      });
    }

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing datatype."
      });
    }

    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const userValidate = {
  register,
  login
};
export default userValidate;