import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";
export interface IMessage {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  car: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  body: string;
  is_read?: boolean;
}
const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Message = models.Message || model<IMessage>("Message", MessageSchema);
export default Message;
