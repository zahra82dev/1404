import { Schema, model, models, Types } from "mongoose";
export interface ICar {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  title: string;
  type: string;
  brand: string;
  year: number;
  milage: number;
  category: string;
  color: string;
  transmission: string;
  price: number;
  description?: string;
  city: string;
  seller_info?: {
    name: string;
    email: string;
    phone: string;
  };
  images?: {
    public_id: string;
    signature: string;
    secure_url: string;
  }[];
  is_featured?: boolean;
  is_published?: boolean;
}
const CarSchema = new Schema<ICar>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      default: 2000,
      required: true,
    },
    milage: {
      type: Number,
      default: 1000,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [
      {
        public_id: {
          type: String,
        },
        signature: { type: String },
        secure_url: { type: String },
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Car = models.Car || model<ICar>("Car", CarSchema);
export default Car;
