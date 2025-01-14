import { EUserRole, EUserStatus } from "../enums/user.enum";

interface IUser {
  code: string;
  fullName: string;
  email: string;
  password: string;
  slug: string;
  avatar: string;
  status: EUserStatus;
  role: EUserRole;
}

export default IUser;