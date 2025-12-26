import { cookies } from "next/headers";
import { RAYON_API_BASE_URL, RAYON_AUTH_COOKIE } from "./config";
import type { UserProfile } from "./types";

export async function getCurrentUser(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(RAYON_AUTH_COOKIE)?.value || null;
  if (!token) return null;

  try {
    const response = await fetch(`${RAYON_API_BASE_URL}/get-profile/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = (await response.json()) as UserProfile;
    return data;
  } catch (error) {
    return null;
  }
}
