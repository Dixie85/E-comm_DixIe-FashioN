import { IVerifyToken } from "../interfaces/interfaces";
import { Schema, model } from "mongoose";

const verifyTokenSchema = new Schema<IVerifyToken>({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
		unique: true,
	},
	token: { 
    type: String,
    required: true
  },
	createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  },
	type: { 
    type: String
  }
});

export const VerifyToken = model<IVerifyToken>("verifytoken", verifyTokenSchema);