"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверяем наличие cookie при загрузке приложения
    const hasAuthCookie = document.cookie.includes("auth=true");
    if (!hasAuthCookie) {
      dispatch(logout());
    }
    setIsInitialized(true);
  }, [dispatch]);

  if (!isInitialized && pathname !== "/signUp") {
    return null; // или можно вернуть скелетон/лоадер
  }

  return (
    <div className="min-h-screen bg-dark">
      {pathname !== "/signUp" && <Header />}
      <div className="relative">
        {pathname !== "/signUp" && user && <Menu />}
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
