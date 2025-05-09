"use client";
import MultiSelect from "@/components/MultiSelect";
import MoreFilters from "./MoreFilters";
import { useGlobalContext } from "@/context/context";
import { colors, brands } from "@/data";
import HamMenu from "./HamMenu";
import HamMenuBackground from "./HamMenuBackground";
import ModalBackground from "./ModalBackground";
import LoginModal from "./LoginModal";
const ModalHouse = () => {
  const { allStates, setAllStates } = useGlobalContext();
  return (
    <>
      <MultiSelect
        name={"brand"}
        data={brands}
        modalName={`brandModal`}
        // modalState={allStates.brandModal}
      />
      <MultiSelect
        name={"color"}
        data={colors}
        modalName={`colorModal`}
        // modalState={colorModal}
        // handleFunction={handleColor}
        // arrayResult={color}
      />
      <MultiSelect
        name={"brand"}
        data={brands}
        modalName={`brandModal`}
        headerpage={true}
        // modalState={allStates.brandModal}
      />
      <MoreFilters />
      <HamMenu />
      <HamMenuBackground />
      <ModalBackground
        isModalBackgroundOpen={allStates.isModalBackgroundOpen}
      />
      <ModalBackground
        // setIsModalBackgroundOpen={setSortOpen}
        // setBrandModal={setBrandModal}
        // setColorModal={setColorModal}
        isModalBackgroundOpen={allStates.sortOpen}
        // setSortOpen={setSortOpen}
        // sortOpen={sortOpen}
        // setFormBrandModal={setFormBrandModal}
        // setFormColorModal={setFormColorModal}
      />
      <LoginModal />
    </>
  );
};

export default ModalHouse;
