"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/react query/ReactQuery";
import LoadingComp from "./LoadingComp";
import { useSession } from "next-auth/react";
const ContactForm = () => {
  const id = useParams();
  const getButtonStatus = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/contact/${id.id}`
    );
    const tj = await resp.json();
    return tj;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["contact", `${id.id}`],
    queryFn: getButtonStatus,
  });
  const exists = data?.exists === true;
  const session = useSession();
  return (
    <aside className="  w-full shadow-xl rounded-xl dark:bg-transparent relative">
      {/* <div className="absolute inset-0 opacity-50 bg-white rounded-xl flex justify-center items-center z-[10]"></div>
      <div className="absolute inset-0 rounded-xl flex justify-center items-center z-[20] text-white text-2xl font-semibold">
        <p className=" bg-red-400 rounded-lg p-4">Under development</p>
      </div> */}
      <form
        className=" sticky flex flex-col gap-y-4 p-4 top-5 rounded-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const formData = new FormData(e.currentTarget);
            const formObject = Object.fromEntries(formData);

            const resp = await fetch(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/contact/${id.id}`,
              {
                method: "PUT",
                body: JSON.stringify(formObject),
              }
            );
            queryClient.invalidateQueries({
              queryKey: ["contact", `${id.id}`],
            });
          } catch (error) {}
        }}
      >
        <p className=" text-center font-semibold text-xl">Contact the seller</p>
        <textarea
          name="body"
          id=""
          rows={4}
          placeholder="I'm interested..."
          className="py-2 px-4 border-2 rounded-md border-teal-600 outline-none"
          required
        ></textarea>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="py-2 px-4 border-2 rounded-md border-teal-600 outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="py-2 px-4 border-2 rounded-md border-teal-600 outline-none"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="py-2 px-4 border-2 rounded-md border-teal-600 outline-none"
          required
        />
        {isLoading ? (
          <button
            className={` bg-teal-800  text-white px-4 py-2 rounded-md  ${
              exists
                ? ` opacity-60 cursor-default`
                : `cursor-pointer hover:bg-teal-800`
            }`}
            disabled={true}
          >
            <LoadingComp />
          </button>
        ) : session.status === "authenticated" ? (
          <button
            className={` bg-teal-700  text-white px-4 py-2 rounded-md  ${
              exists
                ? ` opacity-60 cursor-default`
                : `cursor-pointer hover:bg-teal-800`
            }`}
            disabled={exists}
          >
            {exists ? `Message delivered` : `Send message`}
          </button>
        ) : (
          <p className="text-center my-2">Please login to send message</p>
        )}
      </form>
    </aside>
  );
};

export default ContactForm;
