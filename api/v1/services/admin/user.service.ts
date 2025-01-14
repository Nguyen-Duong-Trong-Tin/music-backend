import { Request } from "express";

import { EUserRole, EUserStatus } from "../../enums/user.enum";

import UserModel from "../../models/user.model";

import findHelper from "../../../../helpers/find.helper";

const find = async (req: Request) => {
  const find = findHelper(req);
  const users = await UserModel
    .find(find)
    .select("-password");
  return users;
}

const findById = async ({ id, status, role }: {
  id: string;
  status?: EUserStatus;
  role?: EUserRole
}) => {
  interface IFind {
    _id: string;
    status?: EUserStatus;
    role?: EUserRole;
  };

  const find: IFind = { _id: id };
  if (status) {
    find.status = status;
  }
  if (role) {
    find.role = role;
  }

  const userExists = await UserModel
    .findOne(find)
    .select("-password");
  return userExists;
}

const login = async (email: string, password: string) => {
  const userExists = await UserModel
    .findOne({
      email,
      password,
      status: EUserStatus.ACTIVE,
      role: EUserRole.ADMIN
    })
    .select("-password");
  return userExists;
}

const userService = {
  find,
  findById,
  login
};
export default userService;