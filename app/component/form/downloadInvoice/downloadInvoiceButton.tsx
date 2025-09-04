"use client";

import { Button } from "@/components/ui/button";
import { Document, Font, Page, pdf } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon, RotateCcw, AlertTriangle } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { currencyList } from "@/lib/currency";

type DownloadInvoiceButtonProps = {
  onGeneratePdf?: () => void; // optional callback
};

// Utility: check if an object has at least one non-empty value
function hasValidContent(obj: Record<string, any>): boolean {
  if (!obj || typeof obj !== "object") return false;
  return Object.values(obj).some((val) => {
    if (val === null || val === undefined) return false;
    if (typeof val === "string" && val.trim() === "") return false;
    return true;
  });
}

export const DownloadInvoiceButton = ({ onGeneratePdf }: DownloadInvoiceButtonProps) => {
  const [status, setStatus] = useState<"downloaded" | "downloading" | "not-downloaded">("not-downloaded");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { companyDetails, invoiceDetails, invoiceTerms, paymentDetails, yourDetails } = useData();

  useEffect(() => {
    if (status === "downloaded") {
      const timer = setTimeout(() => {
        setStatus("not-downloaded");
        setErrorMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleDownload = async () => {
    // Clear previous error when user retries
    setErrorMessage(null);

    // Validation before download
    const missing =
      !hasValidContent(companyDetails) ||
      !hasValidContent(invoiceDetails) ||
      !hasValidContent(invoiceTerms) ||
      !hasValidContent(paymentDetails) ||
      !hasValidContent(yourDetails);

    if (missing) {
      // Professional inline error box above the button
      setErrorMessage("Please complete all required sections before downloading the PDF.");
      return;
    }

    try {
      setStatus("downloading");
      setErrorMessage(null);

      const currencyDetails = currencyList.find(
        (currencyDetail) => currencyDetail.value.toLowerCase() === invoiceDetails.currency.toLowerCase()
      )?.details;

      const defaultCurrency = currencyList.find(
        (currencyDetail) => currencyDetail.value.toLowerCase() === "inr"
      )?.details;

      const data = await fetch(`/flag/1x1/${currencyDetails?.iconName || defaultCurrency?.iconName}.svg`);
      const svgFlag = await data.text();
      const countryImageUrl = await svgToDataUri(svgFlag);

      if (countryImageUrl) {
        const blob = await pdf(
          <Document>
            <Page size="A4" style={pdfContainers.page}>
              {/* Don't pass callbacks into react-pdf components */}
              <PdfDetails
                companyDetails={companyDetails}
                invoiceDetails={invoiceDetails}
                invoiceTerms={invoiceTerms}
                paymentDetails={paymentDetails}
                yourDetails={yourDetails}
                countryImageUrl={countryImageUrl}
              />
            </Page>
          </Document>
        ).toBlob();

        saveAs(blob, "invoice.pdf");
        setStatus("downloaded");

        // Trigger callback AFTER generation (no functions inside react-pdf)
        onGeneratePdf?.();
      } else {
        setStatus("not-downloaded");
        setErrorMessage("Failed to generate the country flag image. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setStatus("not-downloaded");
      setErrorMessage("An unexpected error occurred while generating the PDF. Try again.");
    }
  };

  const handleCreateNew = () => {
    localStorage.clear();
    localStorage.setItem("step", "1");
    window.location.reload();
  };

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold pb-6">Your invoice is ready</h1>
        <p className="text-neutral-500 text-md pb-7 text-center">
          Please review the details carefully before downloading your invoice.
        </p>

        {/* Inline error box — appears above Download button */}
        {errorMessage && (
          <div
            role="alert"
            className="w-11/12 max-w-xl mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 shadow-sm flex items-start gap-3"
          >
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-medium text-red-800">{errorMessage}</span>
              <small className="text-xs text-red-600/80 mt-1">Please fill missing fields in the form sections above.</small>
            </div>
          </div>
        )}

        {/* Download button */}
        <Button
          disabled={status === "downloading"}
          onClick={handleDownload}
          type="button"
          className="w-11/12 rounded-lg text-md mb-4 bg-black hover:bg-neutral-800 active:scale-[0.98] hover:scale-[1.01] gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs h-9 px-4 has-[>svg]:px-3 group relative text-white font-gtpro text-sm lg:text-base pr-4 lg:pr-6 py-2 lg:py-5 cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {status === "not-downloaded" && (
            <>
              <div className="relative inline-flex items-center">
  <Download className="mr-2 h-6 w-6" /> Download Invoice

  {/* Arrow + text */}
  <div className="absolute -right-12 bottom-0 top-7 rotate-12 translate-x-12 translate-y-1">
    <svg
      width="42"
      height="44"
      viewBox="0 0 42 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-2xl"
    >
      <defs>
        <linearGradient
          id="paint0_linear_387_11572"
          x1="4.11532"
          y1="25.1288"
          x2="38.7782"
          y2="20.283"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B5B5B5"></stop>
          <stop offset="1" stopColor="#E9E9E9"></stop>
        </linearGradient>
      </defs>
      <path
        d="M40.5702 42.7513C41.0557 33.5224 41.1956 26.4402 33.4598 20.5117C29.7674 17.6819 25.2881 17.4952 21.5038 20.3856C14.6175 25.6454 26.9939 32.06 29.7881 25.685C34.9106 13.998 20.3823 6.25615 10.9674 6.01441C8.22368 5.94396 5.10156 5.91567 2.39305 6.14789C0.0436934 6.34932 2.72578 5.34058 3.53376 4.92329C5.03063 4.15021 6.16258 3.04317 7.62576 2.28748C10.1861 0.965142 7.88272 2.47967 6.67851 3.01908C3.22422 4.56639 -0.111246 5.10341 3.87975 8.33666C4.6829 8.98732 8.52599 12.6439 8.50813 11.8837C8.45749 9.72835 9.50393 7.17666 9.34156 5.17652C9.11929 2.4386 9.83007 0.815369 8.55167 4.68779C8.13455 5.95132 7.91676 7.16791 7.56483 8.42065C6.98486 10.4851 7.27246 7.62641 7.41878 7.37592C7.84378 6.64833 7.83561 4.81658 7.31837 6.65767C7.18521 7.13166 6.94 9.11247 6.85712 8.51959C6.59542 6.64758 8.09331 3.92676 6.92497 4.78206C5.94315 5.50082 5.88209 6.26328 6.11376 7.42521C6.19261 7.82073 7.53034 9.11241 7.43615 8.43863"
        stroke="url(#paint0_linear_387_11572)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        pathLength="1"
        strokeDashoffset="0px"
        strokeDasharray="1px 1px"
      />
    </svg>
    <p className="font-nanum text-2xl text-gray-500 translate-x-2">
      it’s free
    </p>
  </div>
</div>

            </>
          )}
          {status === "downloading" && (
            <>
              <LoaderIcon className="mr-2 h-6 w-6 animate-spin" /> Downloading...
            </>
          )}
          {status === "downloaded" && (
            <>
              <CheckCircle2 className="mr-2 h-6 w-6" /> Downloaded
            </>
          )}
        </Button>

        {/* Create New button */}
        <Button
          variant="outline"
          onClick={handleCreateNew}
          type="button"
          className="w-25 h-10 rounded-lg text-xs active:scale-[0.98] hover:scale-[1.01]"
        >
          <RotateCcw className="mr-2 h-3 w-3" /> Create New
        </Button>
      </div>
    </div>
  );
};

Font.register({
  family: "Geist",
  fonts: [
    { src: "/font/Geist-Thin.ttf", fontWeight: "thin" },
    { src: "/font/Geist-Ultralight.ttf", fontWeight: "ultralight" },
    { src: "/font/Geist-Light.ttf", fontWeight: "light" },
    { src: "/font/Geist-Regular.ttf", fontWeight: "normal" },
    { src: "/font/Geist-Medium.ttf", fontWeight: "medium" },
    { src: "/font/Geist-SemiBold.ttf", fontWeight: "semibold" },
    { src: "/font/Geist-Bold.ttf", fontWeight: "bold" },
    { src: "/font/Geist-UltraBlack.ttf", fontWeight: "ultrabold" },
  ],
});
