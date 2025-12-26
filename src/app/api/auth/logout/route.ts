import { RAYON_API_BASE_URL, RAYON_AUTH_COOKIE } from "@/lib/auth/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const token =
    request.headers.get("cookie")?.match(new RegExp(`${RAYON_AUTH_COOKIE}=([^;]+)`))?.[1] || "";

  try {
    if (token) {
      await fetch(`${RAYON_API_BASE_URL}/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    }
  } catch (error) {
    // Игнорируем сетевые ошибки — всё равно чистим куку
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(RAYON_AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
