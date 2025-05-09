import Car from "@/models/Car";
import connectDB from "@/config/database";
import { NextRequest } from "next/server";
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
  const { id } = params;
  try {
    await connectDB();
    const car = await Car.find({ _id: id });
    const carzero = car[0];
    const t = {
      title: carzero.title,
      type: carzero.type,
      brand: carzero.brand,
      year: carzero.year,
      milage: carzero.milage,
      category: carzero.category,
      color: carzero.color,
      transmission: carzero.transmission,
      price: carzero.price,
      description: carzero.description,
      city: carzero.city,
      images: carzero.images,
      is_featured: carzero.is_featured,
      is_published: carzero.is_published,
    };
    return new Response(JSON.stringify({ car: t }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: 401,
    });
  }
};
