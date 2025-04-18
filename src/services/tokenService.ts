class TokenService {
  private accessTokenKey = "accessToken";
  private refreshTokenKey = "refreshToken";
  private tokenExpiryKey = "tokenExpiry";

  // Получение access token с проверкой срока действия
  async getAccessToken(): Promise<string | null> {
    const token = localStorage.getItem(this.accessTokenKey);
    const expiry = localStorage.getItem(this.tokenExpiryKey);

    // Если токен отсутствует или время не установлено, выход
    if (!token || !expiry) return null;

    const expiryTime = parseInt(expiry, 10);
    const currentTime = Date.now();

    // Если токен действителен, возвращаем его
    if (expiryTime > currentTime) {
      return token;
    }

    // Если токен истек, пробуем обновить
    return this.refreshToken();
  }

  // Обновление токена
  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);

    if (!refreshToken) return null;

    try {
      // Выполняем запрос на обновление токена
      const response = await fetch("/api/auth/v1/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const data = await response.json();

      // Сохраняем новый access token
      this.setAccessToken(data.access);

      return data.access;
    } catch (error) {
      console.error("Ошибка при обновлении токена:", error);
      this.clearTokens();
      return null;
    }
  }

  // Установка access token с расчетом времени истечения
  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);

    // Устанавливаем срок действия токена на 25 минут (немного меньше реальных 30 минут)
    const expiryTime = Date.now() + 25 * 60 * 1000;
    localStorage.setItem(this.tokenExpiryKey, expiryTime.toString());
  }

  // Установка refresh token
  setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  // Очистка всех токенов
  clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.tokenExpiryKey);
  }
}

export const tokenService = new TokenService();
