"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div>{children}</div>
      <ToastContainer />
    </NextUIProvider>
  );
}
