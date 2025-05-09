"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChevronSelector from "@/components/ChevronSelector";
import { useGlobalContext } from "@/context/context";
import { Id } from "react-toastify";
import MultiSelectFormPage from "@/components/MultiSelectFormPage";
import RectSelector from "@/components/RectSelector";
import Category from "@/components/Category";
import { colors, brands, formTypes, formTransmissions } from "@/data";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import LoadingComp from "./LoadingComp";
import { useRef } from "react";
const NewAdFrom = () => {
  const session = useSession();
  const [submitting, isSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState<(string | ArrayBuffer)[]>([]);
  const [fileSize, setFileSize] = useState(0);
  const router = useRouter();
  const { allStates, setAllStates } = useGlobalContext();
  let toBase64 = (e: FileList | null) => {
    let t: (string | ArrayBuffer)[] = [];
    if (e) {
      for (let i of e) {
        const reader = new FileReader();
        reader.readAsDataURL(i);
        reader.onload = () => {
          if (reader.result) {
            t.push(reader.result);
          }
        };
      }
      setBase64(t);
    }
  };
  useEffect(() => {
    setAllStates((prev) => ({
      ...prev,
      formBrand: "",
      formType: "",
      formColor: "",
      formTransmission: "",
    }));
    // setFormType("");
    // setFormBrand("");
    // setFormColor("");
    // setFormTransmission("");
    setLoading(false);
  }, []);
  let progressToastId = useRef<Id>();
  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="mt-[-10rem]">
          <LoadingComp />
        </div>
      </div>
    );
  }
  return (
    <form
      className="w-full max-w-[42rem] px-4 py-8 mt-12 flex flex-col gap-y-8 card shadow-xl rounded-xl"
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          const formData = new FormData(e.currentTarget);
          const formObject = Object.fromEntries(formData);
          formObject.images = JSON.stringify(base64);
          if (!formObject.type) {
            toast.error("Please choose the advert type");
            return;
          }
          if (!formObject.brand) {
            toast.error("Please choose the brand");
            return;
          }
          if (!formObject.color) {
            toast.error("Please choose the color");
            return;
          }
          if (!formObject.category) {
            toast.error("Please choose the category");
            return;
          }

          if (!formObject.transmission) {
            toast.error("Please choose the transmission type");
            return;
          }
          if (
            formObject.title === "" ||
            formObject.year === "" ||
            formObject.milage === "" ||
            formObject.price === "" ||
            formObject.city === "" ||
            formObject["seller_info.name"] === "" ||
            formObject["seller_info.email"] === "" ||
            formObject["seller_info.phone"] === "" ||
            formObject.images === ""
          ) {
            toast.error("Please fill All the fields");
          }
          if (fileSize === 0) {
            toast.error("Please choose at least one image");
            return;
          }
          if (fileSize > 3145728) {
            toast.error(
              `Maximum upload size for all your images combined is 3MB, current size: ${(
                fileSize / 1048576
              ).toFixed(2)}MB`
            );
            return;
          }
          const notify = () =>
            (progressToastId.current = toast("Please wait", {
              closeButton: false,
              position: "bottom-center",
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            }));
          notify();
          isSubmitting(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/newad`,
            {
              method: "POST",
              body: JSON.stringify(formObject),
            }
          );
          toast.dismiss();
          isSubmitting(false);
          const toJson = await response.json();
          if (toJson.id) {
            router.push(`/cars/${toJson.id}`);
          }
          // queryClient.invalidateQueries({ queryKey: ["userproperty"] });
          if (toJson.error) {
            toast.error(toJson.error);
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      }}
      encType="multipart/form-data"
    >
      <h1 className=" text-center font-bold text-3xl">Add Advert</h1>
      <RectSelector
        data={formTypes}
        title={`Advert Type`}
        handleFunctionName={`formType`}
        state={allStates.formType}
        name={"type"}
      />
      <div className="flex flex-col">
        <label htmlFor="title" className="font-semibold">
          Listing title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="mt-2 rounded-lg p-2 border-2 dark:bg-[#1F232A] border-teal-600  outline-none"
          placeholder="eg. E39 M5"
          required
        ></input>
      </div>

      <div
        className="relative"
        onClick={() => {
          setAllStates((prev) => ({
            ...prev,
            formColorModal: false,
          }));
          // setFormColorModal(false);
        }}
      >
        <div
          onClick={() => {
            setAllStates((prev) => ({
              ...prev,
              isModalBackgroundOpen: true,
            }));
            // setIsModalBackgroundOpen(true)
          }}
        >
          <ChevronSelector
            modalName={`formBrandModal`}
            data={allStates.formBrand}
            title={"Brand"}
            place={"form"}
          />
        </div>

        <MultiSelectFormPage
          name={"brand"}
          data={brands}
          modalName={`formBrandModal`}
          handleFunctionName={`formBrand`}
        />
      </div>
      <div className="relative">
        <div
          onClick={() => {
            // setIsModalBackgroundOpen(true)
            setAllStates((prev) => ({
              ...prev,
              isModalBackgroundOpen: true,
            }));
          }}
        >
          <ChevronSelector
            modalName={`formColorModal`}
            data={allStates.formColor}
            title={"Color"}
            place={"form"}
          />
        </div>

        <MultiSelectFormPage
          name={"color"}
          data={colors}
          modalName={`formColorModal`}
          handleFunctionName={`formColor`}
        />
      </div>
      <div className="flex w-full gap-x-2 ">
        <div className="flex flex-col w-full">
          <label htmlFor="year" className="font-semibold">
            Year
          </label>
          <input
            id="year"
            name="year"
            type="number"
            max={new Date().getFullYear()}
            min={1920}
            className="mt-2 rounded-lg p-2 dark:bg-[#1F232A] border-2 border-teal-600 outline-none"
            placeholder={`eg. ${new Date().getFullYear()}`}
            required
          ></input>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="milage" className="font-semibold">
            Km
          </label>
          <input
            id="milage"
            name="milage"
            type="number"
            min={0}
            max={1000000}
            className="mt-2 rounded-lg p-2 dark:bg-[#1F232A] border-2 border-teal-600 outline-none"
            placeholder="eg. 22000"
            required
          ></input>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-x-2 ">
        <div className="flex flex-col w-full">
          <label htmlFor="price" className="font-semibold">
            {`Price (USD)`}
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            className="mt-2 rounded-lg p-2 dark:bg-[#1F232A] border-2 border-teal-600 outline-none"
            placeholder={`eg. 2000`}
            required
          ></input>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="city" className="font-semibold">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className="mt-2 rounded-lg p-2 dark:bg-[#1F232A] border-2 border-teal-600 outline-none"
            placeholder="eg. Ny"
            required
          ></input>
        </div>
      </div>
      <Category place={"form"} />
      <RectSelector
        data={formTransmissions}
        title={`Transmission`}
        handleFunctionName={`formTransmission`}
        state={allStates.formTransmission}
        name={"transmission"}
      />

      <div className="flex flex-col">
        <label htmlFor="description" className="font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="mt-2 rounded-lg p-2 dark:bg-[#1F232A] border-2 border-teal-600 outline-none"
          placeholder="Add an optional description of the car"
          rows={4}
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="seller_name" className="font-semibold">
          Seller Name
        </label>
        <input
          id="seller_name"
          name="seller_info.name"
          type="text"
          className="mt-2 dark:bg-[#1F232A] rounded-lg p-2  border-2 border-teal-600 outline-none"
          required
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="seller_email" className="font-semibold">
          Seller Email
        </label>
        <input
          id="seller_email"
          name="seller_info.email"
          type="email"
          className="mt-2 rounded-lg p-2 dark:bg-[#1F232A]  border-2 border-teal-600 outline-none"
          required
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="seller_phone" className="font-semibold">
          Seller Phone
        </label>
        <input
          id="seller_phone"
          name="seller_info.phone"
          type="tel"
          className="mt-2 rounded-lg p-2 dark:bg-[#1F232A]  border-2 border-teal-600 outline-none"
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="images" className="font-semibold">
          Select up to 4 images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="mt-2 rounded-lg p-2  border-2 border-teal-600 outline-none"
          multiple
          accept="image/*"
          required
          onChange={(e) => {
            let sizelet = 0;
            if (e.target.files) {
              for (let { size } of e.target.files) {
                sizelet = sizelet + size;
              }
              setFileSize(sizelet);
              toBase64(e.target.files);
            }
          }}
        ></input>
      </div>
      {session.status === "authenticated" ? (
        <button
          type="submit"
          disabled={submitting ? true : false}
          className=" bg-secondary rounded-lg py-2 light:text-black font-semibold"
        >
          {submitting ? "submitting..." : "Submit Advert"}
        </button>
      ) : (
        <Link href={`/login`} className="w-full flex justify-center">
          <button className=" px-3 rounded-3xl border-2 border-teal-600 font-semibold ">
            <span className=" leading-20">Login</span>
          </button>
        </Link>
      )}
    </form>
  );
};

export default NewAdFrom;
