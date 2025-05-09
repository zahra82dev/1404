"use client";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/context";
const OverflowComp = () => {
  const { allStates, setAllStates } = useGlobalContext();
  useEffect(() => {
    window.addEventListener("popstate", () => {
      document.body.style.overflowY = "visible";
      setAllStates((prev) => ({
        ...prev,
        isModalBackgroundOpen: false,
        sortOpen: false,
        formColorModal: false,
        hamMenu: false,
        brandModal: false,
        moreFiltersModal: false,
        colorModal: false,
        formBrandModal: false,
      }));
      // setIsModalBackgroundOpen(false);
      // setSortOpen(false);
      // setFormColorModal(false);
      // setHamMenu(false);
      // setBrandModal(false);
      // setMoreFiltersModal(false);
      // setColorModal(false);
      // setIsModalBackgroundOpen(false);
      // setFormBrandModal(false);
    });
    return () =>
      window.removeEventListener("popstate", () => {
        document.body.style.overflowY = "visible";
        setAllStates((prev) => ({
          ...prev,
          isModalBackgroundOpen: false,
          sortOpen: false,
          formColorModal: false,
          hamMenu: false,
          brandModal: false,
          moreFiltersModal: false,
          colorModal: false,
          formBrandModal: false,
        }));
        // setIsModalBackgroundOpen(false);
        // setSortOpen(false);
        // setFormColorModal(false);
        // setHamMenu(false);
        // setBrandModal(false);
        // setMoreFiltersModal(false);
        // setColorModal(false);
        // setIsModalBackgroundOpen(false);
        // setFormBrandModal(false);
      });
  }, []);
  return null;
};

export default OverflowComp;
