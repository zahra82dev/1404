import { useGlobalContext } from "@/context/context";
const HamMenuBackground = () => {
  const { allStates, setAllStates } = useGlobalContext();
  return (
    <div
      className={` fixed top-[4.25rem] left-0 w-full h-[95%] transition-all duration-300 md:hidden ${
        allStates.hamMenu
          ? " backdrop-brightness-50 test z-[11] opacity-100"
          : "backdrop-brightness-100 testt z-[-10] opacity-0"
      }`}
      onClick={() => {
        setAllStates((prev) => ({ ...prev, hamMenu: false }));
        document.body.style.overflowY = "visible";
      }}
    ></div>
  );
};

export default HamMenuBackground;
