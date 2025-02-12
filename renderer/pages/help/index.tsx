import React from 'react';
import { useRouter } from 'next/router';
import { RootLayout, HeaderTitle } from '@/renderer/components';
import { Button } from '@/renderer/components/ui/button';

const branch = [
    {
        title: "الوزارات",
        route: "/Ministries"
    },
    {
        title: "الأعيان",
        route: "/Notables"
    },
    {
        title: "البلدية",
        route: "/Municipality"
    },
    {
        title: "المدن",
        route: "/Cities"
    },
    {
        title: "المجتمع المدني",
        route: "/CivilSociety"
    },
    {
        title: "الجيش الشرطة",
        route: "/ArmyPolice"
    }
]

const page = () => {
    const router = useRouter();

    return (
        <RootLayout>
            <HeaderTitle title="التعاون والتواصل" back="/dashboard" />
            <div className="flex flex-col w-full h-[70vh] space-y-4 px-2">
                {
                    branch.reduce((rows, item, index) => {
                        if (index % 3 === 0) rows.push([]); // Start a new row every 3 items
                        rows[rows.length - 1].push(
                            <Button
                                onClick={() => router.push(`/help/${item.route}`)}
                                className="w-full py-4 border border-gray-200 text-gray-300 rounded-lg
                                    bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center
                                    justify-self-center self-center duration-500 transition-all ease-out mx-2 px-2"
                            >
                                <p className="font-din-bold text-lg text-right ">
                                    {item.title}
                                </p>
                            </Button>
                        );
                        return rows; // Return the updated rows array
                    }, []).map((row, rowIndex) => (
                        <div key={rowIndex} className='base-1/2 mt-48  items-center grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-2'>
                            {row}
                        </div>
                    ))
                }
            </div>
        </RootLayout>
    );
};

export default page;
