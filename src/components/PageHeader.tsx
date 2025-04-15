"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { TitleLinks, specialHeaderStyles } from "@/mocks/titles";

interface PageHeaderProps {
  buttonText?: string;
  onButtonClick?: () => void;
}

const PageHeader = ({ buttonText, onButtonClick }: PageHeaderProps) => {
  const hasButton = buttonText || onButtonClick;
  const pathname = usePathname();

  // Специальная обработка для страницы причины отклонения
  const isReasonPage = pathname.includes(
    "acceptance_acts_report/report/reason"
  );

  let titleKey = "";
  let title = "";

  if (isReasonPage) {
    titleKey = "acceptance_acts_report_reason";
    title = TitleLinks.acceptance_acts_report_reason;
  } else {
    // Стандартная логика поиска заголовка
    const foundTitle = Object.entries(TitleLinks).find(([key]) =>
      pathname.replace(/^\//, "").includes(key)
    );

    if (foundTitle) {
      [titleKey, title] = foundTitle;
    }
  }

  // Получаем специальные стили для заголовка, если они есть
  const headerStyle = specialHeaderStyles[titleKey] || "bg-dark text-white";

  return (
    <div className="w-full h-10 flex items-center justify-between gap-4 mb-10">
      <div
        className={`w-full h-full ${headerStyle} flex items-center justify-between px-6 rounded-lg`}
      >
        <h1 className="text-xl font-medium uppercase">{title}</h1>
      </div>
      {hasButton && (
        <Button
          onClick={onButtonClick}
          className="bg-light hover:bg-light/90 text-dark font-medium px-4 h-full"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
