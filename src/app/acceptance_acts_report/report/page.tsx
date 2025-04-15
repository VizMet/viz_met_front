"use client";

import { useRouter } from "next/navigation";
import ReportTable from "@/components/ReportTable";
import { columns, mockData, ReportRow } from "@/mocks/reportTable";

const ReportPage = () => {
  const router = useRouter();

  const handleRowClick = (row: ReportRow) => {
    router.push(`/acceptance_acts_report/report/${row.id}`);
  };

  return (
    <div className="">
      <ReportTable
        columns={columns}
        data={mockData}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default ReportPage;
