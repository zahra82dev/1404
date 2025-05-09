import { Inter } from "next/font/google";
import "../assets/styles/globalCss.css";
import Contextwrapper from "@/context/context";
import ModalHouse from "@/components/ModalHouse";
import Navbar from "@/components/Navbar";
import "swiper/css";
import Footer from "@/components/Footer";
import ReactQuery from "@/react query/ReactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CarNavbar from "@/components/CarNavbar";
import AuthProvider from "@/authprovider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OverflowComp from "@/components/OverflowComp";
import { Providers } from "../components/providers";
import React from "react";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "DEV Auto",
  description: "DEV Auto is the leading car platform in the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ReactQuery>
        <html lang="en" suppressHydrationWarning>
          <body className=" w-full flex flex-col items-center overflow-x-hidden dark:bg-[#1e232a] dark:text-[#A7ADBC]">
            <Providers>
              <Contextwrapper>
                <Navbar />
                <CarNavbar />
                <div className="layout">{children}</div>

                <ModalHouse />
                <Footer />
                <OverflowComp />
              </Contextwrapper>
              <ReactQueryDevtools initialIsOpen={false} />
              <ToastContainer />
            </Providers>
          </body>
        </html>
      </ReactQuery>
    </AuthProvider>
  );
}
