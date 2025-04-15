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
    name: `Петров Петр`,
    reason:
      "Несоответствие требованиям документации. Заявка может быть отклонена, если она не соответствует установленным заказчиком требованиям к составу, форме или содержанию заявки. Например, если не представлены обязательные документы или предложенные товары или услуги не соответствуют техническим характеристикам, указанным в закупочной документации.",
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-10">
        <div className="text-lg font-bold bg-dark text-white w-fit px-4 py-2 rounded-lg">
          Менеджер
        </div>
        <div className="text-lg font-bold bg-[#E4E2E2] text-black w-full px-4 py-2 rounded-lg">
          {mockData.name}
        </div>
      </div>

      <div className="bg-[#E4E2E2] text-black w-full p-5 rounded-lg">
        {mockData.reason}
      </div>

      <Button
        onClick={() => router.back()}
        className="bg-dark text-white text-lg w-fit px-9"
      >
        Назад
      </Button>
    </div>
  );
};

export default ReportDetailPage;
