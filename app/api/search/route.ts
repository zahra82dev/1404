import connectDB from "@/config/database";
import Car from "@/models/Car";
import { NextRequest } from "next/server";
import { ICar } from "@/models/Car";
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const objectSearchParams: any = Object.fromEntries(searchParams);
  let car: ICar[];
  const page = parseInt(objectSearchParams.page) || 1;
  const limit = 5;
  let total: number;
  const skip = (page - 1) * limit;
  const searchPattern = new RegExp(objectSearchParams.searchText, "i");
  delete objectSearchParams.searchText;
  const brands: string[] | null = objectSearchParams?.brand?.split(",") || null;
  const colors: string[] | null = objectSearchParams?.color?.split(",") || null;
  objectSearchParams.brand = brands;
  objectSearchParams.color = colors;
  if (objectSearchParams.brand == "All" || objectSearchParams.brand === null) {
    delete objectSearchParams.brand;
  }
  if (objectSearchParams.color == "All" || objectSearchParams.color === null) {
    delete objectSearchParams.color;
  }
  if (objectSearchParams.transmission == "All") {
    delete objectSearchParams.transmission;
  }
  if (objectSearchParams.type == "All") {
    delete objectSearchParams.type;
  }
  if (objectSearchParams.category == "All") {
    delete objectSearchParams.category;
  }
  objectSearchParams.$or = [
    { title: searchPattern },
    { description: searchPattern },
  ];
  if (objectSearchParams.yearMax || objectSearchParams.yearMin) {
    objectSearchParams.year = {
      $gt: parseInt(objectSearchParams.yearMin || 1920) - 1,
      $lt: parseInt(objectSearchParams.yearMax || new Date().getFullYear()) + 1,
    };
    delete objectSearchParams.yearMin;
    delete objectSearchParams.yearMax;
  }
  if (objectSearchParams.milageMax || objectSearchParams.milageMin) {
    objectSearchParams.milage = {
      $gt: parseInt(objectSearchParams.milageMin || 0) - 1,
      $lt: parseInt(objectSearchParams.milageMax || 1000000) + 1,
    };
    delete objectSearchParams.milageMin;
    delete objectSearchParams.milageMax;
  }
  try {
    await connectDB();
    total = await Car.countDocuments(objectSearchParams);
    if (objectSearchParams?.sort) {
      if (objectSearchParams?.sort === "ascending") {
        car = await Car.find(objectSearchParams)
          .sort({
            createdAt: "ascending",
          })
          .skip(skip)
          .limit(limit);
        return new Response(JSON.stringify({ car: car, total: total }), {
          status: 200,
        });
      }
      if (objectSearchParams?.sort === "descending") {
        car = await Car.find(objectSearchParams)
          .sort({
            createdAt: "descending",
          })
          .skip(skip)
          .limit(limit);
        return new Response(JSON.stringify({ car: car, total: total }), {
          status: 200,
        });
      }
      if (objectSearchParams?.sort === "pdescending") {
        car = await Car.find(objectSearchParams)
          .sort({
            price: "descending",
          })
          .skip(skip)
          .limit(limit);
        return new Response(JSON.stringify({ car: car, total: total }), {
          status: 200,
        });
      }
      if (objectSearchParams?.sort === "pascending") {
        car = await Car.find(objectSearchParams)
          .sort({
            price: "ascending",
          })
          .skip(skip)
          .limit(limit);
        return new Response(JSON.stringify({ car: car, total: total }), {
          status: 200,
        });
      }
    }
    car = await Car.find(objectSearchParams)
      .sort({
        createdAt: "ascending",
      })
      .skip(skip)
      .limit(limit);

    return new Response(JSON.stringify({ car: car, total: total }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error", error: error }), {
      status: 401,
    });
  }
};
