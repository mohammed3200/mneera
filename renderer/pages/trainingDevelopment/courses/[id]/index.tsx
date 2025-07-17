import React from "react";
import { useRouter } from "next/router";
import { HeaderTitle, RootLayout, CustomTable } from "@/renderer/components";
import { InfoCards } from "@/renderer/constants";
import { TableCell, TableRow } from "@/renderer/components/ui/table";
import { MockDataCourse } from "@/renderer/store/mock";
import { Columns } from "@/renderer/types";
import Link from "next/link";
import { redirect } from "next/navigation";

const columns: Columns[] = [
  { key: "id", label: "ID" },
  { key: "Name Course", label: "اسم الدورة" },
  { key: "Date Start", label: "تاريخ البدء" },
  { key: "Date End", label: "تاريخ الانتهاء" },
  { key: "TeacherName", label: "اسم الأستاذ" },
];

type Props = {
  title: string;
  courses: typeof MockDataCourse;
};

export default function CoursePage({ title, courses }: Props) {
  return (
    <RootLayout>
      <HeaderTitle title={title} back="/trainingDevelopment" />
      <div className="w-full px-4">
        <div className="w-full px-4 mt-8">
          <CustomTable columns={columns} />
        </div>
      </div>
    </RootLayout>
  );
}

export async function getStaticPaths() {
  const paths = InfoCards.map((card) => ({
    params: { id: card.key.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const id = params.id;

  const card = InfoCards.find((item) => item.key === id);

  if (!card) {
    return { notFound: true };
  }

  return {
    props: {
      title: card.title,
      courses: MockDataCourse,
    },
  };
}

const TableCellCourse = () => {
  const router = useRouter();
  return MockDataCourse.map((item) => (
    <TableRow
      key={item.id}
      className="text-zinc-200 text-xs font-SpaceMono text-center"
      onClick={() =>
        redirect(`trainingDevelopment/courses/studentList/${item.id}`)
      }
    >
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.NameCourse}</TableCell>
      <TableCell>{item.StartDate}</TableCell>
      <TableCell>{item.EndDate}</TableCell>
      <TableCell>{item.TeacherName}</TableCell>
    </TableRow>
  ));
};
