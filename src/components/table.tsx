import { ReactNode } from "react";

export type Column<Accessor extends string = string> = {
  accessor: Accessor;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => ReactNode;
};

type Row<Accessor extends string = string> = {
  id: string;
  content: Record<Accessor, ReactNode>;
};

type Props<Accessor extends string = string> = {
  columns: Column<Accessor>[];
  rows: Row<Accessor>[];
};

export function Table({ columns, rows }: Props) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => {
            return <th key={column.accessor}>{column.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.id}>
              {columns.map((column) => {
                if (column.format) {
                  return (
                    <td key={column.accessor}>
                      {column.format(row.content[column.accessor])}
                    </td>
                  );
                }
                return (
                  <td key={column.accessor}>{row.content[column.accessor]}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
