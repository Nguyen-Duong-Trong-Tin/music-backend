import { NextFunction, Response } from "express";
import jwtUtil from "../../../utils/jwt.util";
import { log } from "node:console";

const responseAuthenticationFailed = (res: Response) => {
  return res.status(401).json({
    status: false,
    message: "Authentication failed."
  });
}

const responseAccessTokenExpires = (res: Response) => {
  return res.status(401).json({
    status: false,
    message: "Access token was expires."
  });
}

const deserializeUser = (req: any, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return responseAuthenticationFailed(res);
    }

    const token = authorization.split(' ');
    if (token[0] !== "Bearer" || !token[1]) {
      return responseAuthenticationFailed(res);
    }

    const accessToken = token[1];
    const verify = jwtUtil.verify(accessToken);
    if (!verify.success) {
      if (!verify.expires) {
        return responseAuthenticationFailed(res);
      }
      
      const refreshToken: string = req.cookies.refreshToken;
      const verifyRefreshToken = jwtUtil.verify(refreshToken);
      if (!verifyRefreshToken.success) {
        res.clearCookie("refreshToken");
        return responseAuthenticationFailed(res);
      }
      
      return responseAccessTokenExpires(res);
    }

    req.user = verify.user;
    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

export default deserializeUser;