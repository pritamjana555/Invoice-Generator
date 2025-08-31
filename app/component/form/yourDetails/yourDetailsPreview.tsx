/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
export const YourDetailsPreview: React.FC<YourDetails> = ({
  yourEmail,
  yourName,
  yourAddress,
  yourCity,
  yourState,
  yourCountry,
  yourLogo,
  yourTaxId,
  yourZip,
}) => (
  <div>
    <p className="text-[11px] text-neutral-400 font-semibold uppercase pb-3.5">
      From
    </p>
    <div className="h-10 mb-3">
      {yourLogo ? (
        <img src={yourLogo} alt="Company Logo" className="h-10 rounded-md" />
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
    {yourName ? (
      <p className="text-2xl font-medium">{yourName}</p>
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
    {yourEmail ? (
      <p className="text-neutral-500/90 text-sm mb-3">{yourEmail}</p>
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
    <div className="text-xs text-neutral-500/80">
      {yourAddress ? (
        <p>{yourAddress}</p>
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
      {yourAddress || yourState || yourZip ? (
        <p className="mb-0.5">
          {yourCity}, {yourState} {yourZip}
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
      {yourCountry ? (
        <p className="mb-1">{yourCountry}</p>
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
      {yourTaxId && <p>Tax ID:{yourTaxId}</p>}
    </div>
  </div>
);
