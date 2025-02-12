import Link from "next/link";
import React from "react";
import { useRouter } from 'next/navigation'
import { HeaderTitle, RootLayout } from "@/renderer/components";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/renderer/components/ui/card"
import { InfoCards } from "@/renderer/constants";


type Props = {}

const Page = (props: Props) => {
    const router = useRouter()
    return (
        <RootLayout>
            <HeaderTitle title="التدريب و التطوير" back="/dashboard" />
            <div className="w-full px-8 flex flex-col mt-5">
                {InfoCards.map((item) => (
                    <Card className="bg-[#0b0e14] border-none my-4">
                        <div
                            onClick={() => router.push(`/trainingDevelopment/courses/${item.key}`)}
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