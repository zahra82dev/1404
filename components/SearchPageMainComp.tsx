"use client";
import SearchBox from "@/components/SearchBox";
import SideFilters from "@/components/SideFilters";
import SearchResult from "@/components/SearchResult";
import { useGlobalContext } from "@/context/context";
import Pagination from "./Pagination";
const SearchPageMainComp = () => {
  const { allStates, setAllStates } = useGlobalContext();
  return (
    <div className="flex flex-col h-full">
      <SearchBox key={allStates.refreshSearchText} />
      <div className="grid grid-cols-12 gap-x-4 mt-4 h-full">
        <div
          className={`col-span-4 self-start relative z-[50] bg-white  rounded-xl  ${`dark:bg-[#1e232a]`}`}
        >
          <SideFilters />
        </div>
        <div className=" col-span-12 md:col-span-8">
          <SearchResult />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default SearchPageMainComp;
