"use client";
import { View } from "@react-pdf/renderer";
import { YourDetailsPDF } from "./yourDetails/yourDetailsPdf";
import { InvoiceTermsPdf } from "./invoiceTerms/InvoiceTermsPdf";
import { CompanyDetailsPdf } from "./companyDetails/companyDetailsPdf";
import { InvoiceDetailsPdf } from "./invoiceDetails/invoiceDetailsPdf";
import { PaymentDetailsPdf } from "./paymentDetails/paymentDetailsPdf";
import { pdfUtils } from "@/lib/pdfStyles";
import { useCallback } from "react";

// ✅ Utility function: check if an object has at least one valid (non-empty) value
function hasValidContent(obj: Record<string, any>): boolean {
  if (!obj || typeof obj !== "object") return false;

  return Object.values(obj).some((val) => {
    if (val === null || val === undefined) return false;
    if (typeof val === "string" && val.trim() === "") return false;
    return true; // found a valid field
  });
}

export const PdfDetails = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  countryImageUrl,
  onGeneratePdf, // callback to trigger PDF generation
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  countryImageUrl: string;
  onGeneratePdf: () => void;
}) => {
  // ✅ Validate before download
  const handleVerifyAndDownload = useCallback(() => {
    if (
      !hasValidContent(yourDetails) ||
      !hasValidContent(companyDetails) ||
      !hasValidContent(invoiceDetails) ||
      !hasValidContent(paymentDetails) ||
      !hasValidContent(invoiceTerms) ||
      !countryImageUrl ||
      countryImageUrl.trim() === ""
    ) {
      alert("⚠️ Please fill in all required sections before downloading the PDF.");
      return;
    }

    // 🚀 If all good, trigger PDF generation
    onGeneratePdf();
  }, [
    yourDetails,
    companyDetails,
    invoiceDetails,
    paymentDetails,
    invoiceTerms,
    countryImageUrl,
    onGeneratePdf,
  ]);

  return (
    <>
      {/* PDF Layout */}
      <View>
        <InvoiceTermsPdf {...invoiceTerms} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            ...pdfUtils.borderTop,
            ...pdfUtils.borderBottom,
          }}
        >
          <YourDetailsPDF {...yourDetails} />
          <CompanyDetailsPdf {...companyDetails} />
        </View>
        <View>
          <View style={pdfUtils.borderBottom}>
            <InvoiceDetailsPdf {...invoiceDetails} />
          </View>
          <View>
            <PaymentDetailsPdf
              {...paymentDetails}
              countryImageUrl={countryImageUrl}
            />
          </View>
        </View>
      </View>

      {/* Verify & Download Button */}
      <button
        onClick={handleVerifyAndDownload}
        className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        disabled={
          !(
            hasValidContent(yourDetails) &&
            hasValidContent(companyDetails) &&
            hasValidContent(invoiceDetails) &&
            hasValidContent(paymentDetails) &&
            hasValidContent(invoiceTerms) &&
            countryImageUrl?.trim() !== ""
          )
        }
      >
        Verify & Download
      </button>
    </>
  );
};
