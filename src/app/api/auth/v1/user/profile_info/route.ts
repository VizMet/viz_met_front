import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Извлекаем заголовок авторизации из входящего запроса
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Требуется авторизация" },
        { status: 401 }
      );
    }

    // Выполняем запрос к внешнему API
    const response = await fetch(
      "http://31.129.57.95/api/auth/v1/user/profile_info/",
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    // Получаем данные от внешнего API
    const data = await response.json();

    // Возвращаем ответ клиенту
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Ошибка при проксировании запроса профиля:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при обработке запроса" },
      { status: 500 }
    );
  }
}
