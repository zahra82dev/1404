"use client";
import React, { createContext, Suspense, useState } from "react";
import { SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
export type ContextType = {
  allStates: {
    isModalBackgroundOpen: boolean;
    refreshYear: number;
    refreshMilage: number;
    brand: string[];
    searchText: string;
    refreshSearchText: number;
    milageMin: number;
    milageMax: number;
    yearMin: number;
    yearMax: number;
    category: string;
    color: string[];
    brandModal: boolean;
    colorModal: boolean;
    moreFiltersModal: boolean;
    type: string;
    transmission: string;
    sortOpen: boolean;
    hamMenu: boolean;
    formBrand: string;
    formBrandModal: boolean;
    formColor: string;
    formColorModal: boolean;
    formTransmission: string;
    formType: string;
    categoryForm: string;
    sort: string;
  };
  setAllStates: React.Dispatch<
    SetStateAction<{
      isModalBackgroundOpen: boolean;
      refreshYear: number;
      refreshMilage: number;
      brand: string[];
      searchText: string;
      refreshSearchText: number;
      milageMin: number;
      milageMax: number;
      yearMin: number;
      yearMax: number;
      category: string;
      color: string[];
      brandModal: boolean;
      colorModal: boolean;
      moreFiltersModal: boolean;
      type: string;
      transmission: string;
      sortOpen: boolean;
      hamMenu: boolean;
      formBrand: string;
      formBrandModal: boolean;
      formColor: string;
      formColorModal: boolean;
      formTransmission: string;
      formType: string;
      categoryForm: string;
      sort: string;
    }>
  >;
};

const context = createContext<undefined | ContextType>(undefined);
const Contextwrapper = ({ children }: { children: React.ReactNode }) => {
  const searchParams = Object.fromEntries(useSearchParams()) || null;
  const brands = useSearchParams().getAll("brand")[0]?.split(",") || [];
  const colors = useSearchParams().getAll("color")[0]?.split(",") || [];
  const [allStates, setAllStates] = useState({
    isModalBackgroundOpen: false,
    refreshYear: Math.random(),
    refreshMilage: Math.random(),
    brand: brands.length !== 0 ? [...brands] : ["All"],
    searchText: searchParams?.searchText || "",
    refreshSearchText: Math.random(),
    milageMin: parseInt(searchParams.milageMin) || 0,
    milageMax: parseInt(searchParams.milageMax) || 1000000,
    yearMin: parseInt(searchParams.yearMin) || 1920,
    yearMax: parseInt(searchParams.yearMax) || new Date().getFullYear(),
    category: searchParams.category || "All",
    color: colors.length !== 0 ? [...colors] : ["All"],
    brandModal: false,
    colorModal: false,
    moreFiltersModal: false,
    type: searchParams?.type || "All",
    transmission: searchParams?.transmission || "All",
    sortOpen: false,
    hamMenu: false,
    formBrand: "",
    formBrandModal: false,
    formColor: "",
    formColorModal: false,
    formTransmission: "",
    formType: "",
    categoryForm: "",
    sort: searchParams.sort || "ascending",
  });

  return (
    <context.Provider
      value={{
        allStates,
        setAllStates,
      }}
    >
      {children}
    </context.Provider>
  );
};
export const useGlobalContext = () => {
  const contextt = useContext(context);

  if (contextt === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return contextt;
};
const Searchbar = ({ children }: { children: React.ReactNode }) => {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Contextwrapper>{children}</Contextwrapper>
    </Suspense>
  );
};
export default Searchbar;
