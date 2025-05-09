"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAdverts } from "@/utils/requets";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Pagination = () => {
  const router = useRouter();
  const searchParams = Object.fromEntries(useSearchParams());
  const { data, isLoading } = useQuery(fetchAdverts(searchParams));
  //the ref, total , useEffect and stuff is all to save the initial total valuse after fetch and keep the pagination box on the page
  const ref = useRef(1);
  const total = data?.total || ref.current;
  let countPages = Math.ceil(total / 5);
  useEffect(() => {
    ref.current = total;
  }, [total]);

  if ((ref.current === 1 && isLoading) || countPages < 2 || data?.total === 0) {
    return null;
  }
  return (
    <div className="w-full mt-12 flex justify-end pr-2">
      <div className=" rounded-lg flex bg-teal-600 text-white">
        {Array.from(Array(countPages)).map((item, index) => (
          <div
            className={` py-2 px-4 ${
              index !== countPages - 1 && `border-r-2`
            } cursor-pointer font-semibold`}
            key={index}
            onClick={() => {
              searchParams.page = (index + 1).toString();
              const queryString = new URLSearchParams(searchParams);
              router.push(`/search?${queryString.toString()}`, {
                scroll: false,
              });
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
