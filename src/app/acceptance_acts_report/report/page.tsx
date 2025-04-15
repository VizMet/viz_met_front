"use client";

import { useRouter } from "next/navigation";
import ReportTable from "@/components/ReportTable";
import { columns, mockData, ReportRow } from "@/mocks/reportTable";
import { PaginationCustom } from "@/components/Pagination";

const ReportPage = () => {
  const router = useRouter();

  const handleRowClick = (row: ReportRow) => {
    router.push(`/acceptance_acts_report/report/reason/${row.id}`);
  };

  return (
    <div className="pb-16 flex flex-col gap-10">
      <ReportTable
        columns={columns}
        data={mockData}
        onRowClick={handleRowClick}
      />
      <PaginationCustom
        totalCount={100}
        pageSize={10}
        currentPage={1}
        onPageChange={(page: number) =>
          console.log(`Переход на страницу ${page}`)
        }
      />
    </div>
  );
};

export default ReportPage;
