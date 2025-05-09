"use client";
import { formatPrice } from "@/utils/generalFunctions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { GoChevronRight } from "react-icons/go";
import { FiChevronLeft } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { deleteBookmark } from "@/utils/actions";
import { useState } from "react";
import { queryClient } from "@/react query/ReactQuery";
import { ICar } from "@/models/Car";
const CarAdvert = ({ car, bookmark }: { car: ICar; bookmark?: boolean }) => {
  const [isDeletingBookmark, setIsDeletingBookmark] = useState(false);
  const {
    seller_info,
    _id,
    title,
    type,
    brand,
    year,
    milage,
    category,
    color,
    transmission,
    price,
    description,
    city,
    images,
    is_featured,
    is_published,
  } = car;
  return (
    <div className=" relative">
      {bookmark && (
        <button
          className={`absolute top-[4%] right-[2%] z-[10] rounded-full bg-slate-300 dark:bg-slate-600 p-[.15rem] text-black cursor-pointer ${
            isDeletingBookmark && `opacity-50`
          }`}
          onClick={async () => {
            setIsDeletingBookmark(true);
            await deleteBookmark(_id.toString());
            queryClient.refetchQueries({ queryKey: ["bookmark"] });
          }}
          disabled={isDeletingBookmark}
        >
          <RxCross2 />
        </button>
      )}

      <Link
        href={`/cars/${_id}`}
        className="w-full   grid grid-cols-7 relative rounded-xl shadow-lg hover:shadow-xl"
      >
        <div className=" col-span-3 group rounded-xl">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            //   pagination={{
            //     clickable: true,
            //   }}
            navigation={{
              nextEl: ".sbn",
              prevEl: ".sbp",
            }}
            modules={[Pagination, Navigation]}
            className="  rounded-l-xl carAdvertSwiper"
          >
            {images?.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="  z-[-100]  hover:text-white rounded-md cursor-pointer transition-all duration-100"
                >
                  <Image
                    src={item.secure_url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""
                    className={`w-full h-full object-center object-cover `}
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
        </div>
        <div className="col-start-4 col-span-4 p-4 rounded-r-xl border-r-2 border-b-2 border-t-2 border-teal-600 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
            <div className="flex items-center">
              <span className="text-teal-600 font-bold text-lg md:text-2xl pr-2 border-r-2 border-teal-600">
                {formatPrice(price)}
              </span>
              <span className="md:text-lg pl-2">{`${milage} km`}</span>
            </div>
          </div>

          <div>
            <div className="flex text-gray-500 text-xs">
              <p className="border-r-2 border-teal-600 pr-2">{city}</p>
              <p className="border-r-2 border-teal-600  px-2">{year}</p>
              <p className="pl-2">{category}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarAdvert;
