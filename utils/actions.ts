"use server";
import User from "@/models/User";
import authOptions from "./authOptions";
import { getServerSession } from "next-auth";
import mongoose, { Types } from "mongoose";
import { IUser } from "@/models/User";
export const bookmarking = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return;
    }
    const user: IUser[] = await User.find({ _id: session.user.id });
    let userBookmarks = user[0].bookmarks;
    if (userBookmarks.includes(new mongoose.Types.ObjectId(id))) {
      userBookmarks = [
        ...userBookmarks.filter((item) => item.toString() !== id),
      ];
      const resp = await User.findOneAndUpdate(
        { _id: session.user.id },
        { bookmarks: userBookmarks }
      );
      if (!resp) {
        return false;
      }

      return true;
    } else {
      userBookmarks = [...userBookmarks, new mongoose.Types.ObjectId(id)];
      const resp = await User.findOneAndUpdate(
        { _id: session.user.id },
        { bookmarks: userBookmarks }
      );
      if (!resp) {
      }

      return true;
    }
  } catch (error) {
    return false;
  }
};
export const deleteBookmark = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return;
    }
    const user: IUser[] = await User.find({ _id: session.user.id });
    let userBookmarks = user[0].bookmarks;
    userBookmarks = userBookmarks.filter((item) => item.toString() !== id);
    const resp = await User.findOneAndUpdate(
      { _id: session.user.id },
      { bookmarks: userBookmarks }
    );
    return true;
  } catch (error) {
    return false;
  }
};
