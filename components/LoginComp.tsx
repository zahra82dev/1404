"use client";
import { signIn } from "next-auth/react";
import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
const LoginComp = () => {
  const [provider, setProvider] = useState<
    LiteralUnion<BuiltInProviderType, string> | undefined
  >();
  useEffect(() => {
    const provider = async () => {
      const providers = await getProviders();
      const google = providers?.google;
      setProvider(google?.id);
    };
    provider();
  }, []);

  return (
    <div className=" flex flex-col gap-y-8 w-full max-w-[20rem] mt-[-15rem] md:mt-[-10rem] justify-center items-center border-2 border-teal-600 shadow-xl rounded-xl px-8 py-8">
      <p className=" font-semibold text-xl">Please Login</p>
      <button
        onClick={() => signIn(provider)}
        className="  flex relative text-white rounded-md w-full  h-12  group"
      >
        <div className="w-full h-full flex absolute inset-0 rounded-lg">
          <span className="w-full bg-red-500  transition-all duration-150 group-hover:bg-red-600 float-start h-12 rounded-l-lg"></span>
          <span className="w-full bg-green-600 transition-all duration-150 group-hover:bg-green-700 float-start h-12"></span>
          <span className="w-full bg-yellow-400 transition-all duration-150 group-hover:bg-yellow-500 float-start h-12"></span>
          <span className="w-full bg-blue-700 transition-all duration-150 group-hover:bg-blue-800 float-start h-12 rounded-r-lg"></span>
        </div>
        <span className="absolute text-lg z-2 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold">
          Google
        </span>
      </button>
    </div>
  );
};

export default LoginComp;
