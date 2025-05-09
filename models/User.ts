import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";
export interface IUser {
  _id: Types.ObjectId;
  email: string;
  username: string;
  image?: string;
  bookmarks: Types.ObjectId[];
  role: "user" | "admin";
}
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
const User = models.User || model<IUser>("User", UserSchema);
export default User;
