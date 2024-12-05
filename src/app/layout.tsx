import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/modules/core/components/ui/toaster";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Elifai",
  description: "Intuitive and easy financial control",
};

export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.className} antialiased bg-black text-foreground`}
      >
        <div>{auth}</div>
        <div>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
