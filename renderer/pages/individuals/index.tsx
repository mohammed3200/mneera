import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

import { Individual } from "../../../main/db/schema-types";
import { useIndividualStore } from "../../store/individualStore";

import { Columns } from "@/renderer/types";

import { TextShimmer } from "@/renderer/components/ui/text-shimmer";

import { HeaderTitle, RootLayout, CustomTable } from "@/renderer/components";
import { TableCell, TableRow } from "@/renderer/components/ui/table";


const columns: Columns[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "الاسم" },
  { key: "phoneNumber", label: "رقم الهاتف" },
];

export default function Page() {
  const { individuals, loading, error, fetchIndividuals } =
    useIndividualStore();

  useEffect(() => {
    fetchIndividuals();
  }, []);

  if (loading) {
    return (
      <RootLayout>
        <HeaderTitle title="الأفراد" back="dashboard" />
        <div className="w-full h-[80vh] flex-1 flex justify-center items-center">
          <TextShimmer duration={1.5} className="text-2xl font-din-bold">
            تحميل ...
          </TextShimmer>
        </div>
      </RootLayout>
    );
  }
  if (error)
    return (
      <RootLayout>
        <HeaderTitle title="الأفراد" back="dashboard" />
        <div className="w-full h-[80vh] flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center gap-2">
            <TriangleAlert color="#FB623C" className="w-16 h-16" />
            <p className="text-2xl font-din-bold text-zinc-200">
              خطأ في تحميل البيانات
            </p>
            <p className="text-zinc-400 text-sm text-center">
              Error: {error || "حدث خطأ غير متوقع"}
            </p>
          </div>
        </div>
      </RootLayout>
    );

  return (
    <RootLayout>
      <HeaderTitle title="الأفراد" back="dashboard" />
      <div className="w-full px-4 mt-8">
        <CustomTable
          columns={columns}
          Data={() => TableCellIndividuals(individuals)}
        />
      </div>
    </RootLayout>
  );
}

function TableCellIndividuals(data: Individual[]) {
  const router = useRouter();
  return data.map((item) => (
    <TableRow
      key={item.id}
      className="text-zinc-200 text-xs font-SpaceMono text-center cursor-pointer"
      onClick={() => router.replace(`/individuals/${item.id}`)}
    >
      <TableCell># {item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.phoneNumber}</TableCell>
    </TableRow>
  ));
}
