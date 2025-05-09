"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/context";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRef } from "react";
const MilageToFrom = () => {
  const { allStates, setAllStates } = useGlobalContext();
  const searchParams = Object.fromEntries(useSearchParams());
  const router = useRouter();
  const [mMin, setMMin] = useState<number | " ">(allStates.milageMin || 1);
  const [mMax, setMMax] = useState<number | " ">(
    allStates.milageMax || 1000000
  );
  const ref = useRef(0);
  useEffect(() => {
    if (ref.current < 1) {
      // to keep useEffect from running on mount
      ref.current++;
      return;
    }
    const timeOutID = setTimeout(() => {
      delete searchParams.page;
      delete searchParams.milageMax;
      delete searchParams.milageMin;
      const queryString = new URLSearchParams(searchParams).toString();

      const finalUrl = `/search?${queryString}&milageMax=${
        mMax < mMin ? mMin : mMax
      }&milageMin=${mMax < mMin ? mMax : mMin}`;
      router.push(finalUrl, {
        scroll: false,
      });
    }, 500);
    const timeOutID2 = setTimeout(() => {
      setAllStates((prev) => ({ ...prev, refreshMilage: Math.random() }));
      //for syncing pc ui with mobile ui
    }, 10000);
    return () => {
      clearTimeout(timeOutID);
      clearTimeout(timeOutID2);
    };
  }, [allStates.milageMin, allStates.milageMax]);
  const handleState = ({
    itemMin,
    itemMax,
  }: {
    itemMin?: number;
    itemMax?: number;
  }) => {
    if (itemMin && itemMax) {
      setAllStates((prev) => ({
        ...prev,
        refreshSearchText: Math.random(),
        milageMin: itemMin,
        milageMax: itemMax,
        // refreshMilage: Math.random(),
      }));
      // setRefreshSearchText(Math.random());
      searchParams[`milageMin`] = itemMin.toString();
      searchParams[`milageMax`] = itemMax.toString();
      delete searchParams.page;
      // const queryString = new URLSearchParams(searchParams);
      // router.push(`/search?${queryString.toString()}`, {
      //   scroll: false,
      // });
      return;
    } else if (itemMin && typeof mMax === `number`) {
      if (itemMin < 0 || itemMin > mMax) {
        return;
      }
      setAllStates((prev) => ({
        ...prev,
        refreshSearchText: Math.random(),
        milageMin: itemMin,
        // refreshMilage: Math.random(),
      }));
      // setRefreshSearchText(Math.random());
      searchParams[`milageMin`] = itemMin.toString();
      delete searchParams.page;
      // const queryString = new URLSearchParams(searchParams);
      // router.push(`/search?${queryString.toString()}`, {
      //   scroll: false,
      // });
      return;
    } else if (itemMax && typeof mMin === `number`) {
      if (itemMax > 1000000 || itemMax < mMin) {
        return;
      }
      setAllStates((prev) => ({
        ...prev,
        refreshSearchText: Math.random(),
        milageMax: itemMax,
        // refreshMilage: Math.random(),
      }));
      // setRefreshSearchText(Math.random());
      // searchParams[`milageMax`] = itemMax;
      delete searchParams.page;
      delete searchParams.milageMax;
      delete searchParams.milageMin;
      // const queryString = new URLSearchParams(searchParams);
      // router.push(`/search?${queryString.toString()}`, {
      //   scroll: false,
      // });
      return;
    }
  };
  return (
    <div className="flex items-end gap-x-2">
      <h4 className=" font-semibold mb-[.8rem] pr-[.415rem]">Km</h4>
      <div className="grid grid-cols-2 gap-x-2 w-full">
        <div className="flex flex-col gap-y-2 w-full ">
          <label htmlFor="yearmin" className=" font-semibold">
            From
          </label>
          <input
            type="number"
            id="yearmin"
            className="border-2 rounded-md px-4 dark:bg-[#1e232a] py-2 border-teal-600 outline-none"
            min={1}
            max={mMax}
            onBlur={(e) => {
              if (parseInt(e.target.value) < 0 || e.target.value.length === 0) {
                setMMin(0);
                handleState({ itemMin: 0 });
                return;
              }
              if (typeof mMax === `number` && parseInt(e.target.value) > mMax) {
                setMMin(mMax);

                setMMax(
                  parseInt(e.target.value) > 1000000
                    ? 1000000
                    : parseInt(e.target.value)
                );
                handleState({
                  itemMin: mMax,
                  itemMax:
                    parseInt(e.target.value) > 1000000
                      ? 1000000
                      : parseInt(e.target.value),
                });
                return;
              }
              setMMin(parseInt(e.target.value));
              handleState({ itemMin: parseInt(e.target.value) });
            }}
            onChange={(e) => {
              if (e.target.value === "") {
                setMMin(" ");
                return;
              }
              setMMin(parseInt(e.target.value));
              handleState({ itemMin: parseInt(e.target.value) });
            }}
            value={mMin}
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="yearmax" className=" font-semibold">
            To
          </label>
          <input
            type="number"
            id="yearmax"
            className="border-2 rounded-md dark:bg-[#1e232a] px-4 py-2 border-teal-600 outline-none"
            min={mMin}
            max={1000000}
            onBlur={(e) => {
              if (parseInt(e.target.value) > 1000000) {
                setMMax(
                  parseInt(e.target.value) >= 1000000
                    ? 1000000
                    : parseInt(e.target.value)
                );
                handleState({
                  itemMax:
                    parseInt(e.target.value) >= 1000000
                      ? 1000000
                      : parseInt(e.target.value),
                });
                return;
              }
              if (parseInt(e.target.value) < 0) {
                if (
                  typeof mMin === `number` &&
                  parseInt(e.target.value) < mMin
                ) {
                  setMMax(mMin);
                  handleState({
                    itemMax: mMin,
                  });
                  return;
                }
                setMMax(0);
                handleState({
                  itemMax: 0,
                });
                return;
              }
              if (typeof mMin === `number` && parseInt(e.target.value) < mMin) {
                setMMax(mMin);
                setMMin(parseInt(e.target.value));
                handleState({
                  itemMax: mMin,
                  itemMin: parseInt(e.target.value),
                });
                return;
              }
              if (e.target.value.length === 0) {
                if (typeof mMin === "string") {
                  setMMax(parseInt(mMin));
                  handleState({
                    itemMax: parseInt(mMin),
                  });
                  return;
                }
                setMMax(mMin);
                handleState({
                  itemMax: mMin,
                });
                return;
              }
              setMMax(parseInt(e.target.value));
              handleState({
                itemMax: parseInt(e.target.value),
              });
            }}
            onChange={(e) => {
              if (e.target.value === "") {
                setMMax(" ");
                return;
              }
              setMMax(parseInt(e.target.value));
              handleState({
                itemMax: parseInt(e.target.value),
              });
            }}
            value={mMax}
          />
        </div>
      </div>
    </div>
  );
};

export default MilageToFrom;
