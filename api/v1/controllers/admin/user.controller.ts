import { Request, Response } from "express";

import { EUserStatus } from "../../enums/user.enum";

import userService from "../../services/admin/user.service";

import md5Util from "../../../../utils/md5.util";
import jwtUtil from "../../../../utils/jwt.util";

// [GET] /admin/users/get?role=:role
const get = async (req: Request, res: Response) => {
  try {
    const users = await userService.find(req);
    return res.status(200).json({
      status: true,
      message: "Users found.",
      data: users
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [GET] /admin/users/get/me
const getMe = async (req: any, res: Response) => {
  try {
    const myUserId = req.user.code;

    const userExists = await userService.findById({
      id: myUserId,
      status: EUserStatus.ACTIVE
    });
    if (!userExists) {
      return res.status(404).json({
        status: false,
        message: "User id not found."
      });
    }
    return res.status(200).json({
      status: true,
      message: "User found.",
      data: userExists
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [POST] /admin/users/login
const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = md5Util.encodePassword(req.body.password);

    const userExists = await userService.login(email, password);
    if (!userExists) {
      return res.status(400).json({
        status: false,
        message: "Email or password were incorrect."
      });
    }

    const accessToken = jwtUtil.generate({
      code: userExists.id,
      role: userExists.role
    }, "1d");
    return res.status(200).json({
      status: true,
      message: "Login successfully.",
      data: { accessToken }
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const userController = {
  get,
  getMe,
  login
};
export default userController;