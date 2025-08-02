import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { HeaderTitle, RootLayout } from "@/renderer/components";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/renderer/components/ui/card";
import { InfoCards } from "@/renderer/constants";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  return (
    <RootLayout>
      <div className="w-full flex items-center justify-between pl-16 px-5 pt-6">
        <div className="basis-2/3 ml-20">
          <HeaderTitle title="التدريب و التطوير" back="/dashboard" />
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
      <div className="w-full px-8 flex flex-col mt-5">
        {InfoCards.map((item) => (
          <Card className="bg-[#0b0e14] border-none my-4">
            <div
              onClick={() =>
                router.push(`/trainingDevelopment/courses/${item.key}`)
              }
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </div>
          </Card>
        ))}
      </div>
    </RootLayout>
  );
};

export default Page;
