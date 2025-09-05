import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
import { InvoiceTermsPreview } from "@/app/component/form/invoiceTerms/InvoiceTermsPreview";
import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";
import { ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { motion, useMotionTemplate } from "framer-motion";
import { useScrollContext } from "../../context/ScrollContext";
import { useState, useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


interface PreviewDetailsProps {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  onClick?: (step: string) => void;
}

export const PreviewDetails = ({

  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  onClick,
}: PreviewDetailsProps) => {
  const { bgOpacity } = useScrollContext();
  const bg = useMotionTemplate`rgba(0,0,0,${bgOpacity})`;
  const [isMobile, setIsMobile] = useState(false);

const [isSmallHeight, setIsSmallHeight] = useState(false);
const [isSmallWidth, setIsSmallWidth] = useState(false);

useEffect(() => {
  const checkHeight = () => setIsSmallHeight(window.innerHeight <= 1020);
  const checkWidth = () => setIsSmallWidth(window.innerWidth <= 760);

  // run once on mount
  checkHeight();
  checkWidth();

  // add resize listeners
  window.addEventListener("resize", checkHeight);
  window.addEventListener("resize", checkWidth);

  return () => {
    window.removeEventListener("resize", checkHeight);
    window.removeEventListener("resize", checkWidth);
  };
}, []);


  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 760);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (

    <motion.div


      className=""
    >
      <Magnetic intensity={0.1} actionArea="global" range={200}>
        <div  
        style={{ maxHeight: "1080px",
    maxWidth: "760px",
    transform: isSmallHeight || isSmallWidth ? "" : "scale(1)",}}
        className=" 
          max-[760px]:sticky max-[760px]:top-0
         max-[760px]:overflow-y-scroll
          
          h-full
          max-[760px]:scale-[0.7]
     max-[760px]:h-screen
     lg:scale-100
     xl:scale-100
     2xl:scale-100 
    md:w-[450px]
    lg:w-[560px] 
    xl:w-[600px] 
    2xl:w-[640px] 
    w-full 
    mx-auto
    overflow-hidden bg-white  rounded-2xl shadow-md shadow-slate-200 max-[760px]:shadow-gray-400 border border-dashed max-[760px]:border-none justify-center items-center">

          {/* Invoice Terms */}
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger><InvoiceTermsPreview {...invoiceTerms} onClick={onClick} /></HoverCardTrigger>
            <HoverCardContent
              side="bottom"
              align="center"
              className="bg-black text-white text-xs w-fit pl-1.5 py-1.5 rounded-full shadow-lg flex items-center gap-2  font-medium animate-in fade-in-0 zoom-in-95 duration-100"
            >
              <span className="bg-gray-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm">
                5
              </span>
              Invoice terms
            </HoverCardContent>
          </HoverCard>



          {/* Your Details + Company Details */}
          <motion.div style={isMobile ? { backgroundColor: bg } : {}} className="border-b grid grid-cols-2 justify-between border-dashed">
            {/* Your Details */}
            <div
              className="py-4 px-10 border-r border-dashed cursor-pointer relative group"
              onClick={() => onClick && onClick("1")}
            >
              {!!onClick && (
                <>
                  <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
                  <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
                  <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
                  <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
                </>
              )}
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger><YourDetailsPreview {...yourDetails} /></HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  align="center"
                  className="bg-black text-white w-fit pl-1.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium animate-in fade-in-0 zoom-in-95"
                >
                  <span className="bg-gray-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm">
                    1
                  </span>
                  Your company
                </HoverCardContent>
              </HoverCard>


            </div>

            {/* Company Details */}
            <div
              className="py-4 px-10 border-dashed cursor-pointer relative group"
              onClick={() => onClick && onClick("2")}
            >
              {!!onClick && (
                <>
                  <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
                  <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
                  <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
                  <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
                </>
              )}
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger><CompanyDetailsPreview {...companyDetails} /></HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  align="center"
                  className="bg-black text-white w-fit pl-1.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium animate-in fade-in-0 zoom-in-95"
                >
                  <span className="bg-gray-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm">
                    2
                  </span>
                  your client
                </HoverCardContent>
              </HoverCard>


            </div>
          </motion.div>

          {/* Invoice Details + Payment Details */}
          <div className="flex flex-col justify-between">
            <div className="border-b justify-between border-dashed">
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger><InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} /></HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  align="center"
                  className="bg-black text-white w-fit pl-1.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium animate-in fade-in-0 zoom-in-95"
                >
                  <span className="bg-gray-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm">
                    3
                  </span>
                  Invoice details
                </HoverCardContent>
              </HoverCard>

            </div>
            <div>
              {/* ✅ PaymentDetails fixed */}
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger><PaymentDetailsPreview {...paymentDetails} onClick={onClick} /></HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  align="center"
                  className="bg-black text-white w-fit pl-1.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium animate-in fade-in-0 zoom-in-95"
                >
                  <span className="bg-gray-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm">
                    4
                  </span>
                  Payment method
                </HoverCardContent>
              </HoverCard>

            </div>
          </div>
        </div>
      </Magnetic>
    </motion.div>

  );
};