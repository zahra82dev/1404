"use client";
import { useGlobalContext } from "@/context/context";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { colors as colorType } from "@/data";
import { ContextType } from "@/context/context";
type MultiSelectColorDesktopProps = {
  name: string;
  data: typeof colorType;
  modalName: keyof ContextType[`allStates`];
  headerpage?: boolean;
};
const MultiSelectColorDesktop = ({
  name,
  data,
  modalName,
  headerpage,
}: MultiSelectColorDesktopProps) => {
  const { allStates, setAllStates } = useGlobalContext();
  const [search, setSearch] = useState("");
  const searchParams: Record<string, string | string[]> = Object.fromEntries(
    useSearchParams()
  );
  const router = useRouter();
  const handleColor = (item: (typeof colorType)[number][`title`]) => {
    if (!allStates.color.includes(item)) {
      const filterAll = allStates.color.filter((e) => e !== "All");
      setAllStates((prev) => ({
        ...prev,
        color: [...filterAll, item].toString().split(","),
      }));

      return [...filterAll, item].toString().split(",");
    } else {
      let temp = allStates.color.filter((e) => e != item);
      setAllStates((prev) => ({
        ...prev,
        color: temp.length === 0 ? ["All"] : temp,
      }));
      return temp.length === 0 ? ["All"] : temp;
    }
  };
  return (
    <div
      className={`${
        allStates[modalName]
          ? "absolute bg-white dark:bg-[#1e232a] border-teal-600   md:flex flex-col justify-between z-50"
          : " w-full h-full bg-white left-0 top-0  z-10"
      } hidden rounded-xl shadow-xl border-2 ${
        headerpage
          ? ` top-100 left-0 right-0`
          : `right-0 translate-x-[103%] top-0 w-[20rem]`
      }`}
    >
      <div className="flex flex-col p-6  max-h-60 overflow-y-scroll">
        <div className="">
          <div
            className={`flex border-2  mb-2 rounded-lg items-center py-2 pl-2 border-teal-600`}
          >
            <div className=" font-bold text-xl">
              <IoSearchOutline />
            </div>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-2 pr-4  outline-none  bg-transparent text-lg "
            />
          </div>
        </div>
        {data
          .filter((item) => {
            if (search.toLocaleLowerCase() === "") {
              return item;
            } else if (
              item.title
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return item;
            }
            return;
          })
          .map((item, index) => {
            return (
              <div className=" border-b-2 cursor-pointer" key={index}>
                <div className="flex justify-between">
                  <label
                    htmlFor={item.title}
                    className="w-full py-4 cursor-pointer"
                  >
                    {item.title}
                  </label>
                  <input
                    type="checkbox"
                    id={item.title}
                    name={name}
                    value={item.title}
                    className="mr-2 cursor-pointer"
                    onChange={(e) => {
                      const colors = handleColor(item.title);
                      setAllStates((prev) => ({
                        ...prev,
                        refreshSearchText: Math.random(),
                      }));
                      // setRefreshSearchText(Math.random());
                      searchParams.color = colors;
                      delete searchParams.page;
                      const queryString = new URLSearchParams(
                        searchParams as Record<string, string>
                      );
                      router.push(`/search?${queryString.toString()}`, {
                        scroll: false,
                      });
                    }}
                    checked={
                      searchParams?.color
                        ? typeof searchParams?.color === "string" &&
                          searchParams?.color.split(",").includes(item.title)
                        : false
                    }
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className="p-4">
        <div className=" justify-end flex gap-x-2 text-sm font-semibold">
          <button
            type="button"
            className=" bg-black dark:bg-teal-800 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                [modalName]: false,
                isModalBackgroundOpen: false,
              }));
              // setModal(false);
              document.body.style.overflowY = "visible";
              // setIsModalBackgroundOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectColorDesktop;
