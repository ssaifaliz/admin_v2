import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import "../utils/fontawesome";

const sarabun_init = Sarabun({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sarabun",
});

export const metadata: Metadata | any = {
  title: "Vitto Technoligies",
  description: "Powered by Vitto Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
      </head>
      <body
        className={`${sarabun_init?.variable} font-sarabun flex flex-1 bg-[black] max-h-[100vh] min-h-[100vh] max-w-full justify-center overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
