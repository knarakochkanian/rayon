import Link from "next/link";
import { AuthControls } from "./auth-controls";
import { getCurrentUser } from "@/lib/auth/server";

export async function HeaderBar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white shadow-md shadow-slate-200/70">
            R
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
            <Link className="rounded-full px-3 py-1 transition hover:bg-slate-100" href="#">
              Аналитика
            </Link>
            <Link className="rounded-full px-3 py-1 transition hover:bg-slate-100" href="#">
              Агентам
            </Link>
            <Link className="rounded-full px-3 py-1 transition hover:bg-slate-100" href="#">
              Инвесторам
            </Link>
            <Link className="rounded-full px-3 py-1 transition hover:bg-slate-100" href="#">
              Тарифы
            </Link>
          </nav>
        </div>
        <AuthControls initialUser={user} />
      </div>
    </header>
  );
}
