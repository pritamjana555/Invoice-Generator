"use client";
import Image from "next/image";
import { UserInputForm } from "@/app/component/form/userInputForm";
import { FormSteps } from "@/app/component/form/step/fromSteps";
import { UserDataPreview } from "@/app/new/component/userDataPreview";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollContext } from "../../context/ScrollContext";
import { useMotionTemplate } from "framer-motion";


export const NewInvoiceForm = () => {
  const { bgOpacity } = useScrollContext();
    const bg = useMotionTemplate`rgba(0,0,0,${bgOpacity})`;
  const methods = useForm();
  const [isClient, setIsClient] = useState(false);
  const { targetRef } = useScrollContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      try {
        const step = localStorage.getItem("step");
        if (!(step && typeof +step === "number"))
          localStorage.setItem("step", "1");
      } catch (e) {
        localStorage.setItem("step", "1");
      }
    }
  }, []);
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 760);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  return (
    <>
      {isClient ? (
        <FormProvider {...methods}>
          <div className="min-h-screen max-[760px]:bg-white max-[760px]:w-full w-3/5 h-full lg:p-10 sm:p-0 border-r border-dashed flex flex-col justify-between max-[760px]:sticky max-[760px] max-[760px]:z-10">
            <div>
              <div className="flex max-[760px]:flex-col max-[760px]:justify-items-start max-[760px]:items-start gap-2 items-center pl-6 pt-5 max-[760px]:rounded-tl-lg max-[760px]:rounded-tr-lg max-[760px]:shadow-[0_4px_16px_rgba(0,0,0,0.4)] p-4 bg-white">
                <Image
                  src="/logo.svg"
                  width={60}
                  height={60}
                  className="h-auto w-20"
                  alt="logo"
                />
                <div>
                  <span className="relative inline-block">
                    <span className="absolute inset-0 -skew-x-10 bg-gradient-to-r from-orange-100 to-pink-100"></span>
                  <p className="font-medium font-gtalpina text-xl relative">Invoice Generator</p>
                  </span>
                </div>
              </div>
              <div  ref={targetRef} className="max-[760px]:bg-white  max-[1025px]:(-ml-12, w-[calc(100%+80px), px-12, p-6] ) p-6 font-gtpro">
                <UserInputForm />
              </div>
            </div>
            <FormSteps />
          </div>

          {/* 👇 GSAP fade target */}

          <motion.div style={isMobile ? { backgroundColor: bg } : {}}

            className="min-h-[866px] max-[760px]:sticky max-[760px]:top-0 relative h-full w-full flex justify-center items-center p-4 md:p-0 shadow-slate-900 "
          >

            <div className="absolute  inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] max-[760px]:bg-[radial-gradient(#C0C0C0_0.5px,transparent_1px)] [background-size:16px_16px]"></div>

            <UserDataPreview />
            </motion.div>


        </FormProvider>
      ) : (
        <div />

      )}
    </>
  );
};
