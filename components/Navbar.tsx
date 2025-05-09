"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useGlobalContext } from "@/context/context";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitch";
const Navbar = () => {
  const { allStates, setAllStates } = useGlobalContext();
  const carsPage = usePathname().startsWith("/cars");
  const session = useSession();
  return (
    <nav
      className={`${
        carsPage ? `hidden` : `flex`
      } dark:bg-[#292F38] bg-white   lg:max-w-[61.25rem]  z-[55] py-4  px-4  justify-between items-center sticky top-0 lg:relative w-full lg:top-[1rem] md:rounded-lg md:shadow-md `}
      onClick={() => {
        setAllStates((prev) => ({
          ...prev,
          sortOpen: false,
          isModalBackgroundOpen: false,
          brandModal: false,
          colorModal: false,
        }));
        // setSortOpen(false);
        // setIsModalBackgroundOpen(false);
        // setBrandModal(false);
        // setColorModal(false);
      }}
    >
      <div className="flex gap-x-2 text-3xl items-center   self-center">
        <div
          className=" cursor-pointer lg:hidden"
          onClick={() => {
            setAllStates((prev) => ({
              ...prev,
              hamMenu: !prev.hamMenu,
              sortOpen: false,
            }));
            // setHamMenu(!hamMenu);
            // setSortOpen(false);
            if (!allStates.hamMenu) {
              document.body.style.overflow = "hidden";
            } else {
              document.body.style.overflowY = "visible";
            }
          }}
        >
          <AiOutlineMenu />
        </div>

        <Link href={"/"} className="">
          <span className=" font-bold text-black dark:text-white">DEV</span>
          <span className="font-bold text-teal-600">Auto</span>
        </Link>
        <div className="hidden lg:flex ml-20 gap-x-4 items-center">
          <Link
            href="/search"
            className=" text-lg font-semibold   rounded-lg px-4 py-2 bg-slate-50 hover:bg-slate-100 transition-colors duration-200 dark:bg-[#232830] dark:hover:bg-[#1A1E24]"
            onClick={() => {
              setAllStates((prev) => ({
                ...prev,
                sortOpen: false,
                isModalBackgroundOpen: false,
                brandModal: false,
                colorModal: false,
                searchText: "",
                refreshSearchText: Math.random(),
                yearMax: new Date().getFullYear(),
                yearMin: 1920,
                refreshYear: Math.random(),
                milageMin: 1,
                milageMax: 1000000,
                refreshMilage: Math.random(),
              }));
              // setBrand(["All"]);
              // setType("All");
              // setColor(["All"]);
              // setTransmission("All");
              // setSearchText("");
              // setRefreshSearchText(Math.random()),
              //   setYearMax(new Date().getFullYear());
              // setYearMin(1920);
              // setRefreshYear(Math.random());
              // setMilageMin(0),
              //   setMilageMax(1000000),
              //   setRefreshMilage(Math.random());
              // handlecategory("All");
            }}
          >
            Search
          </Link>
          <Link
            href="/bookmarks"
            className=" text-lg font-semibold  rounded-lg px-4 py-2 bg-slate-50 hover:bg-slate-100 transition-colors duration-200 dark:bg-[#232830] dark:hover:bg-[#1A1E24]"
          >
            Bookmarks
          </Link>
          <Link
            href="/messages"
            className=" text-lg font-semibold  rounded-lg px-4 py-2 bg-slate-50 hover:bg-slate-100 transition-colors duration-200 dark:bg-[#232830] dark:hover:bg-[#1A1E24]"
          >
            Messages
          </Link>
          <Link
            href="/myAccount"
            className=" text-lg font-semibold  rounded-lg px-4 py-2 bg-slate-50 hover:bg-slate-100 transition-colors duration-200 dark:bg-[#232830] dark:hover:bg-[#1A1E24]"
          >
            Account
          </Link>
        </div>
      </div>

      <div className="flex gap-x-2">
        {!session?.data?.user ? (
          <Link href={`/login`}>
            <button className="hidden md:flex px-3 rounded-3xl border-2 border-teal-600 dark:border-[#A7ADBC] font-semibold ">
              <span className=" leading-20">Login</span>
            </button>
          </Link>
        ) : (
          <button
            onClick={() => signOut()}
            className="hidden md:flex px-4 rounded-3xl border-2 border-teal-600  dark:text-white font-semibold "
          >
            logout
          </button>
        )}
        <Link href={`/newAd`}>
          <button className=" px-[1.2rem] rounded-3xl  bg-teal-700 font-semibold text-white h-full">
            <span className=" leading-20">Sell</span>
          </button>
        </Link>
        <div className="h-full w-6">
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
