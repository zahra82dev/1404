import SwiperSingleCarPage from "@/components/SwiperSingleCarPage";
import ContactForm from "@/components/ContactForm";
import CarDetails from "@/components/CarDetails";
import { ICar } from "@/models/Car";
import Car from "@/models/Car";
import connectDB from "@/config/database";
const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  let car: ICar;
  try {
    await connectDB();
    const data = await Car.find({ _id: id });
    car = JSON.parse(JSON.stringify(data[0]));
  } catch (error) {
    return <p className="mt-12">There was an erroe!</p>;
  }

  // const data = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/cars/${id}`);
  // const tj = await data.json();
  // const car: ICar = tj?.car;

  return (
    <div className="h-full  md:mt-8 grid grid-cols-10  gap-x-2">
      <div className="hidden md:block sticky top-[6.3rem] light:bg-white z-20 col-span-3 col-start-8 self-start rounded-xl dark:shadow-2xl">
        <ContactForm />
      </div>
      <div className="col-span-10 md:col-span-7 col-start-1 row-start-1">
        <SwiperSingleCarPage images={car?.images} type={car?.type} />

        <CarDetails car={car} />
        <div className=" md:hidden light:bg-white z-20 mt-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default page;
