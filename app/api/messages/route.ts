//to get all messages
import { getServerSession } from "next-auth";
import Message from "@/models/Message";
import authOptions from "@/utils/authOptions";
export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ messgage: "please login" }), {
        status: 200,
      });
    }

    const messages = await Message.find({ recipient: session.user.id });
    return new Response(JSON.stringify({ messages: messages }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
};
