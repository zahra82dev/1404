import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import CarAdvert from "@/components/CarAdvert";
import { ICar } from "@/models/Car";
import Car from "@/models/Car";
const page = async () => {
  let cars: ICar[] = [];
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const data = await Car.find({ owner: session.user.id });
      cars = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    return <p className="mt-6">There was an error</p>;
  }
  return (
    <div>
      <h2 className="mt-6 font-semibold">Your Ads: </h2>
      <section className="grid gap-2 mt-4 md:grid-cols-2">
        {cars?.map((item, index) => {
          return <CarAdvert car={item} key={index} />;
        })}
      </section>
    </div>
  );
};

export default page;
