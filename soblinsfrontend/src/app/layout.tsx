import Wallet from "@/providers/wallet";
import "./globals.css";
import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import localFont from "next/font/local";

const cascadiaCode = localFont({ src: "./assets/CascadiaCode.woff2" });
const minecraft = localFont({ src: "./assets/minecraft/Minecraft.ttf" });
const crang = localFont({ src: "./assets/crang/Crang.ttf" });
const pixel = localFont({
  src: [
    {
      path: "./assets/pixel_operator/PixelOperator.ttf",
      weight: "500",
    },
    {
      path: "./assets/pixel_operator/PixelOperator-Bold.ttf",
      weight: "500",
    },
  ],
});
const sarabun = Sarabun({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Hut Havoc",
  description:
    "Raid huts using the Solana blockchain for a chance to double, triple, quadruple (and onwards) in an interactive map with various stakes tied to each and every unique hut.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pixel.className}>
        <Wallet>{children}</Wallet>
      </body>
    </html>
  );
}
