"use client";
import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
const YearToFrom = () => {
  const { allStates, setAllStates } = useGlobalContext();
  const searchParams: Record<string, string> = Object.fromEntries(
    useSearchParams()
  );
  const [ymin, setYmin] = useState<number | " ">(
    allStates.yearMin || parseInt(searchParams.yearMin as string) || 1920
  );
  const [ymax, setYmax] = useState<number | " ">(
    allStates.yearMax ||
      parseInt(searchParams[`yearMax`] as string) ||
      new Date().getFullYear()
  );

  const router = useRouter();
  const ref = useRef(0);
  useEffect(() => {
    if (ref.current < 1) {
      // to keep useEffect from running on mount
      ref.current++;
      return;
    }
    const timeOutID = setTimeout(() => {
      delete searchParams.page;
      delete searchParams.yearMax;
      delete searchParams.yearMin;
      const queryString = new URLSearchParams(searchParams).toString();

      const finalUrl = `/search?${queryString}&yearMax=${
        ymax < ymin ? ymin : ymax
      }&yearMin=${ymax < ymin ? ymax : ymin}`;
      router.push(finalUrl, {
        scroll: false,
      });
    }, 500);
    const timeOutID2 = setTimeout(() => {
      setAllStates((prev) => ({ ...prev, refreshYear: Math.random() }));
      //for syncing pc ui with mobile ui
    }, 10000);
    return () => {
      clearTimeout(timeOutID);
      clearTimeout(timeOutID2);
    };
  }, [allStates.yearMin, allStates.yearMax]);
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
        // refreshYear: Math.random(),
        yearMin: itemMin,
        yearMax: itemMax,
      }));
      // setRefreshSearchText(Math.random());
      searchParams[`yearMin`] = itemMin.toString();
      searchParams[`yearMax`] = itemMax.toString();
      delete searchParams.page;
      // const queryString = new URLSearchParams(searchParams);
      // router.push(`/search?${queryString.toString()}`, {
      //   scroll: false,
      // });
      return;
    } else if (itemMin) {
      if (typeof ymax === "number") {
        if (
          itemMin < 1920 ||
          itemMin > ymax ||
          itemMin.toString().length !== 4
        ) {
          return;
        }
      }
      setAllStates((prev) => ({
        ...prev,
        refreshSearchText: Math.random(),
        yearMin: itemMin,
        // refreshYear: Math.random(),
      }));
      // setRefreshSearchText(Math.random());
      searchParams[`yearMin`] = itemMin.toString();
      delete searchParams.page;
      // const queryString = new URLSearchParams(searchParams);
      // router.push(`/search?${queryString.toString()}`, {
      //   scroll: false,
      // });
      return;
    } else if (itemMax) {
      if (typeof ymin === "number")
        if (
          itemMax > new Date().getFullYear() ||
          itemMax < ymin ||
          itemMax.toString().length !== 4
        ) {
          return;
        }
      setAllStates((prev) => ({
        ...prev,
        refreshSearchText: Math.random(),
        yearMax: itemMax,
        // refreshYear: Math.random(),
      }));
      // setRefreshSearchText(Math.random());
      searchParams[`yearMax`] = itemMax.toString();
      delete searchParams.page;
      // const queryString = new URLSearchParams(searchParams);
      // router.push(`/search?${queryString.toString()}`, {
      //   scroll: false,
      // });
      return;
    }
  };
  return (
    <div className="flex gap-x-2 items-end">
      <h4 className=" font-semibold mb-[.8rem]">Year</h4>
      <div className="grid grid-cols-2 gap-x-2 w-full">
        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="yearmin" className=" font-semibold">
            From
          </label>
          <input
            type="number"
            id="yearmin"
            className="border-2 rounded-md px-4 py-2 dark:bg-[#1e232a] border-teal-600 outline-none"
            min={1920}
            max={ymax}
            onBlur={(e) => {
              // parseInt(e.target.value) > new Date().getFullYear()
              if (
                parseInt(e.target.value) < 1920 ||
                e.target.value.length === 0
              ) {
                setYmin(1920);
                handleState({ itemMin: 1920 });
                return;
              }
              if (typeof ymax === "number" && parseInt(e.target.value) > ymax) {
                setYmin(ymax);
                setYmax(
                  parseInt(e.target.value) > new Date().getFullYear()
                    ? new Date().getFullYear()
                    : parseInt(e.target.value)
                );
                handleState({
                  itemMin: ymax as number,
                  itemMax:
                    parseInt(e.target.value) > new Date().getFullYear()
                      ? new Date().getFullYear()
                      : parseInt(e.target.value),
                });
                return;
              }
              setYmin(parseInt(e.target.value));
              handleState({ itemMin: parseInt(e.target.value) });
            }}
            onChange={(e) => {
              if (e.target.value === "") {
                setYmin(" ");
                return;
              }
              setYmin(parseInt(e.target.value));
              handleState({ itemMin: parseInt(e.target.value) });
            }}
            value={ymin}
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="yearmax" className=" font-semibold">
            To
          </label>
          <input
            type="number"
            id="yearmax"
            className="border-2 dark:bg-[#1e232a] rounded-md px-4 py-2 border-teal-600 outline-none"
            min={ymin}
            max={new Date().getFullYear()}
            onBlur={(e) => {
              if (parseInt(e.target.value) > new Date().getFullYear()) {
                setYmax(
                  parseInt(e.target.value) >= new Date().getFullYear()
                    ? new Date().getFullYear()
                    : parseInt(e.target.value)
                );
                handleState({
                  itemMax:
                    parseInt(e.target.value) >= new Date().getFullYear()
                      ? new Date().getFullYear()
                      : parseInt(e.target.value),
                });
                return;
              }
              if (parseInt(e.target.value) < 1920) {
                if (
                  typeof ymin === "number" &&
                  parseInt(e.target.value) < ymin
                ) {
                  setYmax(ymin);
                  handleState({
                    itemMax: ymin,
                  });

                  return;
                }
                setYmax(1920);
                handleState({
                  itemMax: 1920,
                });
                return;
              }
              if (typeof ymin === "number" && parseInt(e.target.value) < ymin) {
                setYmax(ymin);
                setYmin(parseInt(e.target.value));
                handleState({
                  itemMax: ymin,
                  itemMin: parseInt(e.target.value),
                });
                return;
              }
              if (e.target.value.length === 0) {
                setYmax(parseInt(ymin as string));
                handleState({
                  itemMax: parseInt(ymin as string),
                });
                return;
              }
              setYmax(parseInt(e.target.value));
              handleState({
                itemMax: parseInt(e.target.value),
              });
            }}
            onChange={(e) => {
              if (e.target.value === "") {
                setYmax(" ");
                return;
              }
              setYmax(parseInt(e.target.value));
              handleState({
                itemMax: parseInt(e.target.value),
              });
            }}
            value={ymax}
          />
        </div>
      </div>
    </div>
  );
};

export default YearToFrom;
