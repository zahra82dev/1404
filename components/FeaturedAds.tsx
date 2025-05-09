import SquareCardAd from "./SquareCardAd";
import { ICar } from "@/models/Car";
import Car from "@/models/Car";
import connectDB from "@/config/database";
const FeaturedAds = async () => {
  await connectDB();
  const data = await Car.find()
    .sort({
      createdAt: "descending",
    })
    .lean();
  const car: ICar[] = JSON.parse(JSON.stringify(data));
  // const { car }: { car: ICar[] } = await resonse.json();
  return (
    <section className=" mt-8  px-2 lg:px-0">
      <p className="pl-2 font-semibold text-2xl">Featured Cars</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent mt-4">
        {car?.map((item: ICar, index) => {
          if (index > 2) {
            return null;
          }
          return <SquareCardAd car={item} key={item.description} />;
        })}
      </div>
    </section>
  );
};

export default FeaturedAds;
