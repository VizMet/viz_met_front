"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { initializeAuth } from "@/store/slices/authSlice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Инициализируем состояние auth только на клиенте
    store.dispatch(initializeAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
