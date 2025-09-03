"use client";
import Image from "next/image";
import { UserInputForm } from "@/app/component/form/userInputForm";
import { FormSteps } from "@/app/component/form/step/fromSteps";
import { UserDataPreview } from "@/app/new/component/userDataPreview";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const NewInvoiceForm = () => {
  const methods = useForm();
  const [isClient, setIsClient] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        { opacity: 0.4 }, // initial
        {
          opacity: 1, // fade while scrolling
          ease: "none",
          scrollTrigger: {
            trigger: previewRef.current,
            start: "top 15%",
            end: "bottom 15%",
            scrub: true,
          },
        }
      );
    }
  }, [isClient]);

  return (
    <>
      {isClient ? (
        <FormProvider {...methods}>
          <div className="min-h-screen max-[760px]:bg-white max-[760px]:w-full w-3/5 h-full lg:p-10 sm:p-0 border-r border-dashed flex flex-col justify-between max-[760px]:sticky max-[760px] max-[760px]:z-10">
            <div>
              <div className="flex gap-2 items-center pl-6 pt-5 max-[760px]:rounded-tl-lg max-[760px]:rounded-tr-lg max-[760px]:shadow-[0_4px_16px_rgba(0,0,0,0.4)] p-4 bg-white">
                <Image
                  src="/android-chrome-512x512.png"
                  width={40}
                  height={40}
                  className="rounded-lg"
                  alt="logo"
                />
                <div>
                  <p className="font-semibold ">Invoice Generator</p>
                </div>
              </div>
              <div className="max-[760px]:bg-white  max-[1025px]:(-ml-12, w-[calc(100%+80px), px-12, p-6] ) p-6">
                <UserInputForm />
              </div>
            </div>
            <FormSteps />
          </div>

          {/* 👇 GSAP fade target */}

          <div

            className="min-h-[866px] max-[760px]:sticky max-[760px]:top-0 relative h-full w-full flex justify-center items-center p-4 md:p-0 shadow-slate-900 "
          >

            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <UserDataPreview />
            </div>


        </FormProvider>
      ) : (
        <div />

      )}
    </>
  );
};
