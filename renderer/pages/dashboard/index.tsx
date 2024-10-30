import { Header } from "@/renderer/components"
import { ButtonNavigation } from "@/renderer/components/ButtonNavigation"
import { Button } from "@/renderer/components/ui/button"
import React from "react"
import { CircleArrowLeft } from "lucide-react";

type DashboardProps = {
  setIsSignIn: (IsSignIn: boolean) => void
}
type ButtonDashboardProps = {
  title: string;
  path: string
}
const ButtonDashboard: ButtonDashboardProps[] = [
  {
    title: "تسجيل",
    path: "/registration"
  },
  {
    title: "الأقسام",
    path: "/sections"
  },
  {
    title: "الكتائب",
    path: "/battalions"
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
    path: "/ManagementAndCoordination"
  },
  {
    title: "فارغ",
    path: ""
  },
  {
    title: "فارغ",
    path: ""
  },
  {
    title: "دعم و صيانة",
    path: "/support"
  }
]

const Dashboard = ({ setIsSignIn }: DashboardProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex flex-row items-center justify-center py-2">
        <p className="font-din-regular text-gray-300 text-3xl text-right">منظومة المجلس العسكري</p>
      </div>
      <Header />
      <div className="space-y-4">
        {ButtonDashboard.reduce((rows, item, index) => {
          if (index % 3 === 0) rows.push([]); // Start a new row every 3 items
          rows[rows.length - 1].push(
            <ButtonNavigation key={index.toString()} title={item.title} path={item.path} />
          );
          return rows;
        }, []).map((row, rowIndex) => (
          <div key={rowIndex.toString()} className='grid items-center grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-2 '>
            {row}
          </div>
        ))}
      </div>
      <div className="w-full h-fit flex items-center justify-center mt-6">
        <Button
          className="w-1/4 flex flex-row gap-2 items-center border border-red-600 rounded-full bg-transparent text-red-600 py-6 hover:bg-red-700 hover:text-white"
          onClick={() => setIsSignIn(false)}
        >
          <p className="font-din-regular  text-lg text-right">تسجيل الخروج</p>
          <CircleArrowLeft size={24} />
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
