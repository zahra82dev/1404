import Image from "next/image";
import Link from "next/link";
import footerImage from "@/assets/images/Footersvg.svg";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#eef0f4] dark:bg-slate-600 w-full flex flex-col items-center mt-40 pb-20">
      <div className="mt-[-6.5rem] dark:mt-[-6.7rem]">
        <Image
          src={footerImage}
          width={0}
          height={0}
          sizes="100vw"
          alt="header"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-y-6 justify-between mt-10 items-center max-w-[61.25rem] w-full px-4">
        <Link href={"/"} className="text-4xl">
          <span className=" font-bold text-black dark:text-white">DEV</span>
          <span className="font-bold text-teal-600">Auto</span>
        </Link>
        <div className="flex gap-x-4 text-4xl dark:text-white">
          <Link href={"/"} className=" cursor-pointer">
            <FaYoutube />
          </Link>
          <Link href={"/"} className=" cursor-pointer">
            <FaInstagram />
          </Link>
          <Link href={"/"} className=" cursor-pointer">
            <FaTwitter />
          </Link>
          <Link href={"/"} className=" cursor-pointer">
            <FaTelegramPlane />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
