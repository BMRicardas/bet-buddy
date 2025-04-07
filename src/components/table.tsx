import { ReactNode } from "react";
import {
  Table as SCNTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Align = "left" | "right" | "center";

type Props<Accessor extends string = string> = {
  columns: {
    accessor: Accessor;
    label: string;
    align?: Align;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    format?: (value: any) => ReactNode;
  }[];
  rows: {
    id: string;
    content: Record<Accessor, ReactNode>;
  }[];
};

export function Table({ columns, rows }: Props) {
  return (
    <SCNTable>
      <TableHeader>
        <TableRow>
          {columns.map((column) => {
            return (
              <TableHead key={column.accessor} align={column.align}>
                {column.label}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => {
          return (
            <TableRow key={row.id}>
              {columns.map((column) => {
                if (column.format) {
                  return (
                    <TableCell key={column.accessor}>
                      {column.format(row.content[column.accessor])}
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={column.accessor}>
                    {row.content[column.accessor]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </SCNTable>
  );
}
