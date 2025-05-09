"use client";
import { useGlobalContext } from "@/context/context";
import { RxCross2 } from "react-icons/rx";
import RectSelector from "./RectSelector";
import { types, transmissions, colors, brands } from "@/data";
import ChevronSelector from "./ChevronSelector";
import YearToFrom from "./YearToFrom";
import MilageToFrom from "./MilageToFrom";
import Category from "./Category";
import { useRouter } from "next/navigation";
function MoreFilters() {
  const { allStates, setAllStates } = useGlobalContext();
  const router = useRouter();
  if (allStates.moreFiltersModal) {
    return (
      <main className=" fixed top-0 left-0 w-full md:hidden h-full bg-white dark:bg-inherit z-[60] overflow-y-scroll">
        <div className=" border-b-2 pl-6  py-4 font-semibold  flex justify-between">
          <button
            type="button"
            className="p-2 ml-2 text-sm"
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                yearMax: new Date().getFullYear(),
                yearMin: 1920,
                refreshYear: Math.random(),
                milageMin: 1,
                milageMax: 1000000,
                refreshMilage: Math.random(),
                color: ["All"],
                brand: ["All"],
              }));
              // setYearMax(2024);
              // setYearMin(1920);
              // setRefreshYear(Math.random());
              // setMilageMin(0),
              //   setMilageMax(1000000),
              //   setRefreshMilage(Math.random());
              router.push("/search");
            }}
          >
            Clear filters
          </button>
          <button
            className=" text-2xl p-2 mr-2"
            type="button"
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                moreFiltersModal: false,
              }));
              // setMoreFiltersModal(false);
              document.body.style.overflowY = "visible";
            }}
          >
            <RxCross2 />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-y-4">
          <RectSelector
            data={types}
            state={allStates.type}
            handleFunctionName={`type`}
            title={"Type of car"}
            name={"type"}
          />
          <ChevronSelector
            modalName={`brandModal`}
            data={allStates.brand}
            title={"Brand"}
          />
          <ChevronSelector
            modalName={`colorModal`}
            data={allStates.color}
            title={"Color"}
          />
          <RectSelector
            data={transmissions}
            name={"transmission"}
            state={allStates.transmission}
            handleFunctionName={`transmission`}
            title={"Transmission"}
          />
          <YearToFrom key={allStates.refreshYear} />
          <MilageToFrom key={allStates.refreshMilage} />
          <Category />
        </div>
      </main>
    );
  }
  return null;
}

export default MoreFilters;
