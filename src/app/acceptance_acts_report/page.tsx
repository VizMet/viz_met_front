"use client";

import { useRouter } from "next/navigation";
import ReportFormBuilder from "@/components/ReportFormBuilder";
import { useGetReceptionActReportFormQuery } from "@/api/api";
import { useEffect, useState } from "react";

const AcceptanceActsReport = () => {
  const router = useRouter();
  const {
    data: formData,
    isLoading,
    error,
  } = useGetReceptionActReportFormQuery();
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Добавим отладочный код - прямой запрос для проверки
  useEffect(() => {
    const debugFetch = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("Отсутствует токен доступа");
          return;
        }

        console.log("Выполняется прямой запрос к API...");
        const response = await fetch(
          "/api/core/v1/reception_act/report_form/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Статус ответа:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Текст ошибки:", errorText);
          setFetchError(`Ошибка ${response.status}: ${errorText}`);
        } else {
          const data = await response.json();
          console.log("Данные получены:", data);
        }
      } catch (err) {
        console.error("Ошибка при отладочном запросе:", err);
        setFetchError(
          `Ошибка запроса: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    };

    if (error) {
      debugFetch();
    }
  }, [error]);

  const handleSubmit = (filters: Record<string, string>) => {
    console.log("Submitted filters:", filters);
    router.push("/acceptance_acts_report/report");
  };

  if (isLoading) {
    return <div className="p-6">Загрузка формы...</div>;
  }

  if (error || !formData) {
    return (
      <div className="p-6">
        <div className="text-red-500">Ошибка при загрузке формы</div>
        {fetchError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="font-bold">Детали ошибки:</p>
            <p className="text-sm">{fetchError}</p>
          </div>
        )}
      </div>
    );
  }

  const handleReturn = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{formData.content.title}</h1>

      <ReportFormBuilder
        formData={formData.content}
        onSubmit={handleSubmit}
        onReturn={handleReturn}
      />
    </div>
  );
};

export default AcceptanceActsReport;
