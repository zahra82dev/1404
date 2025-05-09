"use client";
import { useGlobalContext } from "@/context/context";
const ModalBackground = ({
  isModalBackgroundOpen,
}: {
  isModalBackgroundOpen: boolean;
}) => {
  const { allStates, setAllStates } = useGlobalContext();
  if (!isModalBackgroundOpen) {
    return null;
  }
  return (
    <div
      className={`fixed w-full h-[110%] inset-0  ${
        allStates.sortOpen ? `z-[51]` : `z-[40]`
      } bg-black opacity-20 dark:opacity-40`}
      onClick={() => {
        setAllStates((prev) => ({
          ...prev,
          isModalBackgroundOpen: false,
          brandModal: false,
          brandColor: false,
          sortOpen: false,
          formBrandModal: false,
          formColorModal: false,
        }));
        // setIsModalBackgroundOpen(false);
        // setBrandModal(false);
        // setColorModal(false);
        // setSortOpen(false);
        // setFormBrandModal(false);
        // setFormColorModal(false);
      }}
    ></div>
  );
};

export default ModalBackground;
