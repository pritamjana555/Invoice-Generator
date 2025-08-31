/* eslint-disable @next/next/no-img-element */
import React from "react";
import { currencyList } from "@/lib/currency";
import { ChevronDown } from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export const InvoiceDetailsPreview: React.FC<
  InvoiceItemDetails & { onClick?: (step: string) => void }
> = ({ note, discount, taxRate, items, currency = "INR", onClick }) => {
  const currencyType = currency;
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === currencyType.toLowerCase()
  )?.details;
  const subtotal = calculateTotalAmount(items);
  const discountAmount = subtotal - (discount ? +discount : 0);
  const taxAmount = discountAmount * ((taxRate ? +taxRate : 0) / 100);
  const totalAmount = discountAmount + taxAmount;

  return (
    <div
      className="group cursor-pointer relative w-full"
      onClick={() => onClick && onClick("3")}
    >
      {/* Hover corners */}
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 sm:w-5 sm:h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 sm:w-5 sm:h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0" />
        </>
      )}

      {/* Header Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
        <div className="py-4 px-4 sm:px-6 md:px-10">
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">
            Description
          </p>
          {items.some((item) => item.itemDescription?.trim() !== "") ? (
            <span className="block text-xs sm:text-sm font-medium text-gray-600 mt-1 break-words" />
          ) : (
            <div className="relative h-4 w-4/6 my-3 rounded-md bg-background overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <FlickeringGrid
                  className="w-full h-full"
                  squareSize={2}
                  gridGap={4}
                  color="#0B99FF"
                  maxOpacity={0.5}
                  flickerChance={2}
                />
              </div>
            </div>
          )}
        </div>

        <div className="py-4 px-4 sm:px-6 md:px-10 grid grid-cols-3 items-center gap-2 sm:gap-4">
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">QTY</p>
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">Price</p>
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase text-right">
            Amount
          </p>
        </div>
      </div>

      {/* Items list */}
      <div className="overflow-x-auto">
        {items.map(({ itemDescription, amount, qty }, index) => (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 items-center border-b ${
              index === 0 ? "border-t" : ""
            } border-dashed px-4 sm:px-6 md:px-10 py-3`}
            key={index}
          >
            <p className="truncate text-xs sm:text-sm font-medium text-gray-600">
              {itemDescription}
            </p>
            <div className="sm:pl-6 md:pl-10 grid grid-cols-3 items-center gap-2 sm:gap-4">
              <p className="truncate text-xs sm:text-sm font-medium text-gray-600">
                {qty || "-"}
              </p>
              <p className="truncate text-xs sm:text-sm font-medium text-gray-600">
                {amount ? addCommasToNumber(amount) : ""}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600 text-right">
                {currencyDetails?.currencySymbol}
                {amount ? addCommasToNumber((qty ? qty : 1) * amount) : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {note ? (
          <div className="pt-6 pb-4">
            <p className="text-xs font-medium text-neutral-400 pb-1 px-4 sm:px-6 md:px-10">
              Note
            </p>
            <p className="text-xs sm:text-sm font-medium text-neutral-400 px-4 sm:px-6 md:px-10 break-words">
              {note}
            </p>
          </div>
        ) : (
          <div />
        )}

        <div>
          <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 border-b border-dashed py-3">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Subtotal</p>
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(subtotal)}
            </p>
          </div>

          {discount && (
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 border-b border-dashed py-3">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Discount</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                {currencyDetails?.currencySymbol}
                {discount ? addCommasToNumber(+discount) : ""}
              </p>
            </div>
          )}

          {taxRate && (
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 border-b border-dashed py-3">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Tax ({taxRate})%
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                {currencyDetails?.currencySymbol}
                {addCommasToNumber(+taxAmount.toFixed(2))}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-3">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Amount</p>
            <p className="text-sm sm:text-base font-semibold">
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(totalAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helpers */
const calculateTotalAmount = (items: Item[]): number =>
  items.reduce((total, item) => {
    const quantity = item.qty ? +item.qty : 1;
    const amount = item.amount ? +item.amount : 0;
    return total + quantity * amount;
  }, 0);

const addCommasToNumber = (number: number): string => {
  let numberString = number.toString();
  const parts = numberString.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
