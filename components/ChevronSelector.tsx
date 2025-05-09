"use client";
import { FaChevronRight } from "react-icons/fa6";
import { useGlobalContext } from "@/context/context";
type ChevronSelectorProps = {
  modalName: string;
  data: string[] | string;
  title?: string;
  place?: string;
  brand?: string[];
};
const ChevronSelector = ({
  modalName,
  data,
  title,
  place,
  brand,
}: ChevronSelectorProps) => {
  const { allStates, setAllStates } = useGlobalContext();

  if (place === "form") {
    return (
      <>
        <div
          onClick={() => {
            setAllStates((prev) => ({
              ...prev,
              [modalName]: true,
            }));
            // setModal(true);
            document.body.style.overflow = "hidden";
          }}
          className="flex md:hidden flex-col gap-y-2 cursor-pointer "
        >
          <h4 className=" font-semibold text-sm">{title}</h4>
          <div
            className={`${
              data === "" ? `py-[.82rem]` : `py-2`
            } px-4 border-2 flex justify-between items-center rounded-md bg-white dark:bg-inherit border-teal-600`}
          >
            <span>{data}</span>
            <div className=" text-sm">
              <FaChevronRight />
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setAllStates((prev) => ({
              ...prev,
              [modalName]: true,
            }));
            // setModal(true);
            // document.body.style.overflow = "hidden";
          }}
          className="hidden md:flex flex-col gap-y-2 cursor-pointer"
        >
          <h4 className=" font-semibold text-sm">{title}</h4>
          <div
            className={`${
              data === "" ? `py-[.82rem]` : `py-2`
            } px-4 border-2 flex justify-between items-center rounded-md bg-white dark:bg-inherit border-teal-600`}
          >
            <span>{data}</span>
            <div className=" text-sm">
              <FaChevronRight />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        onClick={() => {
          setAllStates((prev) => ({
            ...prev,
            [modalName]: true,
          }));
          // setModal(true);
          document.body.style.overflow = "hidden";
        }}
        className="flex flex-col gap-y-2 md:hidden "
      >
        <h4 className=" font-semibold text-sm">{title}</h4>
        <div className="py-2 px-4 border-2 border-teal-700 flex justify-between items-center rounded-md bg-white dark:bg-[#1F232A] ">
          {brand?.[0] === "All" && place === "Header" ? (
            <span>Brand</span>
          ) : (
            <div>
              {Array.isArray(data) &&
                data.map((e, index) => {
                  return (
                    <span key={index} className=" text-gray-400">
                      {`${e}${index === data.length - 1 ? "" : ", "}`}
                    </span>
                  );
                })}
            </div>
          )}
          <div className=" text-sm">
            <FaChevronRight />
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setAllStates((prev) => ({
            ...prev,
            [modalName]: true,
          }));
          // setModal(true);
        }}
        className=" flex-col gap-y-2 hidden md:flex"
      >
        <h4 className=" font-semibold text-sm">{title}</h4>
        <div className="py-2 px-4 border-2 flex justify-between items-center rounded-md border-teal-700 dark:bg-[#1F232A] cursor-pointer">
          {brand?.[0] === "All" && place === "Header" ? (
            <span>Brand</span>
          ) : (
            <div>
              {Array.isArray(data) &&
                data.map((e, index) => {
                  return (
                    <span key={index} className=" text-gray-400">
                      {`${e}${index === data.length - 1 ? "" : ", "}`}
                    </span>
                  );
                })}
            </div>
          )}
          <div className=" text-sm">
            <FaChevronRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChevronSelector;
