import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { API_URLS } from "@/api/urls";
import { tokenService } from "@/services/tokenService";

// Типы для работы с аутентификацией
export interface AuthCredentials {
  username: string;
  password: string;
}

export interface LogoutRequest {
  refresh: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

// Добавим новые интерфейсы
export interface RefreshRequest {
  refresh: string;
}

export interface RefreshResponse {
  access: string; // Новый access token
}

// Добавьте эти интерфейсы для типизации ответа API
export interface ProfileAction {
  name: string;
  icon_url: string;
  style: string | null;
  is_active: boolean;
  tooltip: string;
  link: string;
}

export interface ProfileInfo {
  status: number;
  content: {
    sidebar: {
      user_data: {
        user_full_name: string;
        position: string;
        icon_data: {
          url: string;
          width: number;
          height: number;
        };
      };
      available_operations: Array<{
        name: string;
        icon_url: string;
        style: string | null;
        is_active: boolean;
        tooltip: string;
        link: string;
      }>;
    };
  };
}

// Добавляем интерфейс для контрагентов
export interface Contractor {
  id: number;
  name: string;
  // Добавьте другие поля, которые возвращает API
}

export interface ContractorsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Contractor[];
}

// Типы для формы отчета по актам приема
export interface IconData {
  url: string;
  width: number;
  height: number;
}

export interface FormFieldBase {
  label: string;
  icon_data: IconData;
}

export interface TextFormField extends FormFieldBase {
  value: string | null;
}

export interface UserFormField extends FormFieldBase {
  user_full_name: string;
}

export interface DateRangeFormField extends FormFieldBase {
  from: string | null;
  to: string | null;
}

export interface FormAction {
  type: string;
  label: string;
  icon: IconData;
  options_url?: string;
}

export interface ReceptionActReportForm {
  status: number;
  content: {
    title: string;
    form: {
      created_by: UserFormField;
      date_range: DateRangeFormField;
      act_number: TextFormField;
      contractor: TextFormField;
      status: TextFormField;
    };
    actions: FormAction[];
  };
}

// Настройка customFetchBase для автоматического обновления токена
const customFetchBase = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // Стандартный fetchBaseQuery
  const baseQuery = fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers) => {
      // Получаем токен через сервис, который уже содержит логику обновления
      const token = await tokenService.getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  // Выполняем запрос
  let result = await baseQuery(args, api, extraOptions);

  // Если получаем 401 Unauthorized, возможно токен истек
  if (result.error && result.error.status === 401) {
    // Пробуем обновить токен
    const refreshResult = await tokenService.refreshToken();

    // Если обновление успешно, повторяем запрос
    if (refreshResult) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Если не удалось обновить токен, перенаправляем на страницу входа
      window.location.href = "/signUp";
    }
  }

  return result;
};

// Создаем API с использованием RTK Query
export const api = createApi({
  reducerPath: "api",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: API_URLS.auth.token,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, LogoutRequest>({
      query: (credentials) => ({
        url: API_URLS.auth.logout,
        method: "POST",
        body: credentials,
      }),
    }),
    // Новая мутация для обновления токена
    refreshToken: builder.mutation<RefreshResponse, RefreshRequest>({
      query: (credentials) => ({
        url: API_URLS.auth.refresh,
        method: "POST",
        body: credentials,
      }),
    }),
    // Добавляем новый запрос для получения информации о профиле
    getProfileInfo: builder.query<ProfileInfo, void>({
      query: () => ({
        url: API_URLS.auth.profileInfo,
        method: "GET",
      }),
    }),
    // Получение списка контрагентов
    getContractors: builder.query<ContractorsResponse, void>({
      query: () => ({
        url: API_URLS.core.contractors,
        method: "GET",
      }),
    }),
    // В блоке endpoints добавим новый запрос:
    getReceptionActReportForm: builder.query<ReceptionActReportForm, void>({
      query: () => ({
        url: API_URLS.core.receptionActReportForm,
        method: "GET",
      }),
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useSignInMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileInfoQuery,
  useGetContractorsQuery,
  useGetReceptionActReportFormQuery,
} = api;
