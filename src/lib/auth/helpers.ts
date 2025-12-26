import { RAYON_AUTH_COOKIE } from "./config";
import type { AuthApiError } from "./types";

export function extractToken(payload: Record<string, unknown>) {
  const possibleKeys = ["token", "auth_token", "access", "key"];

  for (const key of possibleKeys) {
    const value = payload[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

export function buildApiErrorMessage(data: AuthApiError) {
  if (!data) return "Не удалось выполнить запрос";

  if (typeof data.detail === "string") return data.detail;

  if (typeof data.error === "string") return data.error;

  const firstFieldError = Object.values(data).find(
    (value) => Array.isArray(value) && value.length > 0,
  );

  if (Array.isArray(firstFieldError)) {
    const [firstMessage] = firstFieldError;
    if (typeof firstMessage === "string") {
      return firstMessage;
    }
  }

  return "Произошла ошибка. Проверьте данные и попробуйте ещё раз.";
}

export function getAuthCookieName() {
  return RAYON_AUTH_COOKIE;
}
