"use client";
import { useGlobalContext } from "@/context/context";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
const SearchBox = ({ children }: { children?: React.ReactNode }) => {
  const searchPage = usePathname().startsWith("/search");
  const { allStates, setAllStates } = useGlobalContext();
  const [search, setSearch] = useState(allStates.searchText || "");
  const searchParams = Object.fromEntries(useSearchParams());
  const router = useRouter();
  if (!searchPage) {
    return (
      <div className="flex flex-col gap-y-2">
        <input
          type="search"
          name="text"
          id="text"
          className=" border-2 rounded-md p-2 w-full dark:bg-[#1F232A] border-teal-700 outline-none"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const queryString = new URLSearchParams({
                searchText: search,
                brand: allStates.brand.toString(),
              }).toString();
              router.push(`/search?${queryString}`);
              setAllStates((prev) => ({
                ...prev,
                searchText: search,
              }));
              // setSearchText(search);
            }
          }}
          defaultValue={allStates.searchText}
        />
        {children}
        <button
          className=" bg-teal-700 transition-colors hover:bg-teal-800 duration-150 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setAllStates((prev) => ({
              ...prev,
              refreshYear: Math.random(),
              yearMax: new Date().getFullYear(),
              yearMin: 1920,
              milageMin: 0,
              milageMax: 1000000,
              refreshMilage: Math.random(),
            }));
            // setRefreshYear(Math.random());
            // setYearMax(new Date().getFullYear());
            // setYearMin(1920);
            // setMilageMin(0),
            //   setMilageMax(1000000),
            //   setRefreshMilage(Math.random());
            const queryString = new URLSearchParams({
              searchText: search,
              brand: allStates.brand.toString(),
            }).toString();
            router.push(`/search?${queryString}`);
            setAllStates((prev) => ({
              ...prev,
              searchText: search,
            }));
            // setSearchText(search);
          }}
        >
          Search
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2">
      <input
        type="search"
        name="text"
        id="text"
        className="border-2 rounded-md p-2 w-full dark:bg-[#1F232A] border-teal-700 outline-none"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
      <button
        className=" bg-teal-700 transition-colors hover:bg-teal-800 duration-150 text-white px-4 py-2 rounded-md"
        onClick={() => {
          searchParams.searchText = search;
          delete searchParams.page;
          const queryString = new URLSearchParams(searchParams).toString();
          router.push(`/search?${queryString}`);
          setAllStates((prev) => ({
            ...prev,
            searchText: search,
          }));
          // setSearchText(search);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
