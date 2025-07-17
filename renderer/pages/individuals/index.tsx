import React from "react";

import { HeaderTitle, RootLayout, CustomTable } from "@/renderer/components";
import { TableCell, TableRow } from "@/renderer/components/ui/table";

import { Columns } from "@/renderer/types";
import { Individual } from "@/db/schema-types";
import { individuals } from "@/db/schema";
import { db } from "@/db";

const columns: Columns[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "الاسم",
  },
  {
    key: "PhoneNumber",
    label: "رقم الهاتف",
  },
];

export async function getServerSideProps() {
  const data = await db.select().from(individuals);

  const serializableData = data.map((item) => ({
    ...item,
    createdAt: "2025-01-01T00:00:00Z",
  }));

  return {
    props: {
      data: serializableData,
    },
  };
}

export default function Page({ data }: { data: Individual[] }) {
  return (
    <RootLayout>
      <HeaderTitle title="الأفراد" back="dashboard" />
      <div className="w-full px-4 mt-8">
        <CustomTable
          columns={columns}
          Data={() => TableCellIndividuals(data)}
        />
      </div>
    </RootLayout>
  );
}

function TableCellIndividuals(data: Individual[]) {
  return data.map((item) => (
    <TableRow
      key={item.id}
      className="text-zinc-200 text-xs font-SpaceMono text-center cursor-pointer"
    >
      <TableCell>
        <a href={`/individuals/${item.id}`}># {item.id}</a>
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.phoneNumber}</TableCell>
    </TableRow>
  ));
}
