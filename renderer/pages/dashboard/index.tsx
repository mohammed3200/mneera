// renderer/dashboard/index.tsx

import { Header, RootLayout } from "@/renderer/components"
import { ButtonNavigation } from "@/renderer/components/ButtonNavigation"
import React from "react"
import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/renderer/components/ui/button";

type ButtonDashboardProps = {
  title: string;
  path: string
};

const ButtonDashboard: ButtonDashboardProps[] = [
  {
    title: "التسجيل",
    path: "/registration"
  },
  {
    title: "الأفراد",
    path: "/individuals"
  },
  {
    title: "الألوية و الكتائب و السرايا",
    path: "/brigadesBattalionsCompanies"
  },
  {
    title: "تعاون و التواصل",
    path: "/help"
  },
  {
    title: "الاعلام",
    path: "/media"
  },
  {
    title: "الادارة والتنسيق",
    path: "/managementCoordination"
  },
  {
    title: "التدريب و التطوير",
    path: "/trainingDevelopment"
  },
  {
    title: "الجرحى و الشهداء",
    path: "/woundedMartyrs"
  },
  {
    title: "الدعم و الصيانة",
    path: "/support"
  },
  {
    title: "المعلومات التوثيق",
    path: "/DocumentationInformation"
  }
];

const Dashboard = () => {
  const router = useRouter()
  return (
    <RootLayout>
      <div className="flex flex-col w-full h-full">
        <div className="w-full flex flex-row items-center justify-center py-2">
          <p className="font-din-regular text-gray-300 text-3xl text-right">منظومة المجلس العسكري</p>
        </div>
        <Header />
        <div className="flex flex-row w-full items-center justify-center -mt-4 py-2">
          <p className="text-white text-right text-2xl font-din-regular">الأقسام</p>
        </div>
        <div className="space-y-4">
          {ButtonDashboard.reduce<JSX.Element[][]>((rows, item, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(
              <ButtonNavigation
                key={index.toString()}
                title={item.title}
                handleRouter={() => router.replace(item.path)}
              />
            );
            return rows;
          }, []).map((row, rowIndex) => (
            <div key={rowIndex.toString()} className='grid items-center grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-2'>
              {row}
            </div>
          ))}
        </div>
        <div className="w-full h-fit flex items-center justify-center mt-6">
          <Button
            onClick={() => router.replace('/logoIn')}
            className="w-1/4 flex flex-row gap-2 items-center justify-center border border-red-600 rounded-full bg-transparent text-red-600 py-6 hover:bg-red-700 hover:text-white"
          >
            <p className="font-din-regular  text-lg text-right">تسجيل الخروج</p>
            <CircleArrowLeft size={24} />
          </Button>
        </div>
      </div>
    </RootLayout>
  )
}

export default Dashboard
