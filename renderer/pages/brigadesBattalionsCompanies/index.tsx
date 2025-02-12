import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { RootLayout } from "@/renderer/components";
import { HeaderTitle } from "@/renderer/components";
import { Button } from "@/renderer/components/ui/button";


const Page = () => {
  const router = useRouter();
  return (
    <RootLayout>
      <div className="w-full flex items-center justify-between px-5 ">
        <div className="basis-2/3 ml-16">
          <HeaderTitle title="الألوية و الكتائب و السرايا" back="dashboard" />
        </div>
        <div className="basis-1/3 flex items-start justify-end">
          <Image
            src={"/assets/logo.png"}
            alt="Logo"
            width={80}
            height={80}
            className="h-36 object-cover w-auto"
          />
        </div>
      </div>
      <div className="w-full h-[50vh] flex items-center justify-center gap-5 px-5">
        <Button
          className="w-full py-20 border border-gray-200 text-gray-300 rounded-lg 
        bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center mt-5 
        justify-self-center self-center duration-500 transition-all ease-out"
          onClick={() => router.push("/brigadesBattalionsCompanies")}
        >
          <p className="font-din-bold text-md text-right text-lg">
            عرض الألوية و الكتائب و السرايا
          </p>
        </Button>
        <Button
          onClick={() => router.push("/brigadesBattalionsCompanies/Create")}
          className="w-full py-20 border border-gray-200 text-gray-300 rounded-lg
         bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center mt-5 
         justify-self-center self-center duration-500 transition-all ease-out"
        >
          <p className="font-din-bold text-md text-right text-lg">
            تسجيل كتائب ، ألوية ، سرايا
          </p>
        </Button>
      </div>
    </RootLayout>
  );
};

export default Page;
