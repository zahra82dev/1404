"use client";
import { ICar } from "@/models/Car";
// car has to imported for mongoose errors! DO NOT REMOVE!
import Car from "@/models/Car";
import CarAdvert from "@/components/CarAdvert";
import LoadingComp from "@/components/LoadingComp";
import LoginModal from "@/components/LoginModal";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { z } from "zod";
import mongoose from "mongoose";

const bookmarkSchema = z.object({
  bookmarks: z.string().array(),
  bookmarksPopulated: z
    .object({
      seller_info: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
      }),
      _id: z.string().refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
      owner: z.string(),
      title: z.string(),
      type: z.string(),
      brand: z.string(),
      year: z.number(),
      milage: z.number(),
      category: z.string(),
      color: z.string(),
      transmission: z.string(),
      price: z.number(),
      description: z.string(),
      city: z.string(),
      images: z
        .object({
          public_id: z.string(),
          signature: z.string(),
          secure_url: z.string(),
          _id: z.string(),
        })
        .array(),
      is_featured: z.boolean(),
      is_published: z.boolean(),
    })
    .array(),
});
export type BookmarkData = z.infer<typeof bookmarkSchema>;
const page = () => {
  const session = useSession();
  if (!session) {
    return <LoginModal />;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["bookmark"],
    queryFn: async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/bookmark`
      );
      const respToJson = await resp.json();
      return respToJson;
    },
  });
  if (isLoading) {
    return (
      <div className="mt-20">
        <LoadingComp />
      </div>
    );
  }
  const testData = bookmarkSchema.safeParse(data);
  // if (!testData.success) {
  //   return <p className=" font-semibold">There was an error!</p>;
  // }
  let bookmarks;
  if (testData.success) {
    if (`bookmarksPopulated` in data) {
      bookmarks = data?.bookmarksPopulated as ICar[];
    }
  }

  return (
    <div className="mt-8 grid lg:grid-cols-2 gap-4 w-full items-center justify-center">
      {bookmarks?.map((item: ICar) => {
        return <CarAdvert car={item} key={item.description} bookmark={true} />;
      })}
    </div>
  );
};

export default page;
