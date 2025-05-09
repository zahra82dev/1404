import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useGlobalContext } from "@/context/context";
import { ContextType } from "@/context/context";
import { brands, colors } from "@/data";
type MultiSelectFormPageProps = {
  name: "brand" | "color";
  data: typeof brands | typeof colors;
  modalName: keyof ContextType["allStates"];
  handleFunctionName: `formColor` | `formBrand`;
};
const MultiSelectFormPage = ({
  name,
  data,
  modalName,
  handleFunctionName,
}: MultiSelectFormPageProps) => {
  const { allStates, setAllStates } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [outline, setOutline] = useState(false);
  const checkedValue =
    name === "brand" ? allStates.formBrand : allStates.formColor;
  return (
    <>
      <div className="md:hidden">
        <div
          className={`${
            allStates[modalName]
              ? "fixed w-full h-full bg-white dark:bg-[#1e232a] left-0 top-0  flex flex-col justify-between z-[61]"
              : "hidden w-full h-full bg-white left-0 top-0  z-10"
          }  md:hidden`}
        >
          <div className="flex flex-col gap-y-2 p-6">
            <div
              className={`flex border-2 ${
                outline && `border-teal-600`
              } mb-2 rounded-lg items-center py-1 pl-2 border-teal-600 outline-none`}
            >
              <div className=" font-bold text-xl">
                <IoSearchOutline />
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-2 pr-4  outline-none text-lg bg-transparent"
                onFocus={() => setOutline(true)}
                onBlur={() => setOutline(false)}
              />
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
                  <div
                    className=" border-b-2 cursor-pointer"
                    key={index}
                    onClick={() => (document.body.style.overflowY = "visible")}
                  >
                    <div
                      className="flex justify-between"
                      onClick={() => {
                        setAllStates((prev) => ({
                          ...prev,
                          [modalName]: false,
                          isModalBackgroundOpen: false,
                          [handleFunctionName]: item.title,
                        }));
                        // handleFunction(item.title);
                        // setModal(false);
                        // setIsModalBackgroundOpen(false);
                        document.body.style.overflowY = "visible";
                      }}
                    >
                      <label
                        htmlFor={item.title}
                        className="w-full py-4 cursor-pointer"
                      >
                        {item.title}
                      </label>
                      <input
                        type="radio"
                        id={item.title}
                        name={name}
                        value={item.title}
                        className="mr-2 cursor-pointer opacity-0"
                        onChange={() => {
                          setAllStates((prev) => ({
                            ...prev,
                            [modalName]: false,
                            [handleFunctionName]: item.title,
                          }));
                          // handleFunction(item.title);
                          // setModal(false);
                          document.body.style.overflowY = "visible";
                        }}
                        checked={checkedValue === item.title}
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
                className=" bg-black text-white px-4 py-2 rounded-md dark:bg-teal-800"
                onClick={() => {
                  setAllStates((prev) => ({
                    ...prev,
                    [modalName]: false,
                    isModalBackgroundOpen: false,
                  }));
                  // setModal(false);
                  document.body.style.overflowY = "visible";
                  // setIsModalBackgroundOpen(false);
                  //   setIsModalBackgroundOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block  ">
        <div
          className={`${
            allStates[modalName]
              ? "absolute w-full bg-slate-50 dark:bg-[#1e232a] flex flex-col justify-between z-[61] rounded-xl mt-4 border-2 border-teal-600 shadow-xl"
              : "hidden"
          } `}
        >
          <div className="flex flex-col p-6 max-h-60 overflow-y-scroll">
            <div
              className={`flex border-2 ${
                outline && `border-teal-600 outline-none`
              } mb-2 rounded-lg items-center py-1 pl-2 border-teal-600 outline-none`}
            >
              <div className=" font-bold text-xl">
                <IoSearchOutline />
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-2 pr-4  outline-none text-lg bg-transparent"
                onFocus={() => setOutline(true)}
                onBlur={() => setOutline(false)}
              />
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
                  <div
                    className=" border-b-2 cursor-pointer"
                    key={index}
                    onClick={() => (document.body.style.overflowY = "visible")}
                  >
                    <div
                      className="flex justify-between"
                      onClick={() => {
                        setAllStates((prev) => ({
                          ...prev,
                          [modalName]: false,
                          isModalBackgroundOpen: false,
                          [handleFunctionName]: item.title,
                        }));
                        // handleFunction(item.title);
                        // setModal(false);
                        // setIsModalBackgroundOpen(false);
                        document.body.style.overflowY = "visible";
                      }}
                    >
                      <label
                        htmlFor={item.title}
                        className="w-full py-3 cursor-pointer"
                      >
                        {item.title}
                      </label>
                      <input
                        type="radio"
                        id={item.title}
                        name={name}
                        value={item.title}
                        className="mr-2 cursor-pointer opacity-0"
                        onChange={() => {
                          setAllStates((prev) => ({
                            ...prev,
                            [modalName]: false,
                            [handleFunctionName]: item.title,
                          }));
                          // handleFunction(item.title);
                          // setModal(false);

                          document.body.style.overflowY = "visible";
                        }}
                        checked={checkedValue === item.title}
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
                className=" bg-black text-white px-4 py-2 rounded-md dark:bg-teal-800"
                onClick={() => {
                  setAllStates((prev) => ({
                    ...prev,
                    [modalName]: false,
                    isModalBackgroundOpen: false,
                  }));
                  // setModal(false);
                  document.body.style.overflowY = "visible";
                  // setIsModalBackgroundOpen(false);
                  //   setIsModalBackgroundOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiSelectFormPage;
