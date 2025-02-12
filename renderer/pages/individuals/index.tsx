import { HeaderTitle, RootLayout, CustomTable } from '@/renderer/components'
import { TableCell } from '@/renderer/components/ui/table';
import { TableRow } from '@/renderer/components/ui/table';
import { MockDataIndividuals } from '@/renderer/store/mock';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {}

const columns: Columns[] = [
    {
        key: "id",
        name: "رقم المجلس"
    },
    {
        key: "name",
        name: "الاسم"
    },
    {
        key: "PhoneNumber",
        name: "رقم الهاتف"
    }
];

const Page = (props: Props) => {
    return (
        <RootLayout>
            <HeaderTitle title='الأفراد' back='dashboard' />
            <div className='w-full px-4 mt-8'>
                <CustomTable columns={columns} Data={TableCellIndividuals} />
            </div>
        </RootLayout>
    )
}

export default Page

const TableCellIndividuals = () => {
    const router = useRouter()
    return MockDataIndividuals.map((item) => (
        // Fix: Wrap TableCell components in a single TableRow
        <TableRow key={item.id} className="text-zinc-200 text-xs font-SpaceMono text-center cursor-pointer" onClick={() => router.push(`/individuals/${item.id}`)}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.PhoneNumber}</TableCell>
        </TableRow>
    ))
}   