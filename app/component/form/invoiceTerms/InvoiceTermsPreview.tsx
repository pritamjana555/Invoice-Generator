"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { motion, useMotionTemplate } from "framer-motion";
import { useScrollContext } from "../../../context/ScrollContext";

export const InvoiceTermsPreview: React.FC<
  InvoiceTerms & { onClick?: (step: string) => void }
> = ({ invoiceNumber, issueDate, dueDate, onClick }) => {
  const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 760);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const { bgOpacity } = useScrollContext();


  const bg = useMotionTemplate`rgba(0,0,0,${bgOpacity})`;

  return (
    <motion.div
      style={isMobile ? { backgroundColor: bg } : {}}
      className="
        
        border-b border-dashed group cursor-pointer relative
        grid grid-cols-1 md:grid-cols-2 
        gap-4 md:gap-0
        px-4 sm:px-6 md:px-10 py-4
      "
      onClick={() => onClick && onClick("5")}
    >
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-[#002147] -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
        </>
      )}

      {/* Invoice Number */}
      <div>
        <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold uppercase">
          Invoice NO
        </p>
        <p className="font-medium text-xs sm:text-sm break-words">
          {invoiceNumber}
        </p>
      </div>

      {/* Dates Section */}
      <div
        className="
          flex flex-col sm:flex-row md:flex-row 
          items-start sm:items-center md:justify-between 
          gap-3 md:gap-6 
          md:pl-10
        "
      >
        <div>
          <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold uppercase">
            Issued
          </p>
          <p className="font-medium text-xs sm:text-sm">
            {issueDate ? format(issueDate, "do MMM yyyy") : ""}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold uppercase">
            Due Date
          </p>
          <p className="font-medium text-xs sm:text-sm">
            {dueDate ? format(dueDate, "do MMM yyyy") : ""}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
