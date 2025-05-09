import Header from "@/components/Header";
import SwiperComp from "@/components/SwiperComp";
import FeaturedAds from "@/components/FeaturedAds";
const Home = () => {
  return (
    <div>
      <div className=" shadow-md flex flex-col pb-6 rounded-lg">
        <Header />
        <SwiperComp />
      </div>
      <FeaturedAds />
    </div>
  );
};
export default Home;
