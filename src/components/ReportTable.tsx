"use client";

import { Column, ReportRow } from "@/mocks/reportTable";
import { ScrollArea } from "@/components/ui/scroll-area";

const statusColors: Record<string, string> = {
  Принят: "bg-[#C8FFDA] text-[#119C2B] font-bold rounded-lg",
  "Не принят": "bg-[#FFF6B6] text-[#BE9800] font-bold rounded-lg",
  Отклонен: "bg-[#FFC9CA] text-[#9C1111] font-bold rounded-lg",
};

export interface ReportTableProps {
  columns: Column[];
  data: ReportRow[];
  onRowClick?: (item: ReportRow) => void;
}

const ReportTable = ({ columns, data, onRowClick }: ReportTableProps) => {
  const renderCell = (column: Column, row: ReportRow) => {
    if (column.key === "status") {
      return (
        <span className={`px-3 py-2 ${statusColors[row.status] || ""}`}>
          {row[column.key]}
        </span>
      );
    }
    return row[column.key];
  };

  return (
    <ScrollArea className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-dark text-white">
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={`${
                  index === 0
                    ? "rounded-l-lg"
                    : index === columns.length - 1
                    ? "rounded-r-lg"
                    : ""
                } p-3 text-${column.align || "left"}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
          <tr className="h-8"></tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => {
                if (row.status === "Отклонен") {
                  onRowClick?.(row);
                }
              }}
              className={`border-b hover:bg-[#E4E2E2] ${
                row.status === "Отклонен" && "cursor-pointer"
              }`}
            >
              {columns.map((column, index) => (
                <td
                  key={column.key}
                  className={`${
                    index === 0
                      ? "rounded-l-lg"
                      : index === columns.length - 1
                      ? "rounded-r-lg"
                      : ""
                  } p-3 text-${column.align || "left"}`}
                >
                  {renderCell(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default ReportTable;
