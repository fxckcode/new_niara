"use client"

import { Toaster } from "sonner";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster />
      {children}
    </div>
  );
}
