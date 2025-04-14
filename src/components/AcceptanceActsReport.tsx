"use client";

import { formsData } from "@/mocks/forms";
import FormBuilder from "@/components/FormBuilder";
import PageHeader from "@/components/PageHeader";
import Page from "@/components/Page";

const AcceptanceActsReport = () => {
  const handleSubmit = (filters: Record<string, string>) => {
    console.log("Submitted filters:", filters);
  };

  return (
    <Page>
      <PageHeader />
      <div className="p-6">
        <FormBuilder formData={formsData.forms[0]} onSubmit={handleSubmit} />
      </div>
    </Page>
  );
};

export default AcceptanceActsReport;
