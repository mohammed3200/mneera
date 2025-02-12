import React from "react";
import { redirect } from "next/navigation";
import { useRouter } from 'next/router';
import { HeaderTitle, RootLayout, CustomTable } from "@/renderer/components";
import { InfoCards } from "@/renderer/constants";
import { TableCell, TableRow } from "@/renderer/components/ui/table";
import { MockDataCourse } from "@/renderer/store/mock";

const columns: Columns[] = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'Name Course',
        name: 'اسم الدورة'
    },
    {
        key: 'Date Start',
        name: "تاريخ البدء"
    },
    {
        key: 'Date End',
        name: "تاريخ الانتهاء"
    },
    {
        key: 'TeacherName',
        name: "اسم الأستاذ"
    }
]

const CoursePage = () => {
    const router = useRouter();
    const { id } = router.query; // Get the course ID from the URL
    const title = InfoCards.filter((item) => item.key === id)[0].title

    return (
        <RootLayout>
            <HeaderTitle title={title} back="/trainingDevelopment" />
            <div className="w-full px-4">
                <div className='w-full px-4 mt-8'>
                    <CustomTable columns={columns} />
                </div>
            </div>
        </RootLayout>
    );
};

export default CoursePage;

const TableCellCourse = () => {
    const router = useRouter();
    return MockDataCourse.map((item) => (
        <TableRow
            key={item.id}
            className="text-zinc-200 text-xs font-SpaceMono text-center"
            onClick={redirect(`trainingDevelopment/courses/studentList/${item.id}`)
            }>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.NameCourse}</TableCell>
            <TableCell>{item.StartDate}</TableCell>
            <TableCell>{item.EndDate}</TableCell>
            <TableCell>{item.TeacherName}</TableCell>
        </TableRow>
    ));
}