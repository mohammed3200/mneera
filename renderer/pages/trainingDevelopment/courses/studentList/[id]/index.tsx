import React from 'react'
import { useRouter } from 'next/router';
import { HeaderTitle, RootLayout, CustomTable } from "@/renderer/components";
import { TableCell, TableRow } from '@/renderer/components/ui/table';
import { MockDataCourse } from '@/renderer/store/mock';



const columns: Columns[] = [
    {
        key: 'id',
        label: 'ID'
    },
    {
        key: 'StudentName',
        label: "اسم الطالب"
    }
]

export const StudentList = () => {
    const TableCellCourse = () => {
        const router = useRouter();
        const { id } = router.query; // Get the course ID from the URL
        const StudentName = MockDataCourse.filter((item) => item.id === id)[0].StudentsName
        return (StudentName.map((item, index) => (
                    <TableRow key={item} className="text-zinc-200 text-xs font-SpaceMono text-center">
                        <TableCell>{index}</TableCell>
                        <TableCell>{item}</TableCell>
                    </TableRow>
                )
            ))
    }
    return (
        <RootLayout>
            <HeaderTitle title=" الطالب المسجلين في دورة" back="/trainingDevelopment" />
            <CustomTable columns={columns} Data={TableCellCourse} />
        </RootLayout>
    )

}

