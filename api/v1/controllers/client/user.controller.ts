import { Request, Response } from "express";

import { EUserStatus } from "../../enums/user.enum";
import userService from "../../services/client/user.service";
import md5Util from "../../../../utils/md5.util";
import jwtUtil from "../../../../utils/jwt.util";
import IUser from "../../interfaces/user.interface";

// [GET] /users/get/me
const getMe = async (req: any, res: Response) => {
  try {
    const myUserId: string = req.user.code;

    const me = await userService.findById(myUserId);
    return res.status(200).json({
      status: true,
      message: "Me found.",
      data: me
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [GET] /users/get/:id
const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userExists = await userService.findById(id);
    if (!userExists) {
      return res.status(404).json({
        status: false,
        message: "User id not found."
      });
    }
    return res.status(200).json({
      status: false,
      message: "User found.",
      data: userExists
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    })
  }
}

// [POST] /users/register
const register = async (req: Request, res: Response) => {
  try {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = md5Util.encodePassword(req.body.password);
    const avatar = req.body.avatar;
    const role = req.body.role;

    const userExists = await userService.findByEmail(email);
    if (userExists) {
      return res.status(400).json({
        status: false,
        message: "User email was exists."
      });
    }

    const newUser = await userService.register({
      fullName,
      email,
      password,
      avatar,
      role,
      slug: fullName,
      status: EUserStatus.ACTIVE
    });
    return res.status(201).json({
      status: true,
      message: "User was registered successfully.",
      data: newUser
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [POST] /users/login
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

    const user: Pick<IUser, "code" | "role"> = {
      code: userExists.id,
      role: userExists.role
    };
    const accessToken = jwtUtil.generate(user, "1d");
    const refreshToken = jwtUtil.generate(user, "7d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return res.status(200).json({
      status: true,
      message: "Login successfully.",
      data: {
        accessToken,
        refreshToken
      }
    });
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

// [POST] /users/refresh-token
const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken: string = req.cookies.refreshToken;
    const verify = jwtUtil.verify(refreshToken);
    if (!verify.success) {
      return res.status(401).json({
        status: false,
        message: "Authentication failed."
      })
    }

    const userExists = await userService.findById(verify.user.code);
    if (!userExists) {
      return res.status(404).json({
        status: false,
        message: "User id not found."
      });
    }

    const accessToken = jwtUtil.generate({
      code: userExists.id,
      role: userExists.role
    }, "1d");
    return res.status(200).json({
      status: true,
      message: "Token was refreshed successfully.",
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
  getMe,
  getById,
  register,
  login,
  refreshToken
};
export default userController;