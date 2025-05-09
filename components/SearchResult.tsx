"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAdverts } from "@/utils/requets";
import CarAdvert from "./CarAdvert";
import LoadingComp from "./LoadingComp";
import Sort from "./Sort";
import { ICar } from "@/models/Car";
const SearchResult = () => {
  const searchParams = Object.fromEntries(useSearchParams()) || null;
  const { data, isLoading } = useQuery(fetchAdverts(searchParams));
  const cars: ICar[] = data?.car;
  if (cars?.length === 0) {
    return <p className=" font-semibold text-2xl">No results...</p>;
  }
  return (
    <section className="flex flex-col gap-y-4">
      <Sort />
      {!isLoading ? (
        cars?.map((item, index) => {
          return <CarAdvert car={item} key={index} />;
        })
      ) : (
        <div className="my-40">
          <LoadingComp />
        </div>
      )}
    </section>
  );
};

export default SearchResult;
