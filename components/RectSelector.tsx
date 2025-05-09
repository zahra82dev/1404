import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/context/context";
import { useState } from "react";
import { transmissions, types, formTransmissions, formTypes } from "@/data";
type RectSelectorProps = {
  data:
    | typeof transmissions
    | typeof types
    | typeof formTransmissions
    | typeof formTypes;
  state: string;
  handleFunctionName: string;
  title: string;
  name: string;
};
const rectSelector = ({
  data,
  state,
  handleFunctionName,
  title,
  name,
}: RectSelectorProps) => {
  const { allStates, setAllStates } = useGlobalContext();
  const searchParams = Object.fromEntries(useSearchParams());
  const router = useRouter();
  const [currentState, setCurrentState] = useState(
    searchParams[`${name}`] || "All"
  );
  return (
    <div className="text-sm font-semibold">
      <h2 className="text-sm font-semibold">{title}</h2>
      {data.length === 3 ? (
        <div
          className={` border-2 border-teal-600  grid grid-cols-3 text-center rounded-md mt-2`}
        >
          {data.map((item, index) => {
            return (
              <button
                type="button"
                key={index}
                className={`${
                  searchParams[`${name}`] === item.title
                    ? `bg-[#eef0f4] dark:bg-black`
                    : " light:bg-white"
                } ${
                  index === 0 &&
                  !searchParams[`${name}`] &&
                  `bg-[#eef0f4] dark:bg-black`
                } py-2 border-r-teal-600  rounded-l-md ${
                  data.length !== index + 1 ? "border-r-2" : "rounded-r-md"
                }`}
                onClick={() => {
                  setAllStates((prev) => ({
                    ...prev,
                    [handleFunctionName]: item.title,
                    refreshSearchText: Math.random(),
                  }));
                  // handleState(item.title);
                  setCurrentState(item.title);
                  // setRefreshSearchText(Math.random());
                  searchParams[`${name}`] = item.title;
                  delete searchParams.page;
                  const queryString = new URLSearchParams(searchParams);
                  router.push(`/search?${queryString.toString()}`, {
                    scroll: false,
                  });
                }}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      ) : (
        <div
          className={` border-2 border-teal-600 grid grid-cols-2 text-center rounded-md mt-2`}
        >
          {data.map((item, index) => {
            return (
              <label
                htmlFor={title}
                className={`${
                  state === item.title
                    ? `bg-[#eef0f4] dark:bg-black`
                    : " light:bg-white"
                } py-2 border-r-teal-600 ${
                  index === 0 ? `border-r-2` : ` rounded-r-md`
                } rounded-l-md cursor-pointer`}
                onClick={() => {
                  setAllStates((prev) => ({
                    ...prev,
                    [handleFunctionName]: item.title,
                  }));
                  // handleState(item.title);
                }}
                key={index}
              >
                <button type="button">{item.title}</button>
                <input
                  type="radio"
                  name={name}
                  id={item.title}
                  value={item.title}
                  checked={state === item.title}
                  onChange={() => null}
                  className="w-0 h-0"
                />
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default rectSelector;
