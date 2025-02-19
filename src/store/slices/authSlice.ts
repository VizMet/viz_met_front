import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, UserCredentials } from "@/types/user";
import { authenticateUser } from "@/mocks/users";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: UserCredentials) => {
    const user = await authenticateUser(credentials);
    if (!user) {
      throw new Error("Неверный логин или пароль");
    }

    // Устанавливаем cookie при успешной авторизации
    document.cookie = "auth=true; path=/";
    // Сохраняем пользователя в localStorage
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Удаляем cookie при выходе
      if (typeof window !== "undefined") {
        document.cookie =
          "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.removeItem("user");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    // Инициализация состояния на клиенте
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          state.user = JSON.parse(savedUser);
          state.isAuthenticated = true;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Произошла ошибка";
      });
  },
});

export const { logout, clearError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
