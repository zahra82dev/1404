import ContactForm from "@/components/ContactForm";
const page = () => {
  return (
    <div className="h-full  md:mt-8 grid grid-cols-10  gap-x-2">
      <div className="hidden md:block sticky top-[6.3rem] bg-white dark:bg-[#1e232a] z-20 col-span-3 col-start-8 self-start">
        <ContactForm />
      </div>
      <div className="col-span-10 md:col-span-7 col-start-1 row-start-1">
        <div className=" w-full">
          <div className="bg-transparent animate-pulse rounded-xl shadow-lg w-full relative">
            <div className="w-[100%]  flex flex-col gap-y-4 rounded-xl  relative singleCarAdvertSwiper">
              <div className="w-full dark:bg-slate-300 rounded-xl absolute singleCarAdvertSwiper inset-0"></div>
            </div>
            <div className="w-full relative mt-2 flex gap-x-3 rounded-xl singleCarAdvertLittleSwiper">
              <div className="bg-slate-200 dark:bg-slate-300  rounded-xl absolute singleCarAdvertLittleSwiper left-0 top-0 right-[76%] bottom-0 border-2"></div>
              <div className="bg-slate-200 dark:bg-slate-300  rounded-xl absolute singleCarAdvertLittleSwiper left-[25%] top-0 right-[51%] bottom-0"></div>
              <div className="bg-slate-200 dark:bg-slate-300  rounded-xl absolute singleCarAdvertLittleSwiper left-[50%] top-0 right-[26%] bottom-0"></div>
              <div className="bg-slate-200 dark:bg-slate-300  rounded-xl absolute singleCarAdvertLittleSwiper left-[75%] top-0 right-0 bottom-0"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-slate-300 w-full rounded-xl mt-4">
            <div className="bg-slate-200 animate-pulse rounded-xl shadow-lg w-full relative flex flex-col gap-y-10 px-4 py-8">
              <div className="text-2xl font-semibold flex gap-x-2  w-full  rounded-xl ">
                <p className="w-[5rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
                <h1 className="w-[7rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></h1>
                <p className="w-[4rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-[7rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
                <p className="w-[5rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
              </div>
              <div className="flex gap-x-2">
                <p className="w-[4rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
                <p className="w-[3rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
                <p className="w-[3rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
                <p className="w-[2rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-8 py-6 px-4 bg-slate-200 rounded-xl mt-4 animate-pulse">
            <p className="w-[7rem] h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
            <p className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
            <p className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
            <p className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></p>
          </div>
        </div>
        <div className=" md:hidden bg-white z-20">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default page;
