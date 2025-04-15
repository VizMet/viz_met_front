"use client";

import { useRouter } from "next/navigation";
import { formsData } from "@/mocks/forms";
import ReportFormBuilder from "@/components/ReportFormBuilder";

const AcceptanceActsReport = () => {
  const router = useRouter();

  const handleSubmit = (filters: Record<string, string>) => {
    console.log("Submitted filters:", filters);
    // После успешной отправки формы перенаправляем на страницу отчета
    router.push("/acceptance_acts_report/report");
  };

  return (
    <ReportFormBuilder formData={formsData.forms[0]} onSubmit={handleSubmit} />
  );
};

export default AcceptanceActsReport;
