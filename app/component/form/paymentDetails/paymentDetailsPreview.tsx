import { currencyList } from "@/lib/currency";
import { ChevronDown } from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export const PaymentDetailsPreview: React.FC<
  PaymentDetails & { onClick?: (step: string) => void }
> = ({
  bankName,
  accountNumber,
  accountName,
  routingCode,
  swiftCode,
  ifscCode,
  currency = "INR",
  onClick,
}) => {
  const currencyDetails = currencyList.find(
    (currencyDetails) =>
      currencyDetails.value.toLowerCase() === currency.toLowerCase()
  )?.details;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 group cursor-pointer relative"
      onClick={() => onClick && onClick("4")}
    >
      {/* Hover corners */}
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] -rotate-45 group-hover:block hidden absolute bottom-0 right-0" />
        </>
      )}

      {/* Left: Bank Details */}
      <div className="py-3 px-4 sm:px-6 md:py-4 md:pl-10 md:pr-3">
        <p className="text-[11px] text-neutral-400 font-medium uppercase mb-3">
          Bank Details
        </p>
        <div className="space-y-1">
          {/* Bank Name */}
          <div className="grid grid-cols-2 items-center">
            <p className="truncate text-xs font-medium text-gray-500">
              Bank Name
            </p>
            {bankName ? (
              <p className="truncate text-xs font-medium text-gray-600">
                {bankName}
              </p>
            ) : (
              <FlickeringGrid
                className="w-full h-full"
                squareSize={2}
                gridGap={4}
                color="#0B99FF"
                maxOpacity={0.5}
                flickerChance={2}
              />
            )}
          </div>

          {/* Account Number */}
          <div className="mb-2 grid grid-cols-2 items-center">
            <p className="truncate text-xs font-medium text-gray-500">
              Account Number
            </p>
            {accountNumber ? (
              <p className="truncate text-xs font-medium text-gray-600">
                {accountNumber}
              </p>
            ) : (
              <FlickeringGrid
                className="w-full h-full"
                squareSize={2}
                gridGap={4}
                color="#0B99FF"
                maxOpacity={0.5}
                flickerChance={2}
              />
            )}
          </div>

          {/* Account Name */}
          <div className="mb-2 grid grid-cols-2 items-center">
            <p className="truncate text-xs font-medium text-gray-500">
              Account Name
            </p>
            {accountName ? (
              <p className="truncate text-xs font-medium text-gray-600">
                {accountName}
              </p>
            ) : (
              <FlickeringGrid
                className="w-full h-full"
                squareSize={2}
                gridGap={4}
                color="#0B99FF"
                maxOpacity={0.5}
                flickerChance={2}
              />
            )}
          </div>

          {/* Swift Code */}
          <div className="mb-2 grid grid-cols-2 items-center">
            <p className="truncate text-xs font-medium text-gray-500">
              Swift Code
            </p>
            {swiftCode ? (
              <p className="truncate text-xs font-medium text-gray-600">
                {swiftCode}
              </p>
            ) : (
              <FlickeringGrid
                className="w-full h-full"
                squareSize={2}
                gridGap={4}
                color="#0B99FF"
                maxOpacity={0.5}
                flickerChance={2}
              />
            )}
          </div>

          {/* Routing Code (optional) */}
          {routingCode && (
            <div className="mb-2 grid grid-cols-2 items-center">
              <p className="truncate text-xs font-medium text-gray-500">
                Routing Code
              </p>
              <p className="truncate text-xs font-medium text-gray-600">
                {routingCode}
              </p>
            </div>
          )}

          {/* IFSC Code (optional) */}
          {ifscCode && (
            <div className="mb-2 grid grid-cols-2 items-center">
              <p className="truncate text-xs font-medium text-gray-500">
                IFSC Code
              </p>
              <p className="truncate text-xs font-medium text-gray-600">
                {ifscCode}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Currency */}
      <div className="py-3 px-4 sm:px-6 md:py-4 md:px-10">
        <p className="text-[11px] text-neutral-400 font-medium uppercase mb-3">
          Payable in
        </p>
        {currencyDetails && (
          <div className="flex gap-2 md:justify-between items-center w-full">
            <div className="flex gap-3 items-center">
              <currencyDetails.icon className="w-4 h-4 md:w-6 md:h-6 rounded-full" />
              <div>
                <p className="font-medium text-xs md:text-sm">
                  {currencyDetails.currencyName}
                </p>
                <p className="text-xxs md:text-xs text-neutral-400">
                  {currencyDetails.currencySymbol}{" "}
                  {currencyDetails.currencyShortForm}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
