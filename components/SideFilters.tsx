"use client";
import RectSelector from "./RectSelector";
import { types, transmissions } from "@/data";
import ChevronSelector from "./ChevronSelector";
import { useGlobalContext } from "@/context/context";
import YearToFrom from "./YearToFrom";
import { colors, brands } from "@/data";
import MilageToFrom from "./MilageToFrom";
import Category from "./Category";
import MultiSelectColorDesktop from "./MultiSelectColorDesktop";
import MultiSelectBrandDesktop from "./MultiSelectBrandDesktop";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const SideFilters = () => {
  const searchParams = Object.fromEntries(useSearchParams());
  const router = useRouter();
  const { allStates, setAllStates } = useGlobalContext();
  return (
    <div className={`w-full hidden md:flex flex-col h-full rounded-xl`}>
      <div className=" border-b-2 pl-6  py-4 font-semibold  flex justify-between ">
        <button
          type="button"
          className="p-2 ml-2 text-sm"
          onClick={() => {
            setAllStates((prev) => ({
              ...prev,
              yearMin: 1920,
              refreshYear: Math.random(),
              yearMax: new Date().getFullYear(),
              milageMin: 0,
              milageMax: 1000000,
              refreshMilage: Math.random(),
              brand: ["All"],
              color: ["All"],
            }));
            // setYearMin(1920);
            // setRefreshYear(Math.random());
            // setYearMax(new Date().getFullYear());
            // setMilageMin(0),
            //   setMilageMax(1000000),
            //   setRefreshMilage(Math.random());
            router.push("/search");
          }}
        >
          Clear filters
        </button>
      </div>

      <div className="p-4 flex flex-col gap-y-6">
        <RectSelector
          name={"type"}
          data={types}
          state={allStates.type}
          handleFunctionName={`type`}
          title={"Type of car"}
        />
        <div className=" relative">
          <div
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                isModalBackgroundOpen: true,
                colorModal: false,
              }));
              // setIsModalBackgroundOpen(true);
              // setColorModal(false);
            }}
          >
            <ChevronSelector
              modalName={`brandModal`}
              data={searchParams?.brand ? [searchParams?.brand] : ["All"]}
              title={"Brand"}
            />
          </div>
          <MultiSelectBrandDesktop
            name={"brand"}
            data={brands}
            modalName={`brandModal`}
            // modalState={allStates.brandModal}
          />
          {/* <MultiSelectDesktop
            name={"brand"}
            data={brands}
            setModal={setBrandModal}
            modalState={brandModal}
            handleFunction={handleBrand}
            arrayResult={brand}
          /> */}
        </div>
        <div className=" relative">
          <div
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                isModalBackgroundOpen: true,
                brandModal: false,
              }));
              // setIsModalBackgroundOpen(true);
              // setBrandModal(false);
            }}
          >
            <ChevronSelector
              modalName={`colorModal`}
              data={searchParams?.color ? [searchParams?.color] : ["All"]}
              title={"Color"}
            />
          </div>
          <MultiSelectColorDesktop
            name={"color"}
            data={colors}
            modalName={`colorModal`}
            // modalState={allStates.colorModal}
          />
          {/* <MultiSelectDesktop
            name={"color"}
            data={colors}
            setModal={setColorModal}
            modalState={colorModal}
            handleFunction={handleColor}
            arrayResult={color}
          /> */}
        </div>
        <RectSelector
          name={"transmission"}
          data={transmissions}
          state={allStates.transmission}
          handleFunctionName={`transmission`}
          // handleState={setTransmission}
          title={"Transmission"}
        />
        <YearToFrom key={allStates.refreshYear} />
        <MilageToFrom key={allStates.refreshMilage} />

        <Category />
      </div>
    </div>
  );
};

export default SideFilters;
