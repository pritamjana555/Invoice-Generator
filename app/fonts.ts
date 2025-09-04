// app/fonts.ts
import { Nanum_Pen_Script } from "next/font/google";

export const nanumPenScript = Nanum_Pen_Script({
  weight: "400", // only available weight
  subsets: ["latin"],
  variable: "--font-nanum-pen",
});
