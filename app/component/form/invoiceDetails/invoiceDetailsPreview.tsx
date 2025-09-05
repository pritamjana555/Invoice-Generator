"use client";

import React, { useEffect, useState } from "react";
import { currencyList } from "@/lib/currency";
import { ChevronDown } from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { motion, useMotionTemplate } from "framer-motion";
import { useScrollContext } from "../../../context/ScrollContext";


export const InvoiceDetailsPreview: React.FC<
  InvoiceItemDetails & { onClick?: (step: string) => void }
> = ({ note, discount, taxRate, items, currency = "INR", onClick }) => {
  const [mounted, setMounted] = useState(false);
  const { bgOpacity } = useScrollContext();
  const bg = useMotionTemplate`rgba(0,0,0,${bgOpacity})`;
  useEffect(() => setMounted(true), []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 760);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const currencyType = currency;
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === currencyType.toLowerCase()
  )?.details;

  const subtotal = calculateTotalAmount(items);
  const discountAmount = subtotal - (discount ? parseFloat(discount.toString()) : 0);
  const taxAmount = discountAmount * ((taxRate ? parseFloat(taxRate.toString()) : 0) / 100);
  const totalAmount = discountAmount + taxAmount;

  return (
    <motion.div style={isMobile ? { backgroundColor: bg } : {}} className=" group cursor-pointer w-full overflow-y-scroll" onClick={() => onClick && onClick("3")}>
      {!!onClick && mounted && (
        <>
          <ChevronDown className="animate-pulse w-4 h-4 sm:w-5 sm:h-5 text-[#002147] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 sm:w-5 sm:h-5 text-[#002147] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-4 h-4 sm:w-5 sm:h-5 text-[#002147] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-4 h-4 sm:w-5 sm:h-5 text-[#002147] -rotate-45 group-hover:block hidden absolute bottom-0 right-0" />
        </>
      )}

      {/* Header Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
        <div className="py-4 px-4 sm:px-6 md:px-7">
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">
            Description
          </p>
          {items.some((item) => item.itemDescription?.trim() !== "") ? (
            <span className="block text-xs sm:text-sm font-medium text-gray-600 mt-1 break-words" />
          ) : mounted ? (
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
          ) : null}
        </div>

        <div className="py-4 px-4 sm:px-6 md:px-7 grid grid-cols-3 items-center gap-2 sm:gap-4">
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">QTY</p>
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">Price</p>
          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase text-right">
            Amount
          </p>
        </div>
      </div>

      {/* Items list */}
      <div className={`overflow-x-auto max-[760px]:${items.length > 3 ? "overflow-y-scroll" : ""}`}>
        {items.map(({ itemDescription, amount, qty }, index) => (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 items-center border-b ${index === 0 ? "border-t" : ""
              } border-dashed px-4 sm:px-6 md:px-9 py-1`}
            key={index}
          >
            <p className="truncate text-xs sm:text-sm font-medium text-gray-600">{itemDescription}</p>
            <div className="sm:pl-6 md:pl-10 grid grid-cols-3 items-center gap-2 sm:gap-4">
              <p className="truncate text-xs sm:text-sm font-medium text-gray-600 overflow-hidden">{qty || "-"}</p>
              <p className="truncate text-xs sm:text-sm font-medium text-gray-600 overflow-hidden">
                {amount !== undefined ? addCommasToNumber(parseFloat(amount.toString())) : ""}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-600 text-right overflow-hidden">
                {currencyDetails?.currencySymbol}
                {amount !== undefined
                  ? addCommasToNumber((qty ? qty : 1) * parseFloat(amount.toString()))
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-2">
        <div className="space-y-2">
          {note && (
            <div className="pt-6 pb-4">
              <p className="text-xs font-medium text-neutral-400 pb-1 px-4 sm:px-6 md:px-7">Note</p>
              <p className="text-xs sm:text-sm font-medium text-neutral-400 px-4 sm:px-6 md:px-7 break-words">{note}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center pl-5 px-4 sm:px-6 md:px-7 border-b border-dashed py-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Subtotal</p>
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(subtotal)}
            </p>
          </div>

          {discount && (
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-7 border-b border-dashed py-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Discount</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                {currencyDetails?.currencySymbol}
                {addCommasToNumber(parseFloat(discount.toString()))}
              </p>
            </div>
          )}

          {taxRate && (
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-7 border-b border-dashed py-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Tax ({taxRate})%</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                {currencyDetails?.currencySymbol}
                {addCommasToNumber(parseFloat(taxAmount.toFixed(2)))}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center px-4 sm:px-6 md:px-5 py-1.5">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Amount</p>
            <p className="text-sm sm:text-base font-semibold">
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(parseFloat(totalAmount.toFixed(2)))}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* Helpers */
const calculateTotalAmount = (items: Item[]): number =>
  items.reduce((total, item) => {
    const quantity = item.qty ? parseInt(item.qty.toString()) : 1;
    const amount = item.amount ? parseFloat(item.amount.toString()) : 0;
    return total + quantity * amount;
  }, 0);

const addCommasToNumber = (number: number): string => {
  if (isNaN(number)) return "";
  return number.toLocaleString("en-US", { // enforce consistent locale
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
