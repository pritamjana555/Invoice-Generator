import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import { ScrollProvider } from "./context/ScrollContext";
import localFont from "next/font/local";
import { nanumPenScript } from "./fonts";
export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};
const gtpro = localFont({
  src: [
    {
      path: "../public/font/GTWalsheimPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gtpro",
});

const gtAlpina = localFont({
  src: [
    {
      path: "../public/font/GT-Alpina-Condensed-Light-Trial.woff",
      weight: "400, 500, 600,700",
      style: "normal",
    },
  ],
  variable: "--font-gtAlpina",
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "Free Invoice Generator: Create & Send Professional Invoices in Minutes",
  description:
    "Get paid on time with our free invoice maker. Create professional invoices & get them to clients instantly.",
  keywords: [
    "invoice generator",
    "free invoice template",
    "invoice maker",
    "online invoice",
    "create invoice",
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Free Invoice Generator: Create & Send Professional Invoices in Minutes",
    description:
      "Get paid on time with our free invoice maker. Create professional invoices & get them to clients instantly.",
    url: process.env.NEXT_PUBLIC_URL,
    type: "website",
    images: "/og-image.jpeg",
    siteName: "Invoice Generator",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ThatsPranav",
    creator: "@ThatsPranav",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gtpro.variable} ${gtAlpina.variable} ${nanumPenScript.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon"
        />
        
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={`${GeistSans.className}`}><ScrollProvider>{children}</ScrollProvider></body>
    </html>
  );
}
