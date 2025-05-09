import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import Car from "@/models/Car";
import { NextRequest } from "next/server";
import { IMessage } from "@/models/Message";
export const PUT = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const formData = await request.json();
    if (!session) {
      return new Response(JSON.stringify({ message: "Please login" }), {
        status: 401,
      });
    }
    const car = await Car.find({ _id: params.id });
    const tempObj = {
      sender: session.user.id,
      recipient: car[0].owner,
      car: car[0]._id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      body: formData.body,
    };
    const message: IMessage[] = await Message.find({
      sender: session.user.id,
      car: car[0]._id,
    });
    if (message.length > 0) {
      return new Response(JSON.stringify({ message: "not allowed" }), {
        status: 401,
      });
    }
    const toMessages = await Message.create(tempObj);
    return new Response(JSON.stringify({ message: car }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};
export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "please login" }), {
        status: 200,
      });
    }
    // const car = await Car.find({ _id: params.id });
    const message: IMessage[] = await Message.find({
      sender: session.user.id,
      car: params.id,
    });
    if (message.length > 0) {
      return new Response(JSON.stringify({ exists: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ exists: false }), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};
