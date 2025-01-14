import mongoose from "mongoose";

import IUser from "../interfaces/user.interface";
import { EUserRole, EUserStatus } from "../enums/user.enum";

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    required: true
  },
  role: {
    type: String,
    enum: Object.values(EUserRole),
    required: true
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model<UserDocument>("users", UserSchema);
export default UserModel;