import { Suspense } from "react";
import { AuthForm } from "./auth-form";

type AuthPageProps = {
  title: string;
  subtitle: string;
  mode: "login" | "register";
  ctaLabel: string;
  altText: string;
  altHref: string;
  altLabel: string;
};

export function AuthPage({
  title,
  subtitle,
  mode,
  ctaLabel,
  altText,
  altHref,
  altLabel,
}: AuthPageProps) {
  return (
    <div className="page-shell flex items-center justify-center px-6 py-16">
      <div className="card-strong w-full max-w-xl p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white shadow-md shadow-slate-200/70">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800">{title}</span>
            <span className="text-sm text-slate-500">{subtitle}</span>
          </div>
        </div>

        <Suspense fallback={<div className="mt-8 text-sm text-slate-500">Загружаем форму…</div>}>
          <AuthForm mode={mode} ctaLabel={ctaLabel} />
        </Suspense>

        <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-xs font-semibold text-emerald-600">✓</span>
            <p>Храним пароли в зашифрованном виде. Двухфакторная авторизация включена.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-xs font-semibold text-emerald-600">✓</span>
            <p>Получайте доступ к отчётам, верифицированным станциям и сценариям сделок.</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          {altText}{" "}
          <a className="font-semibold text-slate-900 underline-offset-4 hover:underline" href={altHref}>
            {altLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
