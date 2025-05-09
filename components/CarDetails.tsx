import { formatPrice } from "@/utils/generalFunctions";
import Link from "next/link";
import { ICar } from "@/models/Car";
const carDetails = ({ car }: { car: ICar }) => {
  // const {
  //   title,
  //   type,
  //   brand,
  //   year,
  //   milage,
  //   category,
  //   color,
  //   transmission,
  //   price,
  //   description,
  //   city,
  //   images,
  //   is_featured,
  //   is_published,
  // } = car;

  return (
    <section>
      <div className="p-4 bg-teal-600 rounded-xl mt-4 flex flex-col gap-y-3  shadow-lg">
        <div className="text-2xl font-semibold flex gap-x-2 text-white">
          <p>{car?.brand}</p>
          <h1 className="">{car?.title}</h1>
          <p>{car?.year}</p>
        </div>

        <div className="flex items-center text-white">
          <p className=" font-bold text-xl md:text-2xl pr-2 border-r-2">
            {formatPrice(car?.price)}
          </p>
          <p className="text-lg md:text-xl pl-2">{`${car?.milage || 0} km`}</p>
        </div>
        <div className="flex gap-x-4 text-white font-semibold">
          <Link
            href={`/search?transmission=${car?.transmission}`}
            className="  transition-colors duration-150 text-white border-b-[.2rem] border-white py-1"
          >
            {car?.transmission}
          </Link>
          <Link
            href={`/search?color=${car?.color}`}
            className=" transition-colors duration-150  text-white border-b-[.2rem] border-white py-1"
          >
            {car?.color}
          </Link>
          <Link
            href={`/search?category=${car?.category}`}
            className="  transition-colors duration-150  text-white border-b-[.2rem] border-white py-1"
          >
            {car?.category}
          </Link>
          <p className="  transition-colors duration-150 cursor-pointer  border-b-[.2rem] border-white py-1">
            {car?.city}
          </p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-teal-700 text-white rounded-xl shadow-md">
        <p className=" font-semibold text-xl">Seller's description</p>
        <p>{car?.description}</p>
      </div>
    </section>
  );
};

export default carDetails;
