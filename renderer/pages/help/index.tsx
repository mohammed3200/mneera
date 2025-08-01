import React from "react";
import { RootLayout, HeaderTitle, SectionsList } from "@/renderer/components";
import { Branch } from "@/renderer/types";
import Image from "next/image";

const branch: Branch[] = [
  {
    title: "الوزارات",
    route: "/Ministries",
  },
  {
    title: "الأعيان",
    route: "/Notables",
  },
  {
    title: "البلدية",
    route: "/Municipality",
  },
  {
    title: "المدن",
    route: "/Cities",
  },
  {
    title: "المجتمع المدني",
    route: "/CivilSociety",
  },
  {
    title: "الجيش الشرطة",
    route: "/ArmyPolice",
  },
];

const page = () => {
  return (
    <RootLayout>
        <div className="w-full flex items-center justify-between pl-16 px-5 pt-6">
        <div className="basis-2/3 ml-20">
        <HeaderTitle title="التعاون والتواصل" back="/dashboard" />
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
      <div className="w-full h-[70vh] flex-1 flex justify-center items-center">
        <SectionsList mainRouter="help" sections={branch} />
      </div>
    </RootLayout>
  );
};

export default page;
