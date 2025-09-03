/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
export const CompanyDetailsPreview: React.FC<CompanyDetails> = ({
  email,
  companyName,
  companyAddress,
  companyCity,
  companyState,
  companyCountry,
  companyLogo,
  companyTaxId,
  companyZip,
}) => (
  <div>
    <p className="text-[11px] text-neutral-400 font-semibold uppercase pb-3.5">
      To
    </p>
    <div className="h-10 mb-3">
      {companyLogo ? (
        <img src={companyLogo} alt="Company Logo" className="h-10 rounded-md" />
      ) : (
        <div className="relative h-10 w-10 rounded-full bg-background overflow-hidden flex items-center justify-center">
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
    {companyName ? (
      <p className="text-xl max-[760px]:text-lg font-medium">{companyName}</p>
    ) : (
      <div className="relative h-5 w-5/6 mb-4 rounded-md bg-background overflow-hidden flex items-center justify-center">
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
    {email ? (
      <p className="text-neutral-500/90 text-xs max-[760px]:break-words mb-3">{email}</p>
    ) : (
      <div className="relative h-4 w-4/6 my-4 rounded-md bg-background overflow-hidden flex items-center justify-center">
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
    <div className="text-[70%] text-neutral-500/80">
      {companyAddress ? (
        <p>{companyAddress}</p>
      ) : (
        <div className="relative h-4 w-3/6 my-2 rounded-md bg-background overflow-hidden flex items-center justify-center">
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
      {companyAddress || companyState || companyZip ? (
        <p className="mb-0.5">
          {companyCity}, {companyState} {companyZip}
        </p>
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
      {companyCountry ? (
        <p className="mb-1">{companyCountry}</p>
      ) : (
        <div className="relative h-4 w-3/6 my-2 rounded-md bg-background overflow-hidden flex items-center justify-center">
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
      {companyTaxId && <p>Tax ID:{companyTaxId}</p>}
    </div>
  </div>
);
