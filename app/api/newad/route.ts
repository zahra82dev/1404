import cloudinary from "@/config/cloudinary";
import Car from "@/models/Car";
import connectDB from "@/config/database";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import { NextRequest } from "next/server";
import { ICar } from "@/models/Car";
import { Types } from "mongoose";
export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response(JSON.stringify({ messgae: "login first" }), {
        status: 401,
      });
    }
    await connectDB();
    const formObject = await request.json();
    const tempObject: ICar = {
      _id: formObject._id,
      title: formObject.title,
      type: formObject.type,
      brand: formObject.brand,
      year: formObject.year,
      milage: formObject.milage,
      category: formObject.category,
      color: formObject.color,
      transmission: formObject.transmission,
      price: formObject.price,
      description: formObject.description,
      city: formObject.city,
      seller_info: {
        name: formObject["seller_info.name"],
        email: formObject["seller_info.email"],
        phone: formObject["seller_info.phone"],
      },
      owner: new Types.ObjectId(session?.user?.id),
    };
    const images = JSON.parse(formObject.images);
    if (images.length > 4) {
      return new Response(
        JSON.stringify({
          error: {
            message: "choose a maximum of 4 images please.",
          },
        }),
        { status: 500 }
      );
    }
    let uedimages;
    let i = 0;
    const imagePromises = [];
    for (let image of images) {
      if (i >= 4) {
        break;
      }
      // const bitmap = fs.readFileSync(image.name);
      // const data = new Buffer(bitmap).toString("base64");
      const result = await cloudinary.uploader.upload(`${image}`, {
        folder: "eaauto",
      });
      imagePromises.push(result);
      const uploadedImages = await Promise.all(imagePromises);
      uedimages = uploadedImages;
      i++;
    }
    const tempImageObject: ICar[`images`] = [];
    uedimages?.map((item) => {
      return tempImageObject.push({
        public_id: item.public_id,
        signature: item.signature,
        secure_url: item.secure_url,
      });
    });
    tempObject.images = tempImageObject;

    const resp = await Car.create(tempObject);
    return new Response(
      JSON.stringify({ messgae: "ad created successfully", id: resp?._id }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ messgae: "bad request", error: error }),
      { status: 500 }
    );
  }
};
