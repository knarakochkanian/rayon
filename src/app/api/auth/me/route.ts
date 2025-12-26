import { RAYON_API_BASE_URL, RAYON_AUTH_COOKIE } from "@/lib/auth/config";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = request.headers.get("cookie")?.match(new RegExp(`${RAYON_AUTH_COOKIE}=([^;]+)`))?.[1];

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const response = await fetch(`${RAYON_API_BASE_URL}/get-profile/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ user: null }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ user: data });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
