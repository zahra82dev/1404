"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const LoginModal = () => {
  const formPage =
    usePathname().startsWith("/newAd") ||
    usePathname().startsWith("/bookmarks") ||
    usePathname().startsWith("/messages") ||
    usePathname().startsWith("/myAccount");
  const session = useSession();
  return (
    <div
      className={`${
        session.status === "unauthenticated" && formPage ? `flex` : `hidden`
      } fixed top-0 left-0 w-full h-[110%] transition-all duration-300 backdrop-brightness-50  flex justify-center items-center z-0`}
    >
      <div className=" flex justify-center items-center flex-col bg-white dark:bg-black dark:text-white dark:border-teal-600 dark:border-2 p-8 rounded-xl shadow-lg gap-y-8 mt-[-5rem]">
        <p className=" font-semibold text-xl text-center">Please login</p>
        <Link href={`/login`} className="w-full flex justify-center">
          <button className=" px-3 rounded-md border-2 border-teal-600 font-semibold ">
            <span className=" leading-20">Login</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
