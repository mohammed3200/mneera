import PropTypes from "prop-types";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface CustomTableProps {
  columns: Column[];
  Data?: React.FC;
}

interface Column {
  key: string;
  label: string;
}

export const CustomTable: React.FC<CustomTableProps> = ({ columns, Data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns?.map((column) => (
            <TableHead
              key={column.key}
              className="text-zinc-50 text-sm text-center font-din-bold font-bold"
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {Data && <TableBody>{<Data />}</TableBody>}
    </Table>
  );
};
CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
