"use client";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/react query/ReactQuery";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useState } from "react";
import { bookmarking } from "@/utils/actions";
const Bookmark = () => {
  const session = useSession();
  const [isBookmarking, setIsBookMarking] = useState(false);
  const getBookmarks = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/bookmark`
    );
    const tj = await response.json();
    return tj;
  };
  const id = usePathname().split(`/cars/`)[1];
  const { data } = useQuery({
    queryKey: ["bookmark"],
    queryFn: getBookmarks,
  });
  const userBookmarks = data?.bookmarks;
  if (session.status === `loading`) {
    return (
      <div>
        <div className=" cursor-pointer">
          <FaRegBookmark />
        </div>
      </div>
    );
  }
  if (session.status === `unauthenticated`) {
    return (
      <div>
        <div
          onClick={() => {
            toast.error(`please login to bookmark`);
          }}
          className=" cursor-pointer"
        >
          <FaRegBookmark />
        </div>
      </div>
    );
  }
  if (userBookmarks?.includes(id)) {
    return (
      <div>
        <div
          onClick={async () => {
            if (isBookmarking) {
              return;
            }
            setIsBookMarking(true);
            const bookmarkStatus = await bookmarking(id);
            if (bookmarkStatus) {
              await queryClient.invalidateQueries({ queryKey: ["bookmark"] });
              toast.dismiss();
              toast.success("Bookmark removed", { closeOnClick: true });
              setIsBookMarking(false);
            } else {
              toast.error("There was an error");
              setIsBookMarking(false);
            }
          }}
          className={`cursor-pointer ${
            isBookmarking &&
            `bg-white dark:bg-[#292F38] opacity-50 cursor-default`
          }`}
        >
          <FaBookmark />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        onClick={async () => {
          if (isBookmarking) {
            return;
          }
          setIsBookMarking(true);
          const bookmarkStatus = await bookmarking(id);
          if (bookmarkStatus) {
            await queryClient.invalidateQueries({
              queryKey: ["bookmark"],
            });
            toast.dismiss();
            toast.success("Bookmark Added", { closeOnClick: true });
            setIsBookMarking(false);
          } else {
            toast.error("There was an error");
            setIsBookMarking(false);
          }
        }}
        className={`cursor-pointer ${
          isBookmarking &&
          `bg-white dark:bg-[#292F38] opacity-50 cursor-default`
        }`}
      >
        <FaRegBookmark />
      </div>
    </div>
  );
};

export default Bookmark;
