"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ReportDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // В реальном приложении здесь будет запрос к API
  const mockData = {
    id,
    name: `Акт приема №${id}`,
    date: "01.01.2024",
    status: "Выполнен",
    amount: 1000,
    details: "Дополнительная информация по акту...",
  };

  return (
    <div className="p-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        Назад к отчету
      </Button>

      <h2 className="text-2xl font-bold mb-6">
        Детали акта приема #{mockData.id}
      </h2>

      <div className="space-y-4">
        <div>
          <strong>Наименование:</strong> {mockData.name}
        </div>
        <div>
          <strong>Дата:</strong> {mockData.date}
        </div>
        <div>
          <strong>Статус:</strong> {mockData.status}
        </div>
        <div>
          <strong>Сумма:</strong> {mockData.amount}
        </div>
        <div>
          <strong>Дополнительно:</strong> {mockData.details}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
