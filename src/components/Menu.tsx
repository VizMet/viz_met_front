"use client";

import { useState } from "react";
// import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { sidebarData } from "@/mocks/sideBar";

interface SidebarAction {
  name: string;
  icon_url: string;
  style: string | null;
  is_active: boolean;
  tooltip: string;
  link: string;
}

interface UserInfo {
  name: string;
  position: string;
}

interface SidebarData {
  user_info: UserInfo;
  available_actions: SidebarAction[];
}

interface MenuProps {
  items: {
    id: number;
    title: string;
    icon: string;
    link: string;
  }[];
}

const Menu = ({ items }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const { user_info, available_actions } = sidebarData as SidebarData;

  return (
    <div
      className={cn(
        "fixed left-0 h-full bg-light transition-all duration-300 ease-in-out border-r border-white/10",
        isExpanded ? "w-full sm:w-[394px]" : "w-20"
      )}
    >
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 w-8 h-8 rounded-full bg-light border border-white/10 hover:scale-110 transition-transform"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ChevronLeft
          className={cn(
            "h-5 w-5 text-dark transition-transform duration-300",
            !isExpanded && "rotate-180"
          )}
        />
      </Button> */}

      <div className="flex p-6 gap-5">
        <Image src="/icons/profile.svg" alt="Logo" width={42} height={42} />
        {isExpanded && (
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl text-dark font-bold whitespace-normal break-words">
              {user_info.name}
            </span>
            <span className="text-base sm:text-lg text-dark truncate font-medium">
              {user_info.position}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-2">
        {available_actions.map((action, index) => {
          // Определяем активный элемент по точному совпадению пути
          const isActive = pathname === action.link;

          return (
            <Link key={index} href={action.link} title={action.tooltip}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-dark hover:bg-white/20 transition-colors h-14",
                  !isExpanded && "justify-center px-2",
                  isActive && "bg-white hover:bg-white/90",
                  !action.is_active && "opacity-50 pointer-events-none"
                )}
                disabled={!action.is_active}
              >
                <div className="min-w-[24px] min-h-[24px] flex items-center justify-center">
                  <Image
                    src={action.icon_url}
                    alt={action.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                {isExpanded && (
                  <span className="text-lg sm:text-xl text-dark truncate font-bold">
                    {action.name}
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
