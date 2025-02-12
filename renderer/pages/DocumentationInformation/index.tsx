import React from 'react';
import { useRouter } from 'next/router';
import { RootLayout, HeaderTitle } from '@/renderer/components';
import { Button } from '@/renderer/components/ui/button';

const branch = [
    {
        title: "تحرير",
        route: "/release"
    },
]

const page = () => {
    const router = useRouter();

    return (
        <RootLayout>
            <HeaderTitle title="المعلومات التوثيق" back="/dashboard" />
            <div className="flex px-5 items-center justify-center  h-[50vh]">
                {
                    branch.map((item) => (
                        <Button
                            onClick={() => router.push(`/DocumentationInformation/${item.route}`)}
                            className="w-60 h-20 py-4 border border-gray-200 text-gray-300 rounded-lg
         bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center mt-5
         justify-self-center self-center duration-500 transition-all ease-out"
         disabled
                        >
                            <p className="font-din-bold text-lg text-right ">
                                {item.title}
                            </p>
                        </Button>
                    ))
                }
            </div>
        </RootLayout>
    );
};

export default page;
