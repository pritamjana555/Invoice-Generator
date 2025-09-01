import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
import { InvoiceTermsPreview } from "@/app/component/form/invoiceTerms/InvoiceTermsPreview";
import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";
import { ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { TooltipProvider } from "@radix-ui/react-tooltip";

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
  return (
    <Magnetic intensity={0.3} actionArea="global" range={100}>
      <div className="">
        <Magnetic intensity={0.1} actionArea="global" range={200}>
          <div className=" 
    w-full h-auto overflow-y-scroll
    sm:w-[90%] sm:h-[600px]
    md:w-[450px] md:h-[750px]
    lg:w-[560px] lg:h-[840px]
    xl:w-[600px] xl:h-[866px]
    2xl:w-[640px] 2xl:h-[880px]
     ipad:w-[500px] ipad:h-[800px]
    ipad-air:w-[480px] ipad-air:h-[780px]
    ipad-mini:w-[420px] ipad-mini:h-[700px] 
    overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-200 border border-dashed justify-center items-center">

            {/* Invoice Terms */}
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger><InvoiceTermsPreview {...invoiceTerms} onClick={onClick} /></HoverCardTrigger>
              <HoverCardContent
                side="top"
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
            <div className="border-b grid grid-cols-2 justify-between border-dashed">
              {/* Your Details */}
              <div
                className="py-4 px-10 border-r border-dashed cursor-pointer relative group"
                onClick={() => onClick && onClick("1")}
              >
                {!!onClick && (
                  <>
                    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
                    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
                    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
                    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
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
                    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
                    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
                    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
                    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
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
            </div>

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
      </div>
    </Magnetic>
  );
};
