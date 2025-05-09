import { getServerSession } from "next-auth";
import Message, { IMessage } from "@/models/Message";
import authOptions from "@/utils/authOptions";
import SingleMessgae from "@/components/SingleMessgae";
const page = async () => {
  let messages: IMessage[] = [];
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      messages = await Message.find({ recipient: session.user.id });
    }
  } catch (error) {
    return <p>There was an error</p>;
  }
  return (
    <div className="grid md:grid-cols-2 gap-2 mt-6">
      {messages?.map((item, index) => {
        return <SingleMessgae message={item} />;
      })}
    </div>
  );
};
export default page;
