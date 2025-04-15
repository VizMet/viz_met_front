"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { TitleLinks } from "@/mocks/titles";

interface PageHeaderProps {
  buttonText?: string;
  onButtonClick?: () => void;
}

const PageHeader = ({ buttonText, onButtonClick }: PageHeaderProps) => {
  const hasButton = buttonText || onButtonClick;
  const pathname = usePathname();
  const title = Object.entries(TitleLinks).find(([key]) =>
    pathname.replace(/^\//, "").includes(key)
  )?.[1];

  return (
    <div className="w-full h-10 flex items-center justify-between gap-4 mb-10">
      <div className="w-full h-full bg-dark flex items-center justify-between px-6 rounded-lg">
        <h1 className="text-white text-xl font-medium uppercase">{title}</h1>
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
