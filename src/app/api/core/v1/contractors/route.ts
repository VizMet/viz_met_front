import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("Запрос к contractors получен");

    // Извлекаем заголовок авторизации из входящего запроса
    const authHeader = request.headers.get("Authorization");

    console.log(
      "Заголовок авторизации:",
      authHeader ? "Присутствует" : "Отсутствует"
    );

    if (!authHeader) {
      return NextResponse.json(
        { error: "Требуется авторизация" },
        { status: 401 }
      );
    }

    // Выполняем запрос к внешнему API
    const url = "http://31.129.57.95/api/core/v1/contractors/";
    console.log("Отправка запроса на:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    console.log("Ответ от сервера:", response.status);

    // Если сервер вернул ошибку, логируем её
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ошибка от сервера:", errorText);
      return NextResponse.json(
        { error: "Ошибка при получении данных от сервера", details: errorText },
        { status: response.status }
      );
    }

    // Получаем данные от внешнего API
    const data = await response.json();

    // Возвращаем ответ клиенту
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Критическая ошибка при проксировании запроса:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при обработке запроса" },
      { status: 500 }
    );
  }
}
