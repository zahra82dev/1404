"use client";
import { useGlobalContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FaSortAmountDownAlt } from "react-icons/fa";
const Sort = () => {
  const searchParams = useSearchParams();
  const objectSearchParams = Object.fromEntries(searchParams);
  const { allStates, setAllStates } = useGlobalContext();
  const router = useRouter();
  return (
    <div className="flex flex-col items-end p-4 w-full relative">
      <div
        onClick={() => {
          setAllStates((prev) => ({
            ...prev,
            sortOpen: !prev.sortOpen,
          }));
          // setSortOpen(!sortOpen);
        }}
        className={`cursor-pointer`}
      >
        <FaSortAmountDownAlt />
      </div>
      <div className="absolute z-[52] mt-2 top-[80%] ">
        <div
          className={`${
            allStates.sortOpen ? `flex flex-col` : `hidden`
          } bg-white dark:bg-[#1e232a] dark:border-teal-600 p-4 shadow-xl rounded-xl items-start gap-y-2 font-semibold  border-2 w-full h-full`}
        >
          <button
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                sort: "ascending",
                sortOpen: false,
              }));
              // setSort("ascending");
              // setSortOpen(false);
              objectSearchParams.sort = "ascending";
              delete objectSearchParams.page;
              const queryString = new URLSearchParams(objectSearchParams);
              router.push(`/search?${queryString.toString()}`, {
                scroll: false,
              });
            }}
            className={`${
              allStates.sort === "ascending"
                ? `bg-slate-300 dark:bg-[#343C47]`
                : ``
            } p-2 w-full rounded-md text-left`}
          >
            Date ascending
          </button>
          <button
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                sort: "descending",
                sortOpen: false,
              }));
              // setSort("descending");
              // setSortOpen(false);
              objectSearchParams.sort = "descending";
              delete objectSearchParams.page;
              const queryString = new URLSearchParams(objectSearchParams);
              router.push(`/search?${queryString.toString()}`, {
                scroll: false,
              });
            }}
            className={`${
              allStates.sort === "descending"
                ? `bg-slate-300 dark:bg-[#343C47]`
                : ``
            }  p-2 w-full rounded-md text-left`}
          >
            Date descending
          </button>
          <button
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                sort: "pascending",
                sortOpen: false,
              }));
              // setSort("pascending");
              // setSortOpen(false);
              objectSearchParams.sort = "pascending";
              delete objectSearchParams.page;
              const queryString = new URLSearchParams(objectSearchParams);
              router.push(`/search?${queryString.toString()}`, {
                scroll: false,
              });
            }}
            className={`${
              allStates.sort === "pascending"
                ? `bg-slate-300 dark:bg-[#343C47]`
                : ``
            }  p-2 w-full rounded-md text-left`}
          >
            Price ascending
          </button>
          <button
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                sort: "pdescending",
                sortOpen: false,
              }));
              // setSort("pdescending");
              // setSortOpen(false);
              objectSearchParams.sort = "pdescending";
              delete objectSearchParams.page;
              const queryString = new URLSearchParams(objectSearchParams);
              router.push(`/search?${queryString.toString()}`, {
                scroll: false,
              });
            }}
            className={`${
              allStates.sort === "pdescending"
                ? `bg-slate-300 dark:bg-[#343C47]`
                : ``
            }  p-2 w-full rounded-md text-left`}
          >
            Price descending
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sort;
