import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await fetch("http://31.129.57.95/api/auth/v1/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Ошибка при проксировании запроса:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при обработке запроса" },
      { status: 500 }
    );
  }
}
