"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserProfile } from "@/lib/auth/types";
import { useAuthStore } from "@/lib/auth/store";

type AuthControlsProps = {
  initialUser: UserProfile | null;
};

function initialsFromUser(user: UserProfile | null) {
  const first = user?.profile?.first_name?.[0] ?? "";
  const last = user?.profile?.last_name?.[0] ?? "";
  const emailInitial = user?.email?.[0] ?? "R";
  const combo = `${first}${last}` || emailInitial;
  return combo.toUpperCase();
}

export function AuthControls({ initialUser }: AuthControlsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user: storeUser, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (!storeUser && initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser, storeUser]);

  const user = storeUser ?? initialUser;

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      clearUser();
    } finally {
      router.refresh();
      router.push("/");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <a
          className="rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          href="/login"
        >
          Войти
        </a>
        <a
          className="rounded-full bg-slate-900 px-4 py-2 font-semibold text-white shadow-sm shadow-slate-300 transition hover:bg-slate-800"
          href="/register"
        >
          Регистрация
        </a>
      </div>
    );
  }

  const fullName = [user.profile?.first_name, user.profile?.last_name].filter(Boolean).join(" ");
  const shortName = user.profile?.first_name || fullName || user.email || "пользователь";

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="hidden items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-slate-200/70 sm:inline-flex">
        <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold">
          {initialsFromUser(user)}
        </span>
        <span className="text-white">Привет, {shortName}</span>
      </div>
      <span className="text-sm font-semibold text-slate-800 sm:hidden">
        Привет, {shortName}
      </span>
      <button
        onClick={handleLogout}
        className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        disabled={loading}
      >
        {loading ? "Выходим..." : "Выйти"}
      </button>
    </div>
  );
}
