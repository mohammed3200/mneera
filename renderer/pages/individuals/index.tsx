import React, { useEffect, useState } from "react";
import { HeaderTitle, RootLayout, CustomTable } from "@/renderer/components";
import { TableCell, TableRow } from "@/renderer/components/ui/table";
import { Columns } from "@/renderer/types";
import { Individual } from "@/db/schema-types";

const columns: Columns[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "الاسم" },
  { key: "phoneNumber", label: "رقم الهاتف" },
];

export default function Page() {
  const [data, setData] = useState<Individual[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.ipc.invoke("get-individuals");
        setData(response);
      } catch (error) {
        console.error("Failed to fetch individuals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <RootLayout>
        <HeaderTitle title="الأفراد" back="dashboard" />
        <div className="w-full px-4 mt-8">Loading...</div>
      </RootLayout>
    );
  }

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