import React from "react";
import Image from "next/image";

import { RootLayout, HeaderTitle, SectionsList } from "@/renderer/components";
import { Branch } from "@/renderer/types";

const branch: Branch[] = [
  {
    title: "الاعلام المرئي و المسموع",
    route: "/AudiovisualMedia",
  },
  {
    title: "التواصل الاجتماعي",
    route: "/SocialCommunication",
  },
  {
    title: "الناطق الرسمي",
    route: "/OfficialSpokesperson",
  },
];

const page = () => {
  return (
    <RootLayout>
      <div className="w-full flex items-center justify-between pl-16 px-5 pt-6">
        <div className="basis-2/3 ml-20">
          <HeaderTitle title="الاعلام" back="/dashboard" />
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
      <div className="flex w-full h-[70vh] items-center">
        <SectionsList mainRouter="media" sections={branch} />
      </div>
    </RootLayout>
  );
};

export default page;
