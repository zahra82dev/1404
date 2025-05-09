import { useGlobalContext } from "@/context/context";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
const HamMenu = () => {
  const { allStates, setAllStates } = useGlobalContext();
  const session = useSession();
  return (
    <div
      className={`fixed top-[4.25rem] left-[-20rem] lg:hidden w-[20rem] h-full transition-transform ease-in-out duration-300 bg-white dark:bg-[#1e232a] z-[55] ${
        allStates.hamMenu ? " translate-x-[20rem]" : " translate-x-[0rem]"
      }`}
      onClick={(e) => e.stopPropagation()}
      onBlur={() => {
        setAllStates((prev) => ({
          ...prev,
          hamMenu: false,
        }));
        // setHamMenu(false);
      }}
    >
      <ul
        className=" font-semibold flex flex-col py-4"
        onClick={() => {
          // setHamMenu(false);
          setAllStates((prev) => ({
            ...prev,
            hamMenu: false,
          }));
          document.body.style.overflowY = "visible";
        }}
      >
        <li>
          <Link
            href={"/myAccount"}
            className="flex gap-x-4 items-center text-2xl border-b-2 border-teal-600 pb-4 pl-4"
          >
            <span className="mt-1">
              <VscAccount />
            </span>
            My Account
          </Link>
        </li>
        <li>
          <Link
            href={"/search"}
            className="flex gap-x-4 items-center text-2xl border-b-2 border-teal-600 py-4 pl-4"
          >
            <span className="mt-1">
              <IoIosSearch />
            </span>
            Search
          </Link>
        </li>
        <li>
          <Link
            href={"/bookmarks"}
            className="flex gap-x-4 items-center text-2xl border-b-2 border-teal-600 py-4 pl-4"
          >
            <span className="mt-1">
              <FaRegBookmark />
            </span>
            Bookmarks
          </Link>
        </li>
        <li>
          <Link
            href={"/messages"}
            className="flex gap-x-4 items-center text-2xl border-b-2 border-teal-600 py-4 pl-4"
          >
            <span className="mt-1">{/* <IoIosSearch /> */}</span>
            Messages
          </Link>
        </li>
        <li>
          <Link
            href={"/newAd"}
            className="flex gap-x-4 items-center text-2xl border-b-2 border-teal-600 py-4 pl-4"
          >
            <span className="mt-1">
              <MdOutlineSell />
            </span>
            Sell
          </Link>
        </li>
        <li>
          {session.status === "authenticated" ? (
            <button
              className="flex gap-x-4 items-center w-full text-2xl border-b-2 border-teal-600 py-4 pl-4"
              onClick={() => signOut()}
            >
              <span className="mt-1">
                <SlLogout />
              </span>
              Logout
            </button>
          ) : (
            <Link
              href={"/login"}
              className="flex gap-x-4 items-center text-2xl border-b-2 border-teal-600 py-4 pl-4"
            >
              <span className="mt-1">
                <SlLogin />
              </span>
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default HamMenu;
