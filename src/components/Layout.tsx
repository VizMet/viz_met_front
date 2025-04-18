"use client";

import Header from "./Header";
import Menu from "./Menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-dark">
      {pathname !== "/signUp" && <Header />}
      <div className="relative">
        {pathname !== "/signUp" && <Menu />}
        <main
          className={cn(
            "transition-all duration-300 h-screen",
            pathname !== "/signUp" && "bg-white ml-20 sm:ml-[394px] p-12"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
