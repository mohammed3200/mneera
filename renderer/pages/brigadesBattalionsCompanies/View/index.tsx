import React from 'react';
import { RootLayout, HeaderTitle, CustomTable } from '@/renderer/components';
import { TableCell } from '@/renderer/components/ui/table'
import { TableRow } from '@/renderer/components/ui/table'
import { MockDataBrigades } from '@/renderer/store/mock'

type Props = {}

const columns: Columns[] = [
    {
        key: "name",
        name: "الاسم"
    },
    {
        key: "place",
        name: "مكانها"
    }
];
const Page = (props: Props) => {
    return (
        <RootLayout>
            <HeaderTitle title='الألوية و الكتائب و السرايا' back='brigadesBattalionsCompanies' />
            <div className='w-full px-4 mt-8'>
                <CustomTable columns={columns} Data={TableCellBrigadesBattalionsCompanies} />
            </div>
        </RootLayout>
    )
}

export default Page;

const TableCellBrigadesBattalionsCompanies = () => {
    return MockDataBrigades.map((item) => (
        <TableRow key={item.id} className="text-zinc-200 text-xs font-SpaceMono text-center">
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.HerPlace}</TableCell>
        </TableRow>
    ))
}   