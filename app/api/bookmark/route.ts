import connectDB from "@/config/database";
import mongoose from "mongoose";
import Car from "@/models/Car";
import User from "@/models/User";

import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
export const GET = async () => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "please login" }), {
        status: 200,
      });
    }
    const user = await User.find({ _id: session.user.id });
    const userBookmarks = user[0].bookmarks;
    const populate = await User.find({ _id: session.user.id }).populate(
      "bookmarks"
    );

    const bookmarksPopulated = populate[0].bookmarks;

    return new Response(
      JSON.stringify({
        bookmarks: userBookmarks,
        bookmarksPopulated: bookmarksPopulated,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
};
