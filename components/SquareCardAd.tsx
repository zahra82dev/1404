"use client";
import { formatPrice } from "@/utils/generalFunctions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { GoChevronRight } from "react-icons/go";
import { FiChevronLeft } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { ICar } from "@/models/Car";
const SquareCardAd = ({ car }: { car: ICar }) => {
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
    <Link
      href={`/cars/${_id}`}
      className="w-full   relative rounded-xl shadow-lg hover:shadow-xl"
    >
      <div className="  group rounded-xl">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          //   pagination={{
          //     clickable: true,
          //   }}
          navigation={{
            nextEl: ".sbbn",
            prevEl: ".sbbp",
          }}
          modules={[Pagination, Navigation]}
          className="  rounded-t-xl squareCarSwiper "
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
          <div className="hidden md:block absolute left-2 top-[50%] translate-y-[-50%] z-10 bg-slate-200 brightness-90 sbbp cursor-pointer p-2  rounded-full opacity-0 group-hover:opacity-60 duration-200 transition-opacity">
            <FiChevronLeft />
          </div>

          <div className="hidden md:block absolute z-10 right-2 top-[50%] translate-y-[-50%] bg-slate-200 brightness-90 cursor-pointer  rounded-full p-2 text-black sbbn opacity-0 group-hover:opacity-60 duration-200 transition-opacity">
            <GoChevronRight />
          </div>
        </Swiper>
      </div>
      <div className=" p-4 rounded-b-xl border-r-2 border-b-2 border-l-2 border-teal-600 flex flex-col justify-between">
        <div className="">
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          <div className="flex items-center">
            <span className="text-teal-600 font-bold text-xl md:text-2xl pr-2 border-r-2 border-teal-600">
              {formatPrice(price)}
            </span>
            <span className="md:text-lg pl-2">{`${milage} km`}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex text-gray-500 text-xs">
            <p className="border-r-2 border-teal-600 pr-2">{city}</p>
            <p className="border-r-2 border-teal-600  px-2">{year}</p>
            <p className="pl-2">{category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SquareCardAd;
