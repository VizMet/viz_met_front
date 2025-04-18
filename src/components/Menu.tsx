"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useGetProfileInfoQuery } from "@/api/api";
import { sidebarData } from "@/mocks/sideBar";

const Menu = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  // Загружаем данные профиля из API
  const { data: profileData, isLoading, error } = useGetProfileInfoQuery();

  // Если данные загружаются, показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className="fixed left-0 h-full bg-light w-full sm:w-[394px] flex items-center justify-center">
        <div className="text-dark">Загрузка...</div>
      </div>
    );
  }

  // Если произошла ошибка, показываем сообщение
  if (error || !profileData || !profileData.content?.sidebar) {
    return (
      <div className="fixed left-0 h-full bg-light w-full sm:w-[394px] flex items-center justify-center">
        <div className="text-red-500">Ошибка загрузки данных</div>
      </div>
    );
  }

  const { user_data, available_operations = [] } = profileData.content.sidebar;

  return (
    <div
      className={cn(
        "fixed left-0 h-full bg-light transition-all duration-300 ease-in-out border-r border-white/10",
        isExpanded ? "w-full sm:w-[394px]" : "w-20"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 w-8 h-8 rounded-full bg-light border border-white/10 hover:scale-110 transition-transform"
        onClick={() => setIsExpanded(!isExpanded)}
        disabled={true}
      >
        <ChevronLeft
          className={cn(
            "h-5 w-5 text-dark transition-transform duration-300",
            !isExpanded && "rotate-180"
          )}
        />
      </Button>

      <div className="flex p-6 gap-5">
        <Image
          src={"/icons/profile.svg"}
          alt="Profile"
          width={user_data.icon_data?.width || 42}
          height={user_data.icon_data?.height || 42}
        />
        {isExpanded && (
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl text-dark font-bold whitespace-normal break-words">
              {user_data.user_full_name}
            </span>
            <span className="text-base sm:text-lg text-dark truncate font-medium">
              {user_data.position}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-2">
        {sidebarData.available_actions.map((operation, index) => {
          // Определяем активный элемент по совпадению пути
          const isActive = pathname.includes(operation.link);

          return (
            <Link key={index} href={operation.link} title={operation.tooltip}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-dark hover:bg-white/20 transition-colors h-14",
                  !isExpanded && "justify-center px-2",
                  isActive && "bg-white hover:bg-white/90",
                  !operation.is_active && "opacity-50 pointer-events-none"
                )}
                disabled={!operation.is_active}
              >
                <div className="min-w-[24px] min-h-[24px] flex items-center justify-center">
                  <Image
                    src={operation.icon_url}
                    alt={operation.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                {isExpanded && (
                  <span className="text-lg sm:text-xl text-dark truncate font-bold">
                    {operation.name}
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
