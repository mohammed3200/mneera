import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/renderer/components/ui/card"

type CourseCardProps = {

}

export const CourseCard = ({ }: CourseCardProps) => {
    return (
        <Card className="bg-[#1a2233] border-none my-4">
            <CardHeader>
                <CardTitle>اسم الدورة</CardTitle>
                <CardDescription>موعد الدورة من 2024-11-07 الي 2024-12-25</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center flex-wrap ">
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                    <p className="font-din-regular text-white text-lg"> اسم طالب<span className="text-blue-400 text-xl px-2">{" ، "}</span></p>
                </div>
            </CardContent>
            <div className="w-full flex flex-row items-center justify-center">
                <div className="w-[97%] h-1 rounded-full bg-transparent border-dashed border-t-[2px] border-white opacity-45 my-2" />
            </div>
            <CardFooter>
                <p className="font-din-regular text-white text-lg">
                    اسم الاستاذ
                </p>
            </CardFooter>
        </Card>
    )
}