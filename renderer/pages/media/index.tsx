import React from 'react';
import { useRouter } from 'next/router';
import { RootLayout, HeaderTitle } from '@/renderer/components';
import { Button } from '@/renderer/components/ui/button';

const branch = [
    {
        title: "الاعلام المرئي و المسموع",
        route: "/AudiovisualMedia"
    },
    {
        title: "التواصل الاجتماعي",
        route: "/SocialCommunication"
    },
    {
        title: "الناطق الرسمي",
        route: "/OfficialSpokesperson"
    }
]

const page = () => {
    const router = useRouter();

    return (
        <RootLayout>
            <HeaderTitle title="الاعلام" back="/dashboard" />
            <div className="flex justify-evenly px-4 items-center gap-6 h-[50vh]">
                {
                    branch.map((item) => (
                        <Button
                            onClick={() => router.push(`/media/${item.route}`)}
                            className="w-full py-8 border border-gray-200 text-gray-300 rounded-lg
         bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center mt-5
         justify-self-center self-center duration-500 transition-all ease-out"
                        >
                            <p className="font-din-bold text-2xl text-right ">
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
