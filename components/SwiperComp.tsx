"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { mainSwiper } from "@/data";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { GoChevronRight } from "react-icons/go";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
const SwiperComp = () => {
  const [slidesPerViewNumber, setSlidesPerViewNumber] = useState(3);
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const handleScreenSize = () => {
    if (window.innerWidth < 450) {
      setSlidesPerViewNumber(3);
      return;
    }
    if (window.innerWidth < 600) {
      setSlidesPerViewNumber(4);
      return;
    }

    if (window.innerWidth < 768) {
      if (slidesPerViewNumber === 5) {
        return;
      }
      setSlidesPerViewNumber(5);
      return;
    }
    if (window.innerWidth < 1024) {
      if (slidesPerViewNumber === 6) {
        return;
      }
      setSlidesPerViewNumber(6);
      return;
    }
    if (window.innerWidth > 1024) {
      if (slidesPerViewNumber === 7) {
        return;
      }
      setSlidesPerViewNumber(7);
      return;
    }
  };
  useEffect(() => {
    handleScreenSize();
    setLoad(true);
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);
  if (!load) {
    return (
      <div className="flex flex-col justify-center px-4 mt-20 md:mt-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Categories</p>
          <div className="flex gap-x-2">
            <div className="sbp cursor-pointer p-2 border-2 border-teal-600 dark:text-white rounded-full">
              <FiChevronLeft />
            </div>
            <div className="sbn cursor-pointer p-2 border-2 border-teal-600 dark:text-white rounded-full">
              <GoChevronRight />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-4 md:h-[8rem]">
          <div className="flex justify-between gap-x-2 w-full animate-pulse ">
            {Array(slidesPerViewNumber)
              .fill(2)
              .map((item, index) => {
                return (
                  <div
                    className="w-full h-[8rem] bg-slate-200 dark:bg-slate-500 rounded-lg flex items-start"
                    key={index}
                  >
                    <p className="h-4 rounded-full ml-3 mt-4 w-[4rem] bg-slate-200 dark:bg-slate-700"></p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className=" flex flex-col w-full px-4 gap-y-4 mt-20 md:mt-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Categories</p>
        <div className=" flex text-black z-[2] gap-x-2">
          <div className="sbp cursor-pointer p-2 border-2 border-teal-600 dark:text-white rounded-full">
            <FiChevronLeft />
          </div>
          <div className="sbn cursor-pointer p-2 border-2 border-teal-600 dark:text-white rounded-full">
            <GoChevronRight />
          </div>
        </div>
      </div>
      <div className="">
        <Swiper
          slidesPerView={slidesPerViewNumber}
          spaceBetween={10}
          slidesPerGroup={slidesPerViewNumber}
          //   pagination={{
          //     clickable: true,
          //   }}
          navigation={{
            nextEl: ".sbn",
            prevEl: ".sbp",
          }}
          modules={[Pagination, Navigation]}
          className="mainSwiper "
        >
          {mainSwiper.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className=" bg-[#eef0f4] dark:bg-[#343C47] dark:hover:opacity-50 transition-opacity duration-150  relative  rounded-md cursor-pointer  group  hover:bg-black"
                onClick={() => router.push(`/search?${item.query}`)}
              >
                <div className="">
                  <p className=" font-semibold text-md ml-2 absolute top-2  group-hover:text-white">
                    {item.title}
                  </p>
                  <Image
                    src={item.img}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""
                    className={` absolute bottom-0 w-full translate-x-[.8rem] `}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperComp;
