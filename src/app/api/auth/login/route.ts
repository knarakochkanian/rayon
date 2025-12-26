import { RAYON_API_BASE_URL, RAYON_AUTH_COOKIE } from "@/lib/auth/config";
import { buildApiErrorMessage, extractToken } from "@/lib/auth/helpers";
import type { LoginRequestBody } from "@/lib/auth/types";
import { NextResponse } from "next/server";

async function forwardLogin(body: LoginRequestBody) {
  const response = await fetch(`${RAYON_API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = buildApiErrorMessage(data);
    return NextResponse.json(
      { error, details: data },
      { status: response.status },
    );
  }

  const token = extractToken(data);
  if (!token) {
    return NextResponse.json(
      { error: "API не вернул токен после входа" },
      { status: 500 },
    );
  }

  const res = NextResponse.json({
    user: data.user ?? data.profile ?? null,
    token,
  });

  res.cookies.set(RAYON_AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequestBody;
    return await forwardLogin(body);
  } catch (error) {
    return NextResponse.json(
      { error: "Сервис авторизации недоступен. Попробуйте ещё раз." },
      { status: 500 },
    );
  }
}
