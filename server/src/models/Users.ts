import { IUser } from "../interfaces/interfaces";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: 
    {
      type: String,
      default: "User",
    },
});

export const Users = model<IUser>("user", userSchema);
