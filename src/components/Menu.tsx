"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface MenuItem {
  id: number;
  title: string;
  icon: string;
  link: string;
}

interface MenuProps {
  items: MenuItem[];
}

const Menu = ({ items }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setMenuItems(items);
  }, [items]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

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
        onClick={toggleMenu}
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
              {user?.fullName || ""}
            </span>
            <span className="text-base sm:text-lg text-dark truncate font-medium">
              {user?.role.label || ""}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link key={item.id} href={item.link}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-dark hover:bg-white/20 transition-colors h-14",
                  !isExpanded && "justify-center px-2",
                  isActive && "bg-white hover:bg-white/90"
                )}
              >
                <div className="min-w-[24px] min-h-[24px] flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                {isExpanded && (
                  <span className="text-lg sm:text-xl text-dark truncate font-bold">
                    {item.title}
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
