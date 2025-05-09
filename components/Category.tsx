import React from "react";
import { categories } from "@/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/context/context";
import { useState } from "react";
const Category = ({ place }: { place?: "form" }) => {
  const { allStates, setAllStates } = useGlobalContext();
  const searchParams = Object.fromEntries(useSearchParams());
  const [category, setLocalcategory] = useState(searchParams.category || "All");
  const [formCategory, setFormCategory] = useState("");
  const router = useRouter();
  const handlecategory = (item: string) => {
    if (item === category) {
      setAllStates((prev) => ({
        ...prev,
        category: "All",
      }));
      // setcategory("All");
      setLocalcategory("All");
      return "All";
    } else {
      setAllStates((prev) => ({
        ...prev,
        category: item,
      }));
      // setcategory(item);
      setLocalcategory(item);
      return item;
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-semibold text-sm">Category</p>
      <div
        className={`grid grid-cols-3 ${
          place === "form" && `sm:grid-cols-5`
        } gap-x-4 gap-y-4 items-end`}
      >
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col justify-center cursor-pointer   ${
                place === "form" ? `gap-y-2` : `gap-y-2`
              } ${
                place !== "form"
                  ? item.title === searchParams?.category && `opacity-60`
                  : item.title === formCategory && `opacity-60`
              }`}
            >
              <label
                htmlFor={item.title}
                className="cursor-pointer gap-y-2 flex flex-col"
                onClick={() => {
                  const category = handlecategory(item.title);
                  searchParams.category = category;
                  delete searchParams.page;
                  const queryString = new URLSearchParams(searchParams);
                  setFormCategory(item.title);
                  if (place !== "form") {
                    router.push(`/search?${queryString.toString()}`, {
                      scroll: false,
                    });
                  }
                }}
              >
                <Image
                  src={item.img}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt=""
                  className={`w-full object-cover cursor-pointer`}
                />
                <p className="text-center font-semibold text-sm">
                  {item.title}
                </p>
              </label>

              <input
                type="radio"
                name="category"
                id={item.title}
                onChange={() => null}
                checked={
                  place !== "form"
                    ? item.title === searchParams?.category
                    : item.title === formCategory
                }
                className="w-0 h-0"
                value={item.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
