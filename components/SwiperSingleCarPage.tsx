"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoChevronRight } from "react-icons/go";
import { FiChevronLeft } from "react-icons/fi";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { ICar } from "@/models/Car";
import Swi from "swiper";
const SwiperSingleCarPage = ({
  images,
  type,
}: {
  images: ICar[`images`];
  type: ICar[`type`];
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swi | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className=" ">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          nextEl: ".sbn",
          prevEl: ".sbp",
        }}
        thumbs={{
          swiper: thumbsSwiper,
        }}
        modules={[Navigation, Thumbs]}
        className=" rounded-xl group relative singleCarAdvertSwiper"
      >
        <div className="absolute top-2 left-2 z-10 bg-teal-700 rounded-xl p-2 text-white">
          {type || null}
        </div>
        {images?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="  z-[-100] hover:text-white rounded-md transition-all duration-100  object-center"
            >
              <Image
                src={item.secure_url}
                width={0}
                height={0}
                sizes="100vw"
                alt=""
                className={`w-full h-full object-center object-cover`}
              />
            </SwiperSlide>
          );
        })}

        <div className="hidden md:block absolute left-2 top-[50%] translate-y-[-50%] z-10 bg-slate-200 brightness-90 sbp cursor-pointer p-2  rounded-full opacity-0 group-hover:opacity-60 duration-200 transition-opacity">
          <FiChevronLeft />
        </div>

        <div className="hidden md:block absolute z-10 right-2 top-[50%] translate-y-[-50%] bg-slate-200 brightness-90 cursor-pointer  rounded-full p-2 text-black sbn opacity-0 group-hover:opacity-60 duration-200 transition-opacity">
          <GoChevronRight />
        </div>
      </Swiper>
      {isMounted ? (
        <div className="">
          <Swiper
            modules={[Thumbs]}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            className="gallery-thumbs mt-2 singleCarAdvertLittleSwiper"
            slidesPerView={4}
            spaceBetween={6}
          >
            {images?.map((item, index) => {
              return (
                <SwiperSlide key={index} className=" cursor-pointer rounded-xl">
                  <Image
                    src={item.secure_url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""
                    className={`w-full h-full object-center object-cover rounded-xl`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div className="w-full animate-pulse relative mt-2 flex gap-x-3 rounded-xl singleCarAdvertLittleSwiper">
          <div className="bg-slate-200 dark:bg-slate-300  rounded-xl absolute singleCarAdvertLittleSwiper left-0 top-0 right-[76%] bottom-0 border-2"></div>
          <div className="bg-slate-200 dark:bg-slate-300  rounded-xl absolute singleCarAdvertLittleSwiper left-[25%] top-0 right-[51%] bottom-0"></div>
          <div className="bg-slate-200 dark:bg-slate-300  rounded-xl absolute singleCarAdvertLittleSwiper left-[50%] top-0 right-[26%] bottom-0"></div>
          <div className="bg-slate-200 dark:bg-slate-300  rounded-xl absolute singleCarAdvertLittleSwiper left-[75%] top-0 right-0 bottom-0"></div>
        </div>
      )}
    </div>
  );
};

export default SwiperSingleCarPage;
