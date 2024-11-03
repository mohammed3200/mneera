import React from "react";
import { useRouter } from 'next/router';
import { CourseCard, HeaderTitle, RootLayout } from "@/renderer/components";
import { InfoCards } from "@/renderer/constants";


const CoursePage = () => {
    const router = useRouter();
    const { id } = router.query; // Get the course ID from the URL
    const title = InfoCards.filter((item) => item.key === id)[0].title

    return (
        <RootLayout>
            <HeaderTitle title={title} back="/trainingDevelopment" />
            <div className="w-full px-4">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
        </RootLayout>
    );
};

export default CoursePage;