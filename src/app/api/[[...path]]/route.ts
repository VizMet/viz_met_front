import { NextRequest, NextResponse } from "next/server";

// Базовый URL вашего API
const API_BASE_URL = "http://31.129.57.95";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    // Получаем путь из URL
    const path = pathSegments.join("/");

    // Собираем URL для внешнего API
    const url = `${API_BASE_URL}/${path}`;

    // Копируем заголовки из оригинального запроса
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // Исключаем заголовки, специфичные для хоста
      if (
        key !== "host" &&
        key !== "connection" &&
        !key.startsWith("sec-") &&
        !key.startsWith("cf-")
      ) {
        headers.set(key, value);
      }
    });

    // Устанавливаем Content-Type если его нет
    if (!headers.has("content-type") && method !== "GET" && method !== "HEAD") {
      headers.set("content-type", "application/json");
    }

    // Формируем объект запроса
    const requestOptions: RequestInit = {
      method,
      headers,
      redirect: "follow",
    };

    // Добавляем тело запроса для методов, которые его поддерживают
    if (method !== "GET" && method !== "HEAD") {
      const contentType = headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const body = await request.json().catch(() => ({}));
        requestOptions.body = JSON.stringify(body);
      } else {
        const body = await request.text().catch(() => "");
        requestOptions.body = body;
      }
    }

    // Выполняем запрос к внешнему API
    const response = await fetch(url, requestOptions);

    // Создаем объект для ответа
    const responseData = await response.json().catch(() => null);

    // Возвращаем ответ
    return NextResponse.json(responseData, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Ошибка при проксировании запроса:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при обработке запроса" },
      { status: 500 }
    );
  }
}
