import { EUserStatus } from "../../enums/user.enum";

import IUser from "../../interfaces/user.interface";

import UserModel from "../../models/user.model"

const findById = async (id: string) => {
  const userExists = await UserModel
    .findOne({
      _id: id,
      status: EUserStatus.ACTIVE
    })
    .select("-password");
  return userExists;
}

const findByEmail = async (email: string) => {
  const userExists = await UserModel
    .findOne({ email })
    .select("-password");
  return userExists;
}

const login = async (email: string, password: string) => {
  const userExists = await UserModel
    .findOne({
      email,
      password,
      status: EUserStatus.ACTIVE
    })
    .select("-password");
  return userExists;
}

const register = async (user: Partial<IUser>) => {
  const newUser = new UserModel(user);
  await newUser.save();

  const userExists = await UserModel
    .findOne({
      _id: newUser.id
    })
    .select("-password");
  return userExists;
}

const userService = {
  findById,
  findByEmail,
  login,
  register
};
export default userService;