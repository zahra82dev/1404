import LoadingComp from "@/components/LoadingComp";

const loading = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="mt-[-20rem]">
        <LoadingComp />
      </div>
    </div>
  );
};

export default loading;
