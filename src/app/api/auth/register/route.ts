import { RAYON_API_BASE_URL, RAYON_AUTH_COOKIE } from "@/lib/auth/config";
import { buildApiErrorMessage, extractToken } from "@/lib/auth/helpers";
import type { RegisterRequestBody } from "@/lib/auth/types";
import { NextResponse } from "next/server";

async function forwardRegister(body: RegisterRequestBody) {
  const payload = {
    email: body.email,
    password: body.password,
    password2: body.password2 ?? body.password,
    role: body.role ?? "user",
    profile: {
      first_name: body.firstName ?? "",
      last_name: body.lastName ?? "",
      phone: body.phone ?? "",
    },
  };

  const response = await fetch(`${RAYON_API_BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
      { error: "API не вернул токен после регистрации" },
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
    maxAge: 60 * 60 * 24 * 30, // 30 дней
  });

  return res;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterRequestBody;
    return await forwardRegister(body);
  } catch (error) {
    return NextResponse.json(
      { error: "Сервис регистрации недоступен. Попробуйте ещё раз." },
      { status: 500 },
    );
  }
}
