import React from "react";
import { ComponentProps } from "react";
import { Footer } from "./Footer";
import { Toaster } from "react-hot-toast";

export const RootLayout = ({
  children,
  className,
  ...props
}: ComponentProps<"main">) => {
  return (
    <React.Fragment>
      <div className="flex-1 min-h-screen bg-gradient-to-t from-[#202328] to-[#0b0e14] flex flex-col">
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            className: "font-din-bold",
            style: {
              background: "#1e293b",
              color: "#fff",
            },
          },
          error: {
            className: "font-din-bold",
            style: {
              background: "#1e293b",
              color: "#fff",
            },
          },
        }}
      />
    </React.Fragment>
  );
};
