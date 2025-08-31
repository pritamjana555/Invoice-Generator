import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
import { InvoiceTermsPreview } from "@/app/component/form/invoiceTerms/InvoiceTermsPreview";
import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";
import { ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

// types
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
    <Magnetic intensity={0.3} actionArea="global" range={10}>
      <div className="">
        <Magnetic intensity={0.1} actionArea="global" range={200}>
          <div className="overflow-hidden bg-white rounded-2xl shadow-md shadow-slate-200 border border-dashed justify-center items-center">
            
            {/* Invoice Terms */}
            <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} />

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
                <YourDetailsPreview {...yourDetails} />
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
                <CompanyDetailsPreview {...companyDetails} />
              </div>
            </div>

            {/* Invoice Details + Payment Details */}
            <div className="flex flex-col justify-between">
              <div className="border-b justify-between border-dashed">
                <InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} />
              </div>
              <div>
                {/* ✅ PaymentDetails fixed */}
                <PaymentDetailsPreview {...paymentDetails} onClick={onClick} />
              </div>
            </div>
          </div>
        </Magnetic>
      </div>
    </Magnetic>
  );
};
