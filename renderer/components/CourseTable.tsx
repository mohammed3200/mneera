import React from 'react'
import CustomTable from './CustomTable'
import { TableRow } from './ui/table'
import { TableCell } from './ui/table'
import { MockDataCourse } from '../store/mock'

interface Props {

}

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
        key: 'Students Name',
        name: 'اسم الطلبة المسجلين'
    },
    {
        key: 'TeacherName',
        name: "اسم الأستاذ"
    }
]

export const CourseTable = (props: Props) => {
    return (
        <div className='w-full px-4 mt-8'>
            <CustomTable columns={columns} Data={TableCellCourse} />
        </div>
    )
}

const TableCellCourse = () => {
    return MockDataCourse.map((item) => (
        // Fix: Wrap TableCell components in a single TableRow
        <TableRow key={item.id} className="text-zinc-200 text-xs font-SpaceMono text-center">
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.NameCourse}</TableCell>
            <TableCell>{item.StartDate}</TableCell>
            <TableCell>{item.EndDate}</TableCell>
            <TableCell>{item.StudentsName.join(', ')}</TableCell>
            <TableCell>{item.TeacherName}</TableCell>
        </TableRow>
    ))
}
